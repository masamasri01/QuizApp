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
        // Predefined quiz titles and descriptions
        $quizzes = [
            ['title' => 'General Knowledge Quiz', 'description' => 'A quiz to test your general knowledge on various topics.'],
            ['title' => 'Math Fundamentals', 'description' => 'A quiz covering basic math principles, including algebra and geometry.'],
            ['title' => 'History Challenge', 'description' => 'Test your knowledge of world history from ancient civilizations to modern times.'],
            ['title' => 'Science Exploration', 'description' => 'A science-based quiz covering physics, chemistry, and biology.'],
            ['title' => 'Geography Trivia', 'description' => 'How well do you know the world? Take this quiz to find out.'],
            ['title' => 'Literature Mastery', 'description' => 'A quiz to evaluate your knowledge of classic and modern literature.'],
            ['title' => 'Computer Science Basics', 'description' => 'An introductory quiz on programming concepts and computer science fundamentals.'],
            ['title' => 'Music Theory Quiz', 'description' => 'A quiz focused on basic music theory, scales, and chords.'],
            ['title' => 'Pop Culture Quiz', 'description' => 'Test your knowledge of movies, music, and pop culture trends.'],
            ['title' => 'Fitness and Health Quiz', 'description' => 'A quiz to assess your knowledge of fitness, nutrition, and overall health.'],
        ];

        // Loop through the predefined quizzes and insert them into the database
        foreach ($quizzes as $index => $quiz) {
            DB::table('quizzes')->insert([
                'title' => $quiz['title'],
                'description' => $quiz['description'],
                'examiner_id' => rand(1, 10), // Assuming examiner IDs range from 1 to 10
                'time_limit' => rand(10, 60), // Random time limit between 10 and 60 minutes
                'status' => rand(0, 1), // Random status (0 or 1)
            ]);
        }
    }
}
