<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            $table->id('question_id'); // This should define the primary key as 'question_id'
            $table->foreignId('quiz_id')->constrained('quizzes')->onDelete('cascade');
            $table->string('question_text');
            $table->enum('question_type', ['Multiple Choice', 'Checkbox']);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
