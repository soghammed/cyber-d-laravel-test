<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Artisan;

class CoffeeSalesTest extends TestCase
{
    use RefreshDatabase;

    /**
     * get sales route.
     */
    public function test_get_sales_route(): void
    {
        \Artisan::call('db:seed');
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)
                         ->get('/coffee-sales');

        $response->assertStatus(200)
            ->assertJsonStructure(
                ['sales', 'status']
            );
    }

    /**
     * post sale route.
     */
    public function test_post_sale_route(): void
    {
        \Artisan::call('db:seed');
        $user = User::findOrFail(1);
        $response = $this->actingAs($user)
                         ->post('/coffee-sales/store', [
                            'quantity' => '1',
                            'unit_cost' => '10',
                            'selling_price' => '23.33',
                            'product' => 'gold'
                         ]);

        $response->assertStatus(200)
            ->assertJsonStructure(
                ['sale', 'status']
            );
    }
}
