<?php

namespace App\Http\Controllers;

use App\Models\CoffeeSale;
use Illuminate\Http\Request;

class CoffeeSaleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request, CoffeeSale $coffeeSale)
    {   
        $coffeeSales = $coffeeSale->all();

        return response()->json([
            'sales' => $coffeeSales,
            'status' => 200
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, CoffeeSale $coffeeSale)
    {
        $request->validate([
            'quantity' => 'required|numeric',
            'unit_cost' => 'required|numeric',
            'selling_price' => 'required|numeric'
        ]);

        $before = $request->all();
        $data = $request->all();
        $data['quantity'] = (int) $data['quantity'];
        $data['unit_cost'] *= 100;
        $data['selling_price'] *= 100;

        $coffeeSale = $coffeeSale->create($data);

        return response()->json([
            'sale' => $coffeeSale,
            'status' => $coffeeSale ? 200 : 500
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(CoffeeSale $coffeeSale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(CoffeeSale $coffeeSale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, CoffeeSale $coffeeSale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(CoffeeSale $coffeeSale)
    {
        //
    }
}
