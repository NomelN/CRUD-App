import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function ProfilePage() {
    const { user, setUser } = useAuth();
    const { register, handleSubmit, formState: { errors }, watch, reset } = useForm({
        defaultValues: {
            first_name: '',
            last_name: '',
            username: '',
            email: ''
        }
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Reset form when user data is available
    useEffect(() => {
        if (user) {
            reset({
                first_name: user.first_name || '',
                last_name: user.last_name || '',
                username: user.username || '',
                email: user.email || ''
            });
        }
    }, [user, reset]);

    const onSubmit = handleSubmit(async (data) => {
        setIsLoading(true);
        try {
            const token = localStorage.getItem('access_token');
            const payload = {
                first_name: data.first_name,
                last_name: data.last_name,
                username: data.username,
                email: data.email
            };

            // Add password fields only if provided
            if (data.new_password) {
                if (!data.current_password) {
                    toast.error('Current password is required to change password');
                    setIsLoading(false);
                    return;
                }
                payload.current_password = data.current_password;
                payload.new_password = data.new_password;
            }

            const res = await axios.put(
                'http://localhost:8000/products/api/v1/auth/profile/',
                payload,
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update user in context
            setUser(res.data);
            toast.success('Profile updated successfully!');
        } catch (error) {
            console.error('Profile update failed', error);
            toast.error(error.response?.data?.error || 'Failed to update profile');
        } finally {
            setIsLoading(false);
        }
    });

    const newPassword = watch('new_password');

    return (
        <div className="max-w-2xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile Settings</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your personal information</p>
            </div>

            <form onSubmit={onSubmit} className="bg-white dark:bg-zinc-800 p-8 rounded-xl shadow-sm border border-gray-200 dark:border-white/10">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            First Name
                        </label>
                        <input
                            {...register('first_name')}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Last Name
                        </label>
                        <input
                            {...register('last_name')}
                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                        />
                    </div>
                </div>

                {/* Username */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Username
                    </label>
                    <input
                        {...register('username', { required: 'Username is required' })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                    />
                    {errors.username && (
                        <p className="mt-1 text-sm text-red-500">{errors.username.message}</p>
                    )}
                </div>

                {/* Email */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        disabled={!!user?.email}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-zinc-700 text-gray-900 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                    />
                    {user?.email && (
                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">Email cannot be changed once set</p>
                    )}
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
                    )}
                </div>

                <hr className="my-8 border-gray-200 dark:border-gray-700" />

                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Change Password</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">Leave blank if you don't want to change your password</p>

                {/* Current Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Current Password
                    </label>
                    <input
                        type="password"
                        {...register('current_password')}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                    />
                </div>

                {/* New Password */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        New Password
                    </label>
                    <input
                        type="password"
                        {...register('new_password', {
                            minLength: { value: 6, message: 'Password must be at least 6 characters' }
                        })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                    />
                    {errors.new_password && (
                        <p className="mt-1 text-sm text-red-500">{errors.new_password.message}</p>
                    )}
                </div>

                {/* Confirm New Password */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Confirm New Password
                    </label>
                    <input
                        type="password"
                        {...register('confirm_password', {
                            validate: value => !newPassword || value === newPassword || 'Passwords do not match'
                        })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white dark:bg-zinc-700 text-gray-900 dark:text-white"
                    />
                    {errors.confirm_password && (
                        <p className="mt-1 text-sm text-red-500">{errors.confirm_password.message}</p>
                    )}
                </div>

                {/* Buttons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {isLoading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-6 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
