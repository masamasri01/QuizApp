<?php

namespace App\Http\Controllers;

use App\Models\Solved;
use Illuminate\Http\Request;
use App\Http\Resources\SolvedQuizResource;
use App\Models\Quiz;    // Make sure this is imported
class SolvedQuizController extends Controller
{

  
    public function index(Quiz $quiz)
{
    return SolvedQuizResource::collection($quiz->solved); // Return the solved quizzes for the specific quiz
}

    
        public function store(Request $request, Quiz $quiz)
        {
            $request->validate([
                'user_id' => 'sometimes|exists:users,id', // Optional user_id
                'score' => 'sometimes|integer', // Optional score
            ]);
        
            $solvedQuiz = $quiz->solved()->create([
                'user_id' => $request->input('user_id'), // Optional, can be null
                'score' => $request->input('score', 0), // Default score to 0 if not provided
            ]);
        
            return response()->json($solvedQuiz, 201);
        }
        
    
    /////////////////////////////////
    public function show(Quiz $quiz, Solved $solved)
    {
        return $solved;
    }

    public function destroy(Quiz $quiz, Solved $solved)
    {
        // Ensure that the solved quiz belongs to the given quiz
        if ($solved->quiz_id != $quiz->id) {
            return response()->json(['error' => 'Solved quiz not associated with this quiz'], 404);
        }

        // Delete the solved quiz
        $solved->delete();

        return response()->json(null, 204);
    }
}
