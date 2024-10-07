<?php


namespace App\Http\Controllers;
use App\Http\Controllers\AnswerController;
use App\Http\Controllers\SolvedQuizController;
use App\Models\Answer;
use App\Models\Solved;
use App\Models\Question;
use Illuminate\Http\Request;

class AnswerController extends Controller
{
    public function index(Question $question)
    {
        return response()->json($question->answers, 200);
    }

    public function store(Request $request, Question $question)
    {
        $request->validate([
            'solved_id' => 'required|exists:solveds,solved_id',
            'user_answer' => 'required|string',
        ]);

        $answer = new Answer([
            'question_id' => $question->id, 
            'solved_id' => $request->solved_id,
            'user_answer' => $request->user_answer,
        ]);

        $answer->save(); 

        return response()->json($answer, 201);
    }
  
    public function storeForSolved(Request $request, $solved_id, Question $question)
    {
        // Validate input data
        $request->validate([
            'user_answer' => 'required|string',
        ]);

        $solved = Solved::find($solved_id);
        if (!$solved) {
            return response()->json(['message' => 'Solved quiz not found'], 404);
        }

        $answer = new Answer([
            'question_id' => $question->question_id,
            'solved_id' => $solved_id,
            'user_answer' => $request->user_answer,
        ]);

        $answer->save();

        return response()->json($answer, 201);
    }
    public function getAnswersByQuestionAndSolved($solved_id, Question $question)
{
    // Validate that the solved quiz exists
    $solved = Solved::find($solved_id);
    if (!$solved) {
        return response()->json(['message' => 'Solved quiz not found'], 404);
    }

    // Get answers based on the question_id and solved_id
    $answers = Answer::where('question_id', $question->question_id)
                     ->where('solved_id', $solved_id)
                     ->get();

    // Check if answers exist
    if ($answers->isEmpty()) {
        return response()->json(['message' => 'No answers found for this question and solved quiz'], 404);
    }

    // Return the list of answers
    return response()->json($answers, 200);
}

    public function show(Question $question, Request $request)
    {
        $request->validate([
            'solved_id' => 'required|exists:solveds,solved_id',
        ]);

        $answer = Answer::where('question_id', $question->id)
                        ->where('solved_id', $request->solved_id)
                        ->first();

        if ($answer) {
            return response()->json($answer, 200);
        } else {
            return response()->json(['message' => 'Answer not found'], 404);
        }
    }


    public function update(Request $request,  Answer $answer)
    {
        $request->validate([
            'user_answer' => 'sometimes|required|string',
        ]);

        $answer->update($request->all());
        return response()->json($answer, 200);
    }

    public function destroy( Answer $answer)
    {
        $answer->delete();
        return response()->json(null, 204);
    }
}
