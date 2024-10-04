<div>
    <!-- Filters -->
    <div class="mb-4 border-b border-slate-200">
        
        <div class="relative">
            <x-input wire:model='search' type="search" placeholder="Search…"
                class="w-2/4 form-input pl-9  focus:ring-indigo-500 focus:border-indigo-500" />
            <span class="absolute pr-3 pt-2.5 inset-0 right-auto  ">
                <svg class=" w-4 h-4 shrink-0 fill-current text-slate-400 group-hover:text-slate-500 ml-3 mr-2"
                    viewBox="0 0 16 16" xmlns="https://www.w3.org/2000/svg">
                    <path
                        d="M7 14c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7zM7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5-2.243-5-5-5z" />
                    <path
                        d="M15.707 14.293L13.314 11.9a8.019 8.019 0 01-1.414 1.414l2.393 2.393a.997.997 0 001.414 0 .999.999 0 000-1.414z" />
                </svg>
            </span>
        </div>

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
            @if ($diagram_has_users->isEmpty())
                <h2 class="text-xl leading-snug text-slate-800 font-bold mb-5">No existe ningun registro coincidente
                </h2>
            @else
                <h2 class="text-xl leading-snug text-slate-800 font-bold mb-5">Diagramas disponibles</h2>
            @endif

            <div class="grid grid-cols-12 gap-6">
                @foreach ($diagram_has_users as $diagram_has_user)
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
                                        <h3 class="text-lg text-slate-800 font-semibold">{{ $diagram_has_user->diagram_name }}
                                        </h3>
                                    </header>
                                    <!-- List -->
                                    <ul class="text-sm space-y-2 mb-5">
                                        <li class="flex items-center">
                                            <img class="w-4 h-4 fill-current text-slate-400 shrink-0 mr-3" src="{{asset('images/tipos.png')}}" alt="">
                                            
                                            <div class=>Tipo: {{ $diagram_has_user->diagraman_type }}</div>
                                        </li>
                                        <li class="flex items-center">
                                            <svg class="w-4 h-4 fill-current text-black shrink-0 mr-3"
                                                viewBox="0 0 16 16">
                                                <path
                                                    d="M15 2h-2V0h-2v2H9V0H7v2H5V0H3v2H1a1 1 0 00-1 1v12a1 1 0 001 1h14a1 1 0 001-1V3a1 1 0 00-1-1zm-1 12H2V6h12v8z" />
                                            </svg>
                                            <div class="text-rose-500">Fecha: {{ $diagram_has_user->created_at }}</div>
                                        </li>

                                    </ul>
                                </div>

                                <!-- Card footer -->

                                {{-- editar diagrama --}}
                                <div class="mb-4">
                                    <a 
                                        class="flex flex-row justify-center gap-2 btn-sm w-full bg-indigo-500 hover:bg-indigo-600 text-white"
                                        href="{{route("diagrama.edit",$diagram_has_user->diagram_id)}}">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke-width="1.5" stroke="currentColor" class="h-6 w-6"
                                            x-tooltip="tooltip">
                                            <path stroke-linecap="round" stroke-linejoin="round"
                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
                                        </svg>
                                        Editar Diagrama
                                    </a>

                                </div>     
                            </div>
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="px-6 py-3">

            {{ $diagram_has_users->links() }}

        </div>
    </div>
</div>
