<?php
// app/Models/Quiz.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    use HasFactory;
    protected $primaryKey = 'id'; 
    protected $fillable = [
        'title',
        'description',
        'examiner_id',
        'time_limit',
        'status'
    ];

    public function questions()
    {
        return $this->hasMany(Question::class, 'quiz_id'); 
    }
    public function solved()
    {
        return $this->hasMany(Solved::class, 'quiz_id'); 
    }
}
