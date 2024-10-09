<?php
namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Notifications\Notifiable;
class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    protected $fillable = [
        'name', 'email', 'password', 'is_active',
    ];

    protected $hidden = [
        'password', 'remember_token',
    ];
    public function solved()
    {
        return $this->hasMany(Solved::class, 'quiz_id'); 
    }
}
