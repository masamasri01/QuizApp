<?php
// app/Http/Controllers/AnswerController.php

namespace App\Http\Controllers;

use App\Models\Answer;
use App\Models\Question;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function index(Question $question)
    {
        return $question->answers;
    }

    public function store(Request $request, Question $question)
    {
        $request->validate([
            'solved_id' => 'required|exists:users,id',
            'user_answer' => 'required|string',
        ]);

        $answer = new Answer([
            'question_id' => $question->question_id, 
            'solved_id' => $request->solved_id,
            'user_answer' => $request->user_answer,
        ]);

        $answer->save(); 

        return response()->json($answer, 201);
    }
  

public function show(Question $question, Request $request)
{
    // Validate that solved_id is passed in the request
    $request->validate([
        'solved_id' => 'required|exists:solveds,solved_id',
    ]);

    $answer = Answer::where('question_id', $question->question_id)
                    ->where('solved_id', $request->solved_id)
                    ->first();

    if ($answer) {
        return response()->json($answer, 200);
    } else {
        return response()->json(['message' => 'Answer not found'], 404);
    }
}


    public function update(Request $request, Question $question, Answer $answer)
    {
        $request->validate([
            'user_answer' => 'sometimes|required|string',
        ]);

        $answer->update($request->all());
        return response()->json($answer, 200);
    }

    public function destroy(Question $question, Answer $answer)
    {
        $answer->delete();
        return response()->json(null, 204);
    }
}
