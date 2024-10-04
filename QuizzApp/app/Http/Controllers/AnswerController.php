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
            'user_id' => 'required|exists:users,id',
            'user_answer' => 'required|string',
        ]);

        $answer = new Answer([
            'question_id' => $question->question_id, 
            'user_id' => $request->user_id,
            'user_answer' => $request->user_answer,
        ]);

        $answer->save(); // Save the new answer to the database

        return response()->json($answer, 201);
    }
    public function show(Question $question, Answer $answer)
    {
        return $answer;
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
