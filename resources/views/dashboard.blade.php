@section('title', 'Diagramas')
@section('script-css')

    <link rel="icon" href="{{ asset('favicon.ico') }}" type="image/x-icon" />
    <link rel="stylesheet" type="text/css" href="{{ asset('buildjs/package/rappid.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('lib/Js/css/style.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('lib/Js/css/theme-picker.css') }}">

    <!-- theme-specific application CSS  -->
    <link rel="stylesheet" type="text/css" href="{{ asset('lib/Js/css/style.dark.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('lib/Js/css/style.material.css') }}">
    <link rel="stylesheet" type="text/css" href="{{ asset('lib/Js/css/style.modern.css') }}">

@endsection

<x-app-layout>

    <div id="app">
        <div class="app-header">
              <div class="app-title">
                  <h1>JointJS+</h1>
              </div>
              <div class="toolbar-container">
                <button class="bg-green-200" id="btnJson"> mostrar Diagrama</button>
            </div>
            
        </div>
        <div class="app-body">
              <div class="stencil-container "></div>
             
              <div class="paper-container"></div>
              <div class="inspector-container"></div>
              <div class="navigator-container"></div>
              {{-- <div class="collaborators-container overflow-y-auto">
                <div class="flex w-full bg-gray-300" style="height: 12%">
                    <i class="fa-solid fa-user text-lg mx-3"></i>
                    <h1 class="text-black text-lg">Colaboradores</h1>
                    <button id="btn" hidden>Button</button>
                </div>
                <div class="w-full bg-gray-200 my-0" style="min-height: 88%">
                    <h1 class="font-sans p-2"><i class="fa-solid fa-circle text-green-500 mx-2"></i>Conectados</h1>
                    <div class="mt-3" id="collaborators"></div>
                </div>
            </div> --}}
        </div>
    </div>

     <!-- JointJS+ dependencies: -->
     <script src="{{ asset('lib/node_modules/jquery/dist/jquery.js') }}"></script>
     <script src="{{ asset('lib/node_modules/lodash/lodash.js') }}"></script>
     <script src="{{ asset('lib/node_modules/backbone/backbone.js') }}"></script>
     <script src="{{ asset('lib/node_modules/graphlib/dist/graphlib.core.js') }}"></script>
     <script src="{{ asset('lib/node_modules/dagre/dist/dagre.core.js') }}"></script>
 
     <script src="{{ asset('buildjs/package/rappid.js') }}"></script>

    <!--[if IE 9]>
        <script>
          // `-ms-user-select: none` doesn't work in IE9
          document.onselectstart = function() { return false; };
        </script>
    <![endif]-->

    <!-- Application files:  -->
    <script src="{{ asset('lib/Js/js/config/halo.js') }}"></script>
    <script src="{{ asset('lib/Js/js/config/selection.js') }}"></script>
    <script src="{{ asset('lib/Js/js/config/inspector.js') }}"></script>
    <script src="{{ asset('lib/Js/js/config/stencil.js') }}"></script>
    <script src="{{ asset('lib/Js/js/config/toolbar.js') }}"></script>
    <script src="{{ asset('lib/Js/js/config/sample-graphs.js') }}"></script>
    <script src="{{ asset('lib/Js/js/views/main.js') }}"></script>
    <script src="{{ asset('lib/Js/js/views/theme-picker.js') }}"></script>
    <script src="{{ asset('lib/Js/js/models/joint.shapes.app.js') }}"></script>
    <script src="{{ asset('lib/Js/js/views/navigator.js') }}"></script>

    <script>
        joint.setTheme('modern');
        app = new App.MainView({ el: '#app' });
        themePicker = new App.ThemePicker({ mainView: app });
        themePicker.render().$el.appendTo(document.body);
        /* window.addEventListener('load', function() {
            app.graph.fromJSON(JSON.parse(App.config.sampleGraphs.emergencyProcedure));
        }); */
        btn = document.querySelector('#btnJson');
        btn.addEventListener('click', () => {
            console.log(app.graph)
            
            json = app.graph.toJSON();
            arrayJSON = Object.values(json)[0];
            console.log(arrayJSON);
            //console.log(app.graph.getElements());
            /*jsonString = JSON.stringify(app.graph.toJSON())
            var array = JSON.parse(jsonString).cells;
            console.log(array);*/
            
            
            
            /* let tablas = []
            
            arrayJSON.forEach(currentItem => {
                if(currentItem.type != 'app.Link'){

                    tabla = `CREATE TABLE ${currentItem.name} (\n`;
                    currentItem.attributes.forEach(atributo => {
                        tabla = `${tabla} ${atributo} INTEGER NOT NULL,\n`;
                    });
                    tabla = `${tabla} )`;
                    tablas.push(tabla);
                }else {

                }
            });
            
            console.log(tablas);

            let contenido;
            tablas.forEach(currentItem => {
                contenido += currentItem + '\n'
            });

            const nombreArchivo = "diagrama1"; */

            
            //descargarArchivoSQL(contenido, nombreArchivo);
        });
    </script>

    <!-- Local file warning: -->
    <div id="message-fs" style="display: none;">
      <p>The application was open locally using the file protocol. It is recommended to access it trough a <strong>Web server</strong>.</p>
      <p>Please see <a href="README.md">instructions</a>.</p>
    </div>
    <script>
        (function() {
            var fs = (document.location.protocol === 'file:');
            var ff = (navigator.userAgent.toLowerCase().indexOf('firefox') !== -1);
            if (fs && !ff) {
               (new joint.ui.Dialog({
                   width: 300,
                   type: 'alert',
                   title: 'Local File',
                   content: $('#message-fs').show()
                })).open();
            }
        })();
    </script>


</x-app-layout>
