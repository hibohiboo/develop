<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;

class HomeTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */
    public function test_ステータスコード()
    {
        $response = $this->get('/home');

        $response->assertStatus(200);
    }

    public function test_本文()
    {
        $response = $this->get('/home');

        $response->assertSeeText("こんにちは");
    }}
