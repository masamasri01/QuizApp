<?php


    namespace App\Http\Controllers;
    
    use App\Models\Question;
    use App\Models\Quiz;
    use Illuminate\Http\Request;
    
    class QuestionController extends Controller
    {
        public function index(Quiz $quiz)
        {
            return $quiz->questions;
        }
    
        public function store(Request $request, Quiz $quiz)
        {
            $request->validate([
                'question_text' => 'required|string',
                'question_type' => 'required|in:Multiple Choice,Checkbox',
            ]);
    
            $question = $quiz->questions()->create($request->all());
            return response()->json($question, 201);
        }
    
        public function show(Quiz $quiz, Question $question)
        {
            return $question;
        }
    
        public function update(Request $request, Quiz $quiz, Question $question)
        {
            $request->validate([
                'question_text' => 'sometimes|required|string',
                'question_type' => 'sometimes|required|in:Multiple Choice,Checkbox',
            ]);
    
            $question->update($request->all());
            return response()->json($question, 200);
        }
    
        public function destroy(Quiz $quiz, Question $question)
        {
            $question->delete();
            return response()->json(null, 204);
        }
    }
    