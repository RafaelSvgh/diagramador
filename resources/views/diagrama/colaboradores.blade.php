@section('title', 'Colaboradores')
<x-app-layout>
    <div class="flex container mx-auto p-4 lg:p-8">
        <div class="overflow-hidden w-2/6 rounded-2xl bg-white border border-spacing-3 p-4 lg:p-12 lg:mr-2 shadow-xl">
            <label for="name" class="text-gray-400 text-sm">Nombre diagrama</label>
            <p id="name" class="text-2xl text-black font-bold leading-normal">{{ $diagram->diagram_name }}</p>
            {{-- <img src="{{ $diagram->diagram_img }}" alt="Diagrama" class="my-3"> --}}
            <div class="p-1">
                <label for="created_at" class="text-gray-400 text-sm">Tipo de Diagrama</label>
                <p id="created_at" class="text-md text-gray-700 ml-2 mb-2"><i
                        class="fa-sharp fa-solid fa-diagram-project"></i>{{ $diagram->diagram_type }}</p>
                <hr class="mb-3">
                <label for="created_at" class="text-gray-400 text-sm">Fecha de creación</label>
                <p id="created_at" class="text-md text-gray-700 ml-2 mb-2"><i
                        class="fa-regular fa-calendar mr-2"></i>{{ $diagram->created_at->toFormattedDateString() }}</p>
                <hr class="mb-3">
                <label for="created_at" class="text-gray-400 text-sm">Última actualización</label>
                <div class="flex justify-between">
                    <p id="created_at" class="text-md text-gray-700 ml-2 mb-2"><i
                            class="fa-regular fa-calendar mr-2"></i>{{ $diagram->updated_at->toFormattedDateString() }}
                    </p>
                    <p id="created_at" class="text-md text-gray-700 ml-2 mb-2"><i
                            class="fa-solid fa-clock mr-2"></i>{{ $diagram->updated_at->toTimeString() }}</p>
                </div>
            </div>
        </div>

        @livewire('diagrama.diagram-edit-colaboradores', ['diagram' => $diagram])

    </div>
</x-app-layout>
