<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class OptionSeeder extends Seeder
{
    public function run()
    {
        // Fetch all existing question IDs
        $questionIds = DB::table('questions')->pluck('question_id')->toArray();

        foreach ($questionIds as $questionId) {
            for ($i = 0; $i < 5; $i++) { // Add 5 options per question
                DB::table('options')->insert([
                    'question_id' => $questionId,
                    'option_text' => Str::random(10),
                    'is_correct' => rand(0, 1),
                    'created_at' => now(),
                    'updated_at' => now(),
                ]);
            }
        }
    }
}
