<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Solved extends Model
{
    use HasFactory;
    protected $primaryKey = 'solved_id'; 
    protected $fillable = [
        'user_id',
        'quiz_id',
        'score',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }
    public function answer()
    {
        return $this->hasMany(Answer::class, 'solved_id');
    }
    
}
