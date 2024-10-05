<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class SolvedSeeder extends Seeder
{
    public function run()
    {
        // Fetch existing quiz IDs and user IDs
        $quizIds = DB::table('quizzes')->pluck('id')->toArray();
        $userIds = DB::table('users')->pluck('id')->toArray();

        // Check if there are quizzes and users before seeding
        if (empty($quizIds) || empty($userIds)) {
            return; 
        }

        foreach ($userIds as $userId) {
            foreach ($quizIds as $quizId) {
                DB::table('solveds')->insert([
                    'user_id' => $userId,
                    'quiz_id' => $quizId,
                    'score' => rand(0, 100), // Random score between 0 and 100
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
