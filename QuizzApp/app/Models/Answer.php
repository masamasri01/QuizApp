<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    use HasFactory;
    protected $primaryKey = 'answer_id';
    protected $fillable = ['question_id', 'user_id', 'user_answer'];
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id'); 
    }
}
