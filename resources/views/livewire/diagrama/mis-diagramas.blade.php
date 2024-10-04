<div>
    <!-- Filters -->
    <div class="mb-4 border-b border-slate-200">

        <div class="m-4 sm:mb-0">
            <label class="mr4" for="">
                Mostrar
            </label>
            <select class="form-select" wire:model="count">

                <option value="4">4</option>
                <option value="8">8</option>
                <option value="16">16</option>
                <option value="32">32</option>
                <option value="64">64</option>

            </select>
            <label class="ml4" for="">
                Items
            </label>

        </div>
    </div>

    <!-- show event -->
    <div>


        <div class="mt-8">
            @if ($diagrams->isEmpty())
                <h2 class="text-xl leading-snug text-slate-800 font-bold mb-5">No existe ningun registro coincidente
                </h2>
            @else
                <h2 class="text-xl leading-snug text-slate-800 font-bold mb-5">Diagramas disponibles</h2>
            @endif

            <div class="grid grid-cols-12 gap-6">
                @foreach ($diagrams as $diagram)
                    <div
                        class="col-span-full sm:col-span-6 xl:col-span-3 bg-white shadow-lg rounded-sm border border-slate-200 overflow-hidden">
                        <div class="flex flex-col h-full">
                            <!-- Image -->
                            <div class="relative">
                                <img class="ml-9 mt-3 w-3/4" src="{{ asset('images/320x320.png') }}" width="286"
                                    height="160" alt="Application 09" />
                                <!-- Like button -->
                                <button class="absolute top-0 right-0 mt-4 mr-4">
                                    <div class="text-slate-100 bg-slate-900 bg-opacity-60 rounded-full">
                                        <span class="sr-only">Like</span>
                                        <svg class="h-8 w-8 fill-current" viewBox="0 0 32 32">
                                            <path
                                                d="M22.682 11.318A4.485 4.485 0 0019.5 10a4.377 4.377 0 00-3.5 1.707A4.383 4.383 0 0012.5 10a4.5 4.5 0 00-3.182 7.682L16 24l6.682-6.318a4.5 4.5 0 000-6.364zm-1.4 4.933L16 21.247l-5.285-5A2.5 2.5 0 0112.5 12c1.437 0 2.312.681 3.5 2.625C17.187 12.681 18.062 12 19.5 12a2.5 2.5 0 011.785 4.251h-.003z" />
                                        </svg>
                                    </div>
                                </button>
                            </div>
                            <!-- Card Content -->
                            <div class="grow flex flex-col p-5">
                                <!-- Card body -->
                                <div class="grow">
                                    <!-- Header -->
                                    <header class="mb-2">
                                        <h3 class="text-lg text-slate-800 font-semibold">{{ $diagram->diagram_name }}
                                        </h3>
                                    </header>
                                    <!-- List -->
                                    <ul class="text-sm space-y-2 mb-5">
                                        <li class="flex items-center">
                                            <svg class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3"
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                                            </svg>
                                            <div class=>Tipo: {{ $diagram->diagraman_type }}</div>
                                        </li>
                                        <li class="flex items-center">
                                            <svg class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3"
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                                            </svg>
                                            <div class="text-rose-500">Fecha: {{ $diagram->created_at }}</div>
                                        </li>

                                    </ul>
                                </div>

                                <!-- Card footer -->

                                <div class="mb-4">

                                    <a href="{{route('diagrama.editar.colaboradores',$diagram->id)}}" class="flex flex-row justify-center gap-2 btn-sm w-full bg-indigo-500 hover:bg-indigo-600 text-white">
                                        <svg class="w-4 h-4 fill-current opacity-50 shrink-0" viewBox="0 0 16 16">
                                            <path
                                                d="M15 7H9V1c0-.6-.4-1-1-1S7 .4 7 1v6H1c-.6 0-1 .4-1 1s.4 1 1 1h6v6c0 .6.4 1 1 1s1-.4 1-1V9h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                                        </svg>
                                        Agregar Colaboradores

                                    </a>

                                </div>



                                {{-- editar diagrama --}}
                                <div class="mb-4">
                                    <a class="flex flex-row justify-center gap-2 btn-sm w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                                    href="{{ route('diagrama.edit',$diagram->id) }}">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="h-6 w-6"
                                            x-tooltip="tooltip">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                        Editar Diagrama
                                    </a>

                                </div>

                                {{-- Eliminar diagrama --}}
                                <div>
                                    <a wire:click="$emit('deleteDiagram',{{ $diagram->id }})"
                                        class="flex flex-row justify-center gap-2 btn-sm w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                                        href="#">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="h-6 w-6"
                                            x-tooltip="tooltip">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                        Eliminar Diagrama
                                    </a>
                                </div>


                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="px-6 py-3">

            {{ $diagrams->links() }}

        </div>
    </div>
</div>
