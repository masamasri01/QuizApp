<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB; 

use Illuminate\Support\Str; 
use Illuminate\Support\Facades\Hash; 

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Predefined list of real names and emails
        $users = [
            ['name' => 'John Doe', 'email' => 'johndoe@example.com'],
            ['name' => 'Jane Smith', 'email' => 'janesmith@example.com'],
            ['name' => 'Alice Johnson', 'email' => 'alicejohnson@example.com'],
            ['name' => 'Bob Brown', 'email' => 'bobbrown@example.com'],
            ['name' => 'Charlie Green', 'email' => 'charliegreen@example.com'],
            ['name' => 'David White', 'email' => 'davidwhite@example.com'],
            ['name' => 'Eva Black', 'email' => 'evablack@example.com'],
            ['name' => 'Frank Harris', 'email' => 'frankharris@example.com'],
            ['name' => 'Grace Lee', 'email' => 'gracelee@example.com'],
            ['name' => 'Henry Walker', 'email' => 'henrywalker@example.com'],
        ];

        // Loop through the list and insert each user into the database
        foreach ($users as $user) {
            DB::table('users')->insert([
                'name' => $user['name'],
                'email' => $user['email'],
                'password' => Hash::make('password'), // Default password for all users
                'is_active' => true,
            ]);
        }
    }
}
