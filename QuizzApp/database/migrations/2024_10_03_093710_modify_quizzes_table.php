<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class ModifyQuizzesTable extends Migration
{
    
    public function up()
    {
        Schema::table('quizzes', function (Blueprint $table) {
          
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
            
                $table->dropForeign(['examiner_id']); 
        
                $table->dropColumn(['title', 'description', 'examiner_id', 'time_limit', 'status']);
            });
        
        
    }
}