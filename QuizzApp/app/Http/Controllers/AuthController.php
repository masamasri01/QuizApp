<?php
namespace App\Http\Controllers;


use Illuminate\Foundation\Auth\AuthenticatesUsers; 
use App\Http\Controllers\Controller; 
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;



class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_active' => true, // New users are active by default
        ]);

        return response()->json(['message' => 'User registered successfully']);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        if (!$user->is_active) {
            return response()->json(['message' => 'User is inactive'], 403);
        }

        $token = $user->createToken('authToken')->plainTextToken;

        return response()->json(['token' => $token]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }


    public function refresh(Request $request)
    {
        $user = $request->user();
        
        // Optional: Check if user is authenticated
        if (!$user) {
            return response()->json(['message' => 'Unauthenticated'], 401);
        }
    
        // Revoke all tokens for this user
        $user->tokens()->delete();
    
        // Issue a new token
        $newToken = $user->createToken('authToken')->plainTextToken;
    
        return response()->json(['new_token' => $newToken]);
    }
    

}
