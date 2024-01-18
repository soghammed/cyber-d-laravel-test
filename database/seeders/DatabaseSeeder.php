<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\CoffeeSale;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'name' => 'Sales Agent',
            'email' => 'sales@coffee.shop',
        ]);

        CoffeeSale::create([
            'quantity' => 1,
            'unit_cost' => 1000,
            'selling_price' => 2333
        ]);
    }
}
