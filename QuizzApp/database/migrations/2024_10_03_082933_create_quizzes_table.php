<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuizzesTable extends Migration
{
    public function up()
    {
        Schema::create('quizzes', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('description')->nullable();
            $table->foreignId('examiner_id')->constrained('users')->onDelete('cascade');
            $table->integer('time_limit')->nullable(); // in minutes
            $table->string('status')->default('active'); // e.g., active, inactive, draft
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('quizzes');
    }
}