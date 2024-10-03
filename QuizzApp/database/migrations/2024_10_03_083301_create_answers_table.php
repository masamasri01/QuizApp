<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswersTable extends Migration
{
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            $table->id('answer_id');
            $table->foreignId('question_id')->constrained('questions', 'question_id')->onDelete('cascade'); // Specify the foreign key reference explicitly
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Assuming you have a users table
            $table->string('user_answer'); // This will store the answer given by the user
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('answers');
    }
}
