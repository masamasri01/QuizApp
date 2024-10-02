<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function toggleUserStatus($id)
    {
        $user = User::find($id);
        
        if ($user) {
            $user->is_active = !$user->is_active;
            $user->save();

            return response()->json(['message' => 'User status updated successfully']);
        }

        return response()->json(['message' => 'User not found'], 404);
    }
    public function index(Request $request)
    {
        // Fetch all users
        $users = User::all();

        return response()->json($users);
    }
}
