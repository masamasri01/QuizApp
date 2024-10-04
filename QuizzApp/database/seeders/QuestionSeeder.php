<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class QuestionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Get existing quiz IDs
        $quizIds = DB::table('quizzes')->pluck('id')->toArray();

        // Ensure there are quizzes before seeding questions
        if (empty($quizIds)) {
            return; // Exit if there are no quizzes
        }

        $questionTypes = ['Multiple Choice', 'Checkbox']; // Match with migration enum values

        for ($i = 0; $i < 10; $i++) {
            DB::table('questions')->insert([
                'quiz_id' => $quizIds[array_rand($quizIds)], // Pick a random existing quiz ID
                'question_text' => Str::random(30),
                'question_type' => $questionTypes[array_rand($questionTypes)], // Randomly select a valid type
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
