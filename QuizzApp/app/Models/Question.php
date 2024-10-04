<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    use HasFactory;

    protected $fillable = ['quiz_id', 'question_text', 'question_type'];
    protected $primaryKey = 'question_id';
    public function options()
    {
        return $this->hasMany(Option::class, 'question_id');
    }
    public function quiz()
    {
        return $this->belongsTo(Quiz::class, 'quiz_id'); 
    }
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }
}
