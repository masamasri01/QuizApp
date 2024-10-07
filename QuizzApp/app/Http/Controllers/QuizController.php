<?php


    namespace App\Http\Controllers;

    use App\Models\Question;
    use App\Models\Quiz;
    use Illuminate\Http\Request;

    class QuizController extends Controller
    {
       
        public function index(Request $request)
        { 
            $quizzes = Quiz::all();
    
            return response()->json($quizzes);
        }
        public function show($id)
        {
            $quiz = Quiz::with('questions')->find($id);
    
            if (!$quiz) {
                return response()->json(['message' => 'Quiz not found'], 404);
            }
    
            return response()->json($quiz);
        }

        public function store(Request $request)
        {
            $request->validate([
                'title' => 'required|string',
                'description' => 'required|string',
                'examiner_id' => 'required|integer',
                'time_limit' => 'required|integer',
                'status' => 'required|string|in:active,inactive',
            ]);

            $quiz = Quiz::create($request->all());
            return response()->json($quiz, 201);
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
