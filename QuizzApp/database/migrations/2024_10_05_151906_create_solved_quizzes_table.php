

<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSolvedQuizzesTable extends Migration
{
    public function up()
    {
        Schema::create('solveds', function (Blueprint $table) {
            $table->id('solved_id'); 
            $table->foreignId('quiz_id')->constrained('quizzes')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('no action');
            $table->integer('score')->nullable(); 
            $table->timestamps();
        });
    }
    

    public function down()
    {
        Schema::dropIfExists('solveds');
    }
}
