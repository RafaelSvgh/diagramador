import { dia, setTheme, shapes, ui, linkTools } from "@clientio/rappid";
import { Table, Link } from "./shapes";
import { anchorNamespace } from "./anchors";
import { routerNamespace } from "./routers";
import { TableHighlighter, LinkHighlighter } from "./highlighters";
const JSZip = require('jszip');

export const init = () => {
    // Crear una nueva instancia de JSZip
    const zip = new JSZip();
    const appEl = document.getElementById("app");
    const canvasEl = document.querySelector(".canvas");
    /*  const btn = document.querySelector('#btn'); */

    // Variables globales de los textarea
    let txt_original = document.getElementById("text-area-1");
    let txt_copy = document.getElementById("text-area-2");
    let id_diagram = document.getElementById("id_diagram");
    let txt_original_bd = document.getElementById("text-area-3");

    let btnSocket = document.getElementById("btn-1");
    let render = document.getElementById("btn-render");
    let update = document.getElementById("btn-update");

    setTheme("my-theme");

    const graph = new dia.Graph({}, { cellNamespace: shapes });

    const paper = new dia.Paper({
        model: graph,
        width: 1000,
        height: 800,
        gridSize: 20,
        interactive: true,
        defaultConnector: { name: "rounded" },
        async: true,
        frozen: true,
        sorting: dia.Paper.sorting.APPROX,
        cellViewNamespace: shapes,
        routerNamespace: routerNamespace,
        defaultRouter: { name: "customRouter" },
        anchorNamespace: anchorNamespace,
        defaultAnchor: { name: "customAnchor" },
        snapLinks: true,
        linkPinning: false,
        magnetThreshold: "onleave",
        highlighting: {
            connecting: {
                name: "addClass",
                options: {
                    className: "column-connected",
                },
            },
        },
        defaultLink: () => new Link(),
        validateConnection: function (srcView, srcMagnet, tgtView, tgtMagnet) {
            return srcMagnet !== tgtMagnet;
        },
    });

    const scroller = new ui.PaperScroller({
        paper,
        cursor: "grab",
        baseWidth: 100,
        baseHeight: 100,
        inertia: { friction: 0.8 },
        autoResizePaper: true,
        contentOptions: function () {
            return {
                useModelGeometry: true,
                allowNewOrigin: "any",
                padding: 40,
                allowNegativeBottomRight: true,
            };
        },
    });

    canvasEl.appendChild(scroller.el);
    scroller.render().center();

    /* const users = new Table()
        .setName('users')
        .setTabColor('#6495ED')
        .position(170, 220)
        .setColumns([
            { name: 'id', type: 'int', key: true },
            { name: 'full_name', type: 'varchar' },
            { name: 'created_at', type: 'datetime' },
            { name: 'country_code', type: 'int' }
        ])
        .addTo(graph);


    const orders = new Table()
        .setName('orders')
        .setTabColor('#008B8B')
        .position(570, 140)
        .setColumns([
            { name: 'user_id', type: 'int', key: true },
            { name: 'status', type: 'varchar' },
            { name: 'product_id', type: 'int' },
            { name: 'created_at', type: 'datetime' }
        ])
        .addTo(graph);


    const countries = new Table()
        .setName('countries')
        .setTabColor('#CD5C5C')
        .position(170, 540)
        .setColumns([
            { name: 'code', type: 'int', key: true },
            { name: 'name', type: 'varchar' }
        ])
        .addTo(graph);


    const products = new Table()
        .setName('products')
        .setTabColor('#FFD700')
        .position(570, 440)
        .setColumns([
            { name: 'id', type: 'int', key: true },
            { name: 'name', type: 'varchar' },
            { name: 'price', type: 'int' },
            { name: 'status', type: 'varchar' },
            { name: 'created_at', type: 'datetime' }
        ])
        .addTo(graph);

    
    const links = [
        new Link({
            source: { id: users.id, port: 'id' },
            target: { id: orders.id, port: 'user_id' }
        }),
        new Link({
            source: { id: users.id, port: 'country_code' },
            target: { id: countries.id, port: 'code' }
        }),
        new Link({
            source: { id: orders.id, port: 'product_id' },
            target: { id: products.id, port: 'id' }
        }),

    
    ];

    links.forEach((link) => {
        link.addTo(graph);
    }); */

    // Register events
    /* paper.on('link:mouseenter', (linkView) => {
        //console.log(linkView);
        showLinkTools(linkView);
    }); */

    paper.on("link:pointerclick", (linkView) => {
        editLink(linkView);
    });

    paper.on("link:mouseleave", (linkView) => {
        linkView.removeTools();
    });

    paper.on("blank:pointerdown", (evt) => scroller.startPanning(evt));

    paper.on("blank:mousewheel", (evt, ox, oy, delta) => {
        evt.preventDefault();
        zoom(ox, oy, delta);
    });
    paper.on("cell:mousewheel", (_, evt, ox, oy, delta) => {
        evt.preventDefault();
        zoom(ox, oy, delta);
    });
    function zoom(x, y, delta) {
        scroller.zoom(delta * 0.2, {
            min: 0.4,
            max: 3,
            grid: 0.2,
            ox: x,
            oy: y,
        });
    }

    paper.on("element:pointerclick", (elementView) => {
        //console.log(elementView);
        editTable(elementView);
    });

    paper.on("blank:pointerdblclick", (evt, x, y) => {
        const table = new Table();
        table.position(x, y);
        table.setColumns([
            {
                name: "id",
                type: "int",
            },
        ]);
        table.addTo(graph);
        editTable(table.findView(paper));

        txt_original.value = JSON.stringify(graph.toJSON());
        btnSocket.click();
        update.click();
    });

    graph.on("change:attrs", function (cell) {
        //console.log("se cambio los atributos");
        txt_original.value = JSON.stringify(graph.toJSON());
        btnSocket.click();
        update.click();
    });

    /* graph.on('change', function(cell, opt) {
        console.log('Hubo un cambio en el diagrama');
        console.log(cell);
        console.log(opt);
        txt_original.value = JSON.stringify(graph.toJSON());
        btnSocket.click();
        update.click();
    }); */

    graph.on("change:columns", function (cell) {
        //console.log("se cambio los atributos");
        txt_original.value = JSON.stringify(graph.toJSON());
        btnSocket.click();
        update.click();
    });


    graph.on("change:position", function (cell) {
        //console.log("se cambio los posicion");
        txt_original.value = JSON.stringify(graph.toJSON());
        btnSocket.click();
        update.click();
        console.log(graph.toJSON());
    });

    graph.on("change:labels", function (cell) {
        //console.log("se cambio los labels de los links");
        console.log(graph.toJSON());
        txt_original.value = JSON.stringify(graph.toJSON());
        btnSocket.click();
        update.click();
    });

    /* graph.on("add", function (cell) {
        console.log("se añadio un elemento");
        txt_original.value = JSON.stringify(graph.toJSON());
        btnSocket.click();
        update.click();
    }); */

    

    graph.on('change:source change:target', function(link) {
        txt_original.value = JSON.stringify(graph.toJSON());
        btnSocket.click();
        update.click();
    });

    graph.on("remove", function (cell) {
       // console.log("se eliminó un elemento");
       // console.log(graph.toJSON());
        txt_original.value = JSON.stringify(graph.toJSON());
        btnSocket.click();
        update.click();
    });

    paper.unfreeze();

    // Actions
    function showLinkTools(linkView) {
        const tools = new dia.ToolsView({
            tools: [
                new linkTools.Remove({
                    distance: "50%",
                    markup: [
                        {
                            tagName: "circle",
                            selector: "button",
                            attributes: {
                                r: 7,
                                fill: "#f6f6f6",
                                stroke: "#ff5148",
                                "stroke-width": 2,
                                cursor: "pointer",
                            },
                        },
                        {
                            tagName: "path",
                            selector: "icon",
                            attributes: {
                                d: "M -3 -3 3 3 M -3 3 3 -3",
                                fill: "none",
                                stroke: "#ff5148",
                                "stroke-width": 2,
                                "pointer-events": "none",
                            },
                        },
                    ],
                }),
                new linkTools.SourceArrowhead(),
                new linkTools.TargetArrowhead(),
            ],
        });
        linkView.addTools(tools);
    }

    function editTable(tableView) {
        const HIGHLIGHTER_ID = "table-selected";
        const table = tableView.model;
        const tableName = table.getName();
        if (TableHighlighter.get(tableView, HIGHLIGHTER_ID)) return;

        TableHighlighter.add(tableView, "root", HIGHLIGHTER_ID);

        const inspector = new ui.Inspector({
            cell: table,
            theme: "default",
            inputs: {
                "attrs/tabColor/fill": {
                    label: "Color",
                    type: "color",
                },
                "attrs/headerLabel/text": {
                    label: "Name",
                    type: "text",
                },
                columns: {
                    label: "Columns",
                    type: "list",
                    addButtonLabel: "Add Column",
                    removeButtonLabel: "Remove Column",
                    item: {
                        type: "object",
                        properties: {
                            name: {
                                label: "Name",
                                type: "text",
                            },

                            type: {
                                label: "Type",
                                type: "select",
                                options: [
                                    "character",
                                    "varchar(50)",
                                    "text",
                                    "integer",
                                    "bigint",
                                    "smallint",
                                    "real",
                                    "date",
                                    "time",
                                    "timestamp",
                                    "boolean",
                                ],
                            },
                            /* others:{
                                label: 'Methods',
                                type: 'text'
                            }, */
                            key: {
                                label: "Key",
                                type: "toggle",
                            },
                        },
                    },
                },
            },
        });

        inspector.render();
        inspector.el.style.position = "relative";

        const dialog = new ui.Dialog({
            theme: "default",
            modal: false,
            draggable: true,
            closeButton: false,
            width: 300,
            title: tableName || "New Table*",
            content: inspector.el,
            buttons: [
                {
                    content: "Remove",
                    action: "remove",
                    position: "left",
                },
                {
                    content: "Close",
                    action: "close",
                },
            ],
        });

        dialog.open(appEl);

        const dialogTitleBar = dialog.el.querySelector(".titlebar");
        const dialogTitleTab = document.createElement("div");
        dialogTitleTab.style.background = table.getTabColor();
        dialogTitleTab.setAttribute("class", "titletab");
        dialogTitleBar.appendChild(dialogTitleTab);

        inspector.on("change:attrs/tabColor/fill", () => {
            dialogTitleTab.style.background = table.getTabColor();
        });
        inspector.on("change:attrs/headerLabel/text", () => {
            dialogTitleBar.textContent = table.getName();
        });


        dialog.on("action:close", () => {
            inspector.remove();
            TableHighlighter.remove(tableView, HIGHLIGHTER_ID);
        });
        dialog.on("action:remove", () => {
            dialog.close();
            table.remove();
        });

        if (!tableName) {
            const inputEl = inspector.el.querySelector(
                'input[data-attribute="attrs/headerLabel/text"]'
            );
            inputEl.focus();
        }
    }

    function editLink(linkView) {
        const link = linkView.model;

        const inspector = new ui.Inspector({
            cell: link,
            theme: "default",
            inputs: {
                labels: {
                    label: "Labels",
                    type: "list",
                    item: {
                        type: "object",
                        properties: {
                            fuente: {
                                label: "source",
                                type: "select",
                                options: ["origen", "destino"],
                            },

                            attrs: {
                                text: {
                                    text: {
                                        label: "Multiplicidad",
                                        type: "select",
                                        options: ["1","*"],
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        /*         const inspector = new ui.Inspector({
            cell: link,
            theme: 'default',
            inputs: {
                    'labels': {
                    label: 'labels',
                    type: 'list',
                    addButtonLabel: 'Add Column',
                    removeButtonLabel: 'Remove Label',
                    item: {
                        type: 'object',
                        properties: {

                            attrs: {
                                text: {
                                    text: {
                                        label: 'Multiplicidad',
                                        type: 'select',
                                        options: [
                                            '1',
                                            '0..*',
                                            '1..*',
                                            '*',
                                        ]
                                    }
                                }

                            }


                        }
                    }
                }
            }
        });
 */
        inspector.render();
        inspector.el.style.position = "relative";

        const dialog = new ui.Dialog({
            theme: "default",
            modal: false,
            draggable: true,
            closeButton: false,
            width: 300,
            title: "Edit Link",
            content: inspector.el,
            buttons: [
                {
                    content: "Remove",
                    action: "remove",
                    position: "left",
                },
                {
                    content: "Close",
                    action: "close",
                },
            ],
        });

        dialog.open(appEl);

        /* inspector.on('change:labels', (event, path, newValue) => {
            const labelIndex = parseInt(path.split('.')[1]);
            console.log(labelIndex);
            const labels = link.labels();
            if (labelIndex >= 0 && labelIndex < labels.length) {

                labels[labelIndex].attrs.text.text = newValue;
                link.labels(labels);
                link.addTo(graph);
            }
            console.log('se cambio el label');
        }); */

        dialog.on("action:close", () => {
            inspector.remove();
            //LinkHighlighter.remove(linkView, HIGHLIGHTER_ID);
        });

        dialog.on("action:remove", () => {
            dialog.close();
            link.remove();
        });
    }

    window.addEventListener("load", function () {
        /* setTimeout(function () {
        var page = document.getElementById("loader-page")

        page.style.visibility = "hidden"
        page.style.opacity = "0"
    }, 1000); */

        /* txt_original.value = JSON.stringify(graph.toJSON());
    
    btnSocket.click();
    update.click(); */
        graph.fromJSON(JSON.parse(txt_original.value));
        txt_copy.value = txt_original.value;
    });

    // Cambios en el paper
    render.addEventListener("click", () => {
        console.log("renderizando");
        if (txt_original.value != txt_copy.value) {
            graph.fromJSON(JSON.parse(txt_copy.value));
            txt_original.value = txt_copy.value;
        }

        /* console.log(graph.toJSON()); */
    });

    // Actulizar JSON copia en la BD
    update.addEventListener("click", () => {
        console.log("Captando movimiento");
        Livewire.emit("updateDiagram", id_diagram.value, txt_original.value);
    });

    const btn_guardar = document.getElementById("btn-guardar");

    btn_guardar.addEventListener("click", function () {
        console.log("CLick guardar");

        txt_original_bd.value = txt_original.value;

        Livewire.emit("saveChanges", id_diagram.value, txt_original.value);
    });

    const descargarArchivoSQL = function (contenido, nombreArchivo) {
        const enlace = document.createElement("a");
        const contenidoArchivo = new Blob([contenido], { type: "text/plain" });

        enlace.href = URL.createObjectURL(contenidoArchivo);
        enlace.download = nombreArchivo + ".sql";
        enlace.click();
    };


    Livewire.on("descargarSql", function (contenido) {
        descargarArchivoSQL(contenido, "diagrama");
    });

    const sintaxisAtributo = function (tipoDeAtributo,tipoGestorDB) {
       if (tipoGestorDB == "mysql") {
           switch (tipoDeAtributo) {
            case "character":
                return "CHAR";
            case "varchar(50)":
                return "VARCHAR(50)";
            case "text":
                return "TEXT";
            case "integer":
                return "INT";
            case "bigint":
                return "BIGINT";
            case "smallint":
                return "SMALLINT";
            case "real":
                return "FLOAT";
            case "date":
                return "DATE";
            case "time":
                return "TIME";
            case "timestamp":
                return "TIMESTAMP";
            case "boolean":
                return "BOOLEAN";
            default:
                return tipoDeAtributo;            
           }
       }else if (tipoGestorDB == "sqlserver") {
              switch (tipoDeAtributo) {
                case "character":
                return "CHAR";
                case "varchar":
                    return "VARCHAR(50)";
                case "text":
                    return "TEXT";
                case "integer":
                    return "INT";
                case "bigint":
                    return "BIGINT";
                case "smallint":
                    return "SMALLINT";
                case "real":
                    return "REAL";
                case "date":
                    return "DATE";
                case "time":
                    return "TIME";
                case "timestamp":
                    return "DATETIME";
                case "boolean":
                    return "BIT";
                default:
                    return tipoDeAtributo;
              }
       }else {
            return tipoDeAtributo;
       }

    }

    const relaciones = function (links, elements) {
        let relaciones = [];
        if (links != undefined) {
            links.forEach((currentItem) => {
                let linkActual = currentItem.attributes;
                if (currentItem.attributes.labels != undefined) {
                    let idOrigen = linkActual.source.id;
                    let idDestino = linkActual.target.id;
                    let tablaOrigen = "";
                    let tablaDestino = "";
    
                    elements.forEach((currentItem) => {
                        if (currentItem.id == idOrigen) {
                            tablaOrigen =
                                currentItem.attributes.attrs.headerLabel.text;
                        }
                        if (currentItem.id == idDestino) {
                            tablaDestino =
                                currentItem.attributes.attrs.headerLabel.text;
                        }
                    });
    
                    let multiplicidadOrigen = "";
                    let multiplicidadDestino = "";
                    let nombreRelacion = "";
    
                    linkActual.labels.forEach((currentItem) => {
                        if (currentItem.fuente == 'origen') {
                            multiplicidadOrigen = currentItem.attrs.text.text;
                        } else {
                            multiplicidadDestino = currentItem.attrs.text.text;
                        }
                    });
    
                    if (
                        multiplicidadOrigen == "1" &&
                        multiplicidadDestino == "1"
                    ) {
                        nombreRelacion = "uno a uno";
                    }
    
                    if (
                        multiplicidadOrigen == "*" &&
                        multiplicidadDestino == "1"
                    ) {
                        nombreRelacion = "uno a muchos origen";
                    }
    
                    if (
                        (multiplicidadOrigen == "1" &&
                        multiplicidadDestino == "*")
                    ) {
                        nombreRelacion = "uno a muchos destino";
                    }
    
                    if (
                        multiplicidadOrigen == "*" &&
                        multiplicidadDestino == "*"
                    ) {
                        nombreRelacion = "muchos a muchos";
                    }
                    
                    relaciones.push({tablaOrigen: tablaOrigen, tablaDestino:tablaDestino, nombreRelacion:nombreRelacion});
                }
            });
        }
        return relaciones;
    };
    
    const sintaxisAlterarTabla = function (tipoGestorDB, tipoAccion) {
        if (tipoGestorDB === 'sqlserver' && tipoAccion === 'ADD') {
            return 'ADD';
        }else if(((tipoGestorDB === 'mysql'|| tipoGestorDB === 'postgresql')  && tipoAccion === 'ADD')){
            return 'ADD COLUMN';
        }

        if (tipoGestorDB === 'sqlserver' && tipoAccion === 'FOREIGN') {
            return 'FOREIGN';
        }else if((tipoGestorDB === 'mysql'|| tipoGestorDB === 'postgresql')  && tipoAccion === 'FOREIGN'){
            return 'ADD FOREIGN';
        }

        return '';
    }


    const btnExportar = document.getElementById("btn-exportar");
    const databaseSelect = document.getElementById("databaseSelect");
    btnExportar.dataset.tipoGestorDB = databaseSelect.value;
    
    databaseSelect.addEventListener("change", () => {
        btnExportar.dataset.tipoGestorDB = databaseSelect.value;
    });

    btnExportar.addEventListener("click", (event) => {
        let tipoGestorDB = event.target.dataset.tipoGestorDB;
        let json = graph.toJSON();
        let arrayJSON = Object.values(json)[0];

        let jsonString = JSON.stringify(json);
        let array = JSON.parse(jsonString).cells;
        //console.log(array);

        let tablas = [];

        arrayJSON.forEach((currentItem, index) => {
            if (currentItem.type != "app.Link") {
                let tabla = `CREATE TABLE ${currentItem.attrs.headerLabel.text} (\n`;
                currentItem.columns.forEach((atributo,columnIndex) => {
                    if ((atributo.key && atributo.name == "id" && columnIndex === currentItem.columns.length - 1)){
                        tabla = `${tabla} ${atributo.name} ${sintaxisAtributo(atributo.type,tipoGestorDB)} NOT NULL PRIMARY KEY\n`;
                    }else if(atributo.key && atributo.name == "id"){
                        tabla = `${tabla} ${atributo.name} ${sintaxisAtributo(atributo.type,tipoGestorDB)} NOT NULL PRIMARY KEY,\n`;
                    }
                    else if (columnIndex === currentItem.columns.length - 1) {
                        tabla = `${tabla} ${atributo.name} ${sintaxisAtributo(atributo.type,tipoGestorDB)} NOT NULL\n`;
                    }
                    else{
                        tabla = `${tabla} ${atributo.name} ${sintaxisAtributo(atributo.type,tipoGestorDB)} NOT NULL,\n`;
                    }
                });
                tabla = `${tabla} );\n`;
                tablas.push(tabla);
            } else {

            }
        });

        let contenido = "";
        tablas.forEach((currentItem) => {
            contenido += currentItem + "\n";
        });

       
        console.log(graph.getElements());
        /* console.log(graph.getLinks()); */

        let elements = graph.getElements();
        
        let links = graph.getLinks();

        let relacioness = relaciones(links, elements);

    
        relacioness.forEach((currentItem) => {
            if (currentItem.nombreRelacion == "uno a uno") {
                contenido = `${contenido} ALTER TABLE ${currentItem.tablaOrigen} ${sintaxisAlterarTabla(tipoGestorDB,'ADD')} ${currentItem.tablaDestino}_id INTEGER NOT NULL,
                ${sintaxisAlterarTabla(tipoGestorDB,'FOREIGN')} KEY (${currentItem.tablaDestino}_id) REFERENCES ${currentItem.tablaDestino} (id);\n`;
            }else if(currentItem.nombreRelacion == "uno a muchos origen"){
                contenido = `${contenido} ALTER TABLE ${currentItem.tablaOrigen} ${sintaxisAlterarTabla(tipoGestorDB,'ADD')} ${currentItem.tablaDestino}_id INTEGER NOT NULL,
                ${sintaxisAlterarTabla(tipoGestorDB,'FOREIGN')} KEY (${currentItem.tablaDestino}_id) REFERENCES ${currentItem.tablaDestino} (id);\n`;
                
            }else if(currentItem.nombreRelacion == "uno a muchos destino"){
                contenido = `${contenido} ALTER TABLE ${currentItem.tablaDestino} ${sintaxisAlterarTabla(tipoGestorDB,'ADD')} ${currentItem.tablaOrigen}_id INTEGER NOT NULL,
                ${sintaxisAlterarTabla(tipoGestorDB,'FOREIGN')} KEY (${currentItem.tablaOrigen}_id) REFERENCES ${currentItem.tablaOrigen} (id);\n`;
            }else if(currentItem.nombreRelacion == "muchos a muchos"){
                contenido = `${contenido} CREATE TABLE ${currentItem.tablaOrigen}_${currentItem.tablaDestino} (\n 
                    ${currentItem.tablaOrigen}_id INTEGER NOT NULL,\n 
                    ${currentItem.tablaDestino}_id INTEGER NOT NULL,\n 
                    PRIMARY KEY (${currentItem.tablaOrigen}_id, ${currentItem.tablaDestino}_id),\n 
                    FOREIGN KEY (${currentItem.tablaOrigen}_id) REFERENCES ${currentItem.tablaOrigen} (id),\n 
                    FOREIGN KEY (${currentItem.tablaDestino}_id) REFERENCES ${currentItem.tablaDestino} (id)\n);\n`;
            }
        });
        const nombreArchivo = "diagrama1";
        /* showPreview(contenido, nombreArchivo); */
        Livewire.emit("open", contenido);

        
    });

    const btnGenerarVistas = document.getElementById("btn-generar-vistas");
    btnGenerarVistas.addEventListener("click", (event) => {
        descargarZip();
    });

    const generarVistas = function () {
        let arrayTablas = graph.getElements();
        //console.log(arrayTablas);
        let htmlHead =`<!DOCTYPE html>
        <html>
        <head>
          <title>Vistas</title>
          <link rel="stylesheet" href="style.css">
        </head>`;

        let htmlBody = `<body>\n`;
        arrayTablas.forEach((currentTabla) => {

            htmlBody += `<div class="formulario">
            <h2>Agregar ${currentTabla.attributes.attrs.headerLabel.text}</h2>
            <form>\n`;

            currentTabla.attributes.columns.forEach((currentColumn) => {
                if (currentColumn.name != "id") {
                    htmlBody += `<label for="${currentColumn.name}">${currentColumn.name}</label>
                    <input type="text" id="${currentColumn.name}" name="${currentColumn.name}" required><br>\n`;
                }
            });

            htmlBody += `<button type="submit">Agregar</button>
            </form>
            </div>\n`;

            htmlBody += `<table>\n`;
            htmlBody += `<thead>
                <tr>\n`;
            currentTabla.attributes.columns.forEach((atributo) => {
                htmlBody += `<th>${atributo.name}</th>\n`;
            });
            htmlBody += `<th>Acciones</th>\n`;
            htmlBody += `</tr>
            </thead>\n`;
            htmlBody += `<tbody>\n`;
            htmlBody += `<tr>\n`;
            currentTabla.attributes.columns.forEach((atributo) => {
                htmlBody += `<td>Lorem ipsum</td>\n`;
            });
            htmlBody += `<td>
            <button class="btn-editar">Editar</button>
            <button class="btn-eliminar">Eliminar</button>
            </td>\n`;
            htmlBody += `</tr>\n`;
            htmlBody += `</tbody>\n`;
            htmlBody += `</table>\n`;
            htmlBody += `<br> <br>\n`;

        });

        htmlBody += `</body>\n`;

        let html = `${htmlHead}\n${htmlBody}\n</html>`;
        return html;
    }


    

    function descargarZip() {
        // Agregar el archivo HTML al ZIP
        const htmlContent = generarVistas();
        zip.file('vistas.html', htmlContent);
    
        // Agregar el archivo CSS al ZIP
        const cssContent = `
        body {
          font-family: Arial, sans-serif;
        }
    
        h1 {
          text-align: center;
        }
    
        table {
          width: 100%;
          border-collapse: collapse;
        }
    
        table th,
        table td {
          padding: 10px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
    
        table th {
          background-color: #f2f2f2;
        }
    
        .btn-editar,
        .btn-eliminar {
          padding: 5px 10px;
          border: none;
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
        }
    
        .btn-eliminar {
          background-color: #f44336;
        }
    
        .formulario {
          margin-bottom: 20px;
        }
    
        .formulario input[type="text"],
        .formulario input[type="number"],
        .formulario textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 10px;
        }
    
        .formulario button {
          padding: 10px 20px;
          border: none;
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
        }
    `;
        zip.file('style.css', cssContent);
    
        // Generar el archivo ZIP
        zip.generateAsync({ type: 'blob' })
        .then((content) => {
            // Guardar el archivo ZIP
            const zipName = 'archivos.zip';
            if (navigator.msSaveBlob) {
            // Para navegadores Microsoft Edge/Internet Explorer
            navigator.msSaveBlob(content, zipName);
            } else {
            // Para otros navegadores
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = zipName;
            link.click();
            }
        })
        .catch((error) => {
            console.error('Error al generar el archivo ZIP:', error);
        });
    }

};
