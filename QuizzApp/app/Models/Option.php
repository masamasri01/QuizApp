<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
 
class Option extends Model
{
    use HasFactory;
    protected $primaryKey = 'option_id';
    protected $fillable = ['question_id', 'option_text', 'is_correct'];
    public function question()
    {
        return $this->belongsTo(Question::class, 'question_id');
    }
}
