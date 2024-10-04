<x-app-layout>
    <div class="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">

        {{-- Page header --}}
        <div class="sm:flex sm:justify-between sm:items-center mb-8">
    
            <!-- Left: Actions -->
            <div class="mb-4 sm:mb-0">
    
                <!-- Title -->
                <h1 class="text-2xl md:text-3xl text-slate-800 font-bold">Bienvenido {{Auth::user()->name }} ✨</h1>
    
    
            </div>
    
            <!-- Right: Actions -->
            <div class="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
    
                <!-- Search form -->
                <div class="relative">
                    <x-input wire:model='search' type="search" placeholder="Search…"
                        class="form-input pl-9  focus:ring-blue-500 focus:border-blue-500" />
                    <span class="absolute pr-3 pt-2.5 inset-0 right-auto  ">
                        <svg class=" w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                            viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                            <path
                                d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                        </svg>
                    </span>
                </div>
    
                <!-- Filter button -->
                <x-dropdown-filter align="right"  />
    
                <!-- Create events modal -->
                    @livewire('diagrama.diagram-create')
    
            </div>
    
        </div>

        @livewire('diagrama.mis-diagramas');
    
    
        @push('js')
             
            <script>
                Livewire.on('deleteDiagram', diagramId => {
                    Swal.fire({
                        title: 'Estas seguro?',
                        text: "¡No podrás revertir esto!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#7066e0',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Si, Eliminiar!',
                        cancelButtonText: 'Cancelar'
                    }).then((result) => {
                        if (result.isConfirmed) {
    
                            Livewire.emitTo('diagrama.mis-diagramas', 'delete', diagramId);
                            Swal.fire(
                                'Eliminado!',
                                'El Diagrama ha sido eliminado.',
                                'success'
                            )
                        }
                    })
                })
            </script>
    
        @endpush
    
   
    
    </div>
    
</x-app-layout>