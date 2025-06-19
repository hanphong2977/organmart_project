<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    // Danh sách người dùng
    public function index(Request $request)
    {
        $users = User::with('roles')->orderBy('created_at', 'desc')->paginate(10);
        $roles = Role::all();

        return Inertia::render('Admin/Users', [
            'users' => $users,
            'roles' => $roles,
        ]);
    }

    // Hiển thị form tạo người dùng
    public function create()
    {
        $roles = Role::all();

        return Inertia::render('Admin/Users/Create', [
            'roles' => $roles,
        ]);
    }

    // Lưu người dùng mới
    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'phone'    => 'required|string|max:15|unique:users,phone',
            'email'    => 'required|email|unique:users,email',
        ]);

        $user = User::create([
            'username' => $request->username,
            'email'    => $request->email,
            'phone'    => $request->phone,
            'password' => Hash::make($request->password),
        ]);

        $user->assignRole($request->role);

        return redirect()->route('users.index')->with('success', 'Tạo người dùng thành công.');
    }


    // Hiển thị form chỉnh sửa
    public function edit($id)
    {
        $user = User::findOrFail($id);
        $roles = Role::all();

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => $roles,
            'user_role' => $user->roles->pluck('name')->first(), // lấy role đầu tiên
        ]);
    }


    // Cập nhật người dùng
    public function update(Request $request, $id)
    {
        $request->validate([
            'username' => 'required|string|max:255',
            'email'    => 'required|email|unique:users,email,' . $id,
            'phone'    => 'required|string|max:15|unique:users,phone,' . $id,
        ]);

        $user = User::findOrFail($id);
        $user->username = $request->username;
        $user->email = $request->email;
        $user->phone = $request->phone;

        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }

        $user->save();

        // Gỡ role cũ và gán role mới
        $user->syncRoles([$request->role]);
        return redirect()->route('users.index')->with('success', 'Cập nhật người dùng thành công.');
    }

    // Xóa người dùng
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return back()->with('success', 'Xóa người dùng thành công.');
    }
}
