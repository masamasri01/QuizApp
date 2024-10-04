<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class AnswerSeeder extends Seeder
{
    public function run()
    {
        // Fetch existing question IDs and user IDs
        $questionIds = DB::table('questions')->pluck('question_id')->toArray();
        $userIds = DB::table('users')->pluck('id')->toArray();

        foreach ($questionIds as $questionId) {
            // Randomly select a user for each answer
            $userId = $userIds[array_rand($userIds)];

            DB::table('answers')->insert([
                'question_id' => $questionId,
                'user_id' => $userId,
                'user_answer' => Str::random(10), // Random user answer
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
