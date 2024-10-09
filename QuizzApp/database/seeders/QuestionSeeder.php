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

        // Predefined question texts
        $questions = [
            'What is the capital of France?',
            'Which planet is known as the Red Planet?',
            'Who wrote "To Kill a Mockingbird"?',
            'What is the square root of 64?',
            'Which element has the chemical symbol "O"?',
            'In what year did World War II end?',
            'Who discovered penicillin?',
            'Which country hosted the 2016 Summer Olympics?',
            'What is the largest mammal on Earth?',
            'What is the boiling point of water at sea level?'
        ];

        $questionTypes = ['Multiple Choice', 'Checkbox']; // Match with migration enum values

        foreach ($questions as $index => $questionText) {
            DB::table('questions')->insert([
                'quiz_id' => $quizIds[array_rand($quizIds)], // Pick a random existing quiz ID
                'question_text' => $questionText, // Use the predefined question text
                'question_type' => $questionTypes[array_rand($questionTypes)], // Randomly select a valid type
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
