<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyQuizzesTable extends Migration
{
    
    public function up()
    {
        Schema::table('quizzes', function (Blueprint $table) {
            // Check if the column doesn't exist before adding
            if (!Schema::hasColumn('quizzes', 'title')) {
                $table->string('title');
            }

            if (!Schema::hasColumn('quizzes', 'description')) {
                $table->text('description')->nullable();
            }

            if (!Schema::hasColumn('quizzes', 'examiner_id')) {
                $table->unsignedBigInteger('examiner_id')->nullable();
            }

            if (!Schema::hasColumn('quizzes', 'time_limit')) {
                $table->integer('time_limit')->nullable();
            }

            if (!Schema::hasColumn('quizzes', 'status')) {
                $table->enum('status', ['active', 'inactive', 'draft'])->default('draft');
            }
        });
    }

    public function down()
    {
        Schema::table('quizzes', function (Blueprint $table) {
            // You can drop columns if you want to revert the changes
            $table->dropColumn(['title', 'description', 'examiner_id', 'time_limit', 'status']);
        });
    }
}