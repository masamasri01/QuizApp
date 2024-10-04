<?php
namespace App\Http\Controllers;

use App\Models\Option;
use App\Models\Question;
use Illuminate\Http\Request;

class OptionController extends Controller
{


    public function index(Question $question)
    {
        return $question->options;
    }
    // public function store(Request $request, Question $question)
    // {
    //  //   \Log::info($request->all()); // Log the incoming request data

    //     $request->validate([
    //         'option_text' => 'required|string',
    //         'is_correct' => 'required|boolean',
    //     ]);

    //     $option = new Option([
    //         'question_id' => $question->question_id,
    //         'option_text' => $request->option_text,
    //         'is_correct' => $request->is_correct,
    //     ]);

    //     $option->save();

    //     return response()->json($option, 201);
    // }


        public function store(Request $request, Question $question)
        {
            $request->validate([
                'option_text' => 'required|string',
                'is_correct' => 'required|boolean',
                ]);

            // Create the option using only the validated data
            $option = $question->options()->create([
                'option_text' => $request->option_text,
                'is_correct' => $request->is_correct,
               ]);

            return response()->json($option, 201);
        }




    public function show(Question $question, Option $option)
    {
        return $option;
    }

    public function update(Request $request, Question $question, Option $option)
    {
        $request->validate([
            'option_text' => 'sometimes|required|string',
            'is_correct' => 'sometimes|required|boolean',
        ]);

        $option->update($request->all());
        return response()->json($option, 200);
    }

    public function destroy(Question $question, Option $option)
    {
        $option->delete();
        return response()->json(null, 204);
    }
}
