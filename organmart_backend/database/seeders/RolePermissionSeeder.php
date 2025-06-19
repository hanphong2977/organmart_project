<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Reset cache
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

         // Tạo permissions tương ứng API
        $permissions = [
            'manage.categories',
            'manage.products',
            'manage.recipes',
            'manage.cart',
            'manage.orders',
            'manage.library_items',
            'dashboard.view',
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(['name' => $permission]);
        }

        // Tạo role admin và gán tất cả quyền
        $adminRole = Role::firstOrCreate(['name' => 'admin']);
        $adminRole->syncPermissions($permissions);

        // Tạo user admin mặc định (nếu chưa có)
        $adminEmail = 'admin@example.com';
        $admin = User::where('email', $adminEmail)->first();
        if (!$admin) {
            $admin = User::create([
                'username' => 'admin',
                'email' => $adminEmail,
                'password' => bcrypt('1111'),
                'phone' => '0123456789',
            ]);
        }

        // Gán role admin cho user
        $admin->assignRole('admin');
    }
}
