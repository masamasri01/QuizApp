<?php


    namespace App\Http\Controllers;

    use App\Models\Question;
    use App\Models\Solved;
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
                'status' => 'required|string|in:0,1',
            ]);

            $quiz = Quiz::create($request->all());
            return response()->json($quiz, 201);
        }

      

        public function update(Request $request, $id)
        {
            $quiz = Quiz::find($id);
    
            if (!$quiz) {
                return response()->json(['message' => 'Quiz not found'], 404);
            }
    
            $request->validate([
                'title' => 'sometimes|required|string',
                'description' => 'sometimes|required|string',
                'examiner_id' => 'sometimes|required|integer',
                'time_limit' => 'sometimes|required|integer',
                'status' => 'sometimes|required|string|in:0,1',
            ]);
    
            $quiz->update($request->all());
            return response()->json($quiz, 200);
        }

        public function destroy(Quiz $quiz)
        {
           
            foreach ($quiz->solved as $solved) {
                $solved->answer()->delete(); 
           
            $quiz->solved()->delete(); 
        
            foreach ($quiz->questions as $question) {
                $question->answers()->delete(); 
            }
        
         
            $quiz->questions()->delete(); 
        
        
            $quiz->delete();
        
            return response()->json(null, 204);
        }
        
    }
    }        