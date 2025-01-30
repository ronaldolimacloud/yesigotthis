<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Aws\CognitoIdentityProvider\CognitoIdentityProviderClient;

class CreateAdminUser extends Command
{
    protected $signature = 'admin:create {email} {name}';
    protected $description = 'Create an admin user in both Cognito and local DB';

    public function handle()
    {
        try {
            $email = $this->argument('email');
            $name = $this->argument('name');
            
            // Generate a secure temporary password
            $tempPassword = bin2hex(random_bytes(12));
            
            // Create user in Cognito
            $cognitoClient = new CognitoIdentityProviderClient([
                'version' => 'latest',
                'region'  => config('services.cognito.region'),
            ]);
            
            $result = $cognitoClient->adminCreateUser([
                'UserPoolId' => config('services.cognito.user_pool_id'),
                'Username' => $email,
                'TemporaryPassword' => $tempPassword,
                'UserAttributes' => [
                    ['Name' => 'email', 'Value' => $email],
                    ['Name' => 'name', 'Value' => $name],
                    ['Name' => 'custom:is_admin', 'Value' => 'true'],
                ],
            ]);
            
            // Create user in local DB
            User::create([
                'name' => $name,
                'email' => $email,
                'is_admin' => true,
                'cognito_sub' => $result['User']['Username'],
            ]);

            $this->info('Admin user created successfully!');
            $this->info("Temporary password: {$tempPassword}");
            $this->info('User will be required to change password on first login');
            
        } catch (\Exception $e) {
            $this->error('Failed to create admin user: ' . $e->getMessage());
        }
    }
} 