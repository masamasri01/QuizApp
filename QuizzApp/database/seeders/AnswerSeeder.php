<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AnswerSeeder extends Seeder
{
    public function run()
    {
        // Fetch existing question IDs, user IDs, and option IDs
        $questionIds = DB::table('questions')->pluck('question_id')->toArray();
        $solvedIds = DB::table('solveds')->pluck('solved_id')->toArray();

        foreach ($questionIds as $questionId) {
            // Randomly select a user for each answer
            $solvedId = $solvedIds[array_rand($solvedIds)];

            // Get all options for the current question
            $optionIds = DB::table('options')->where('question_id', $questionId)->pluck('option_id')->toArray();

            // Randomly select an option for the user's answer
            if (!empty($optionIds)) {
                $selectedOptionId = $optionIds[array_rand($optionIds)];
                
                // Get the actual option text
                $userAnswer = DB::table('options')->where('option_id', $selectedOptionId)->value('option_text');

                DB::table('answers')->insert([
                    'question_id' => $questionId,
                    'solved_id' => $solvedId,
                    'user_answer' => $userAnswer, // Use the actual option text as the user answer
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
