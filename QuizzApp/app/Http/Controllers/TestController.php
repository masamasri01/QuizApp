<?php

namespace App\Http\Controllers;

use App\Models\Test;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        return Test::all(); // Get all records from the tests table
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $test = Test::create($request->only('name')); // Create a new record

        return response()->json($test, 201); // Return the created record with a 201 status
    }
}
