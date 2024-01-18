<x-app-layout>
    <x-slot name="header">
        <h2 class="font-semibold text-xl text-gray-800 leading-tight">
            {{ __('New ☕️ Sales') }}
        </h2>
    </x-slot>

    <div class="py-12">
        <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div class="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                <div class="p-6 sm:flex bg-white border-b border-gray-200">
                    <div class="mr-3">
                        <label for="quantity" class="block text-sm font-medium leading-6 text-gray-900">{{ __('Quantity') }}</label>
                        <input type="number" name="quantity" class="rounded" id="quantity"/>
                    </div>
                    <div class="mr-3">
                        <label for="unit-cost" class="block text-sm font-medium leading-6 text-gray-900">{{ __('Unit Cost (£)') }}</label>
                        <input type="number" name="unit-cost" class="rounded" id="unit-cost"/>
                    </div>
                    <div class="ml-4">
                        <label for="quantity" class="block text-sm font-medium leading-6 text-gray-900">{{ __('Selling Price') }}</label>
                        <div class="h-10 leading-10" id="selling-price">£0.00</div>
                        <input type="hidden" id="selling-price-value"/>
                    </div>
                    <div class="ml-4 flex items-end">
                        <button class="bg-blue-500 p-2 text-white active:bg-blue-600 rounded hover:bg-blue-400" id="record-sale">{{ __('Record Sale') }}</button>
                    </div>
                </div>

                <div class="p-6 bg-white">
                    <h2 class="font-semibold text-xl text-gray-800 leading-tight mb-3">
                        {{ __('Previous Sales') }}
                    </h2>

                    <table class="w-3/5 max-w-3/5 border-collapse border-2 border-gray-500 table-auto" id="previous-sales">
                        <thead>
                            <th class="bg-gray-300 border-r-2 border-gray-500 text-left pl-2">{{ __('Quantity') }}</th>
                            <th class="bg-gray-300 border-r-2 border-gray-500 text-left pl-2">{{ __('Unit Cost') }}</th>
                            <th class="bg-gray-300 border-r-2 border-gray-500 text-left pl-2">{{ __('Selling Price') }}</th>
                        </thead>
                        <tbody>
                        </tbody>
                    </table>
                </div>
                
            </div>
        </div>
    </div>
</x-app-layout>
