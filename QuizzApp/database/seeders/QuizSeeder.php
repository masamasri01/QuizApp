<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class QuizSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 0; $i < 10; $i++) { // add 10 quizzes
            DB::table('quizzes')->insert([
                'title' => 'Quiz ' . ($i + 1), // Simple title
                'description' => Str::random(50), // Random description
                'examiner_id' => rand(1, 10), // Random examiner ID, assuming IDs are 1 to 10
                'time_limit' => rand(10, 60), // Random time limit between 10 and 60 minutes
                'status' => rand(0, 1) // Random status (0 or 1)
            ]);
        }
    }
}
