import { useForm } from 'react-hook-form';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { PasswordInput } from '../components/PasswordInput';

export function LoginPage() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    if (isAuthenticated) {
        return <Navigate to="/products" replace />;
    }

    const onSubmit = handleSubmit(async (data) => {
        try {
            await login(data);
            toast.success('Welcome back!');
            navigate('/products');
        } catch (error) {
            toast.error('Invalid username or password');
        }
    });

    return (
        <div className="flex items-center justify-center min-h-[80vh]">
            <div className="w-full max-w-md bg-white dark:bg-zinc-800/50 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10 backdrop-blur-md">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-white">Login</h2>

                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
                        <input
                            type="text"
                            {...register("username", { required: "Username is required" })}
                            className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-zinc-900/50 border border-gray-300 dark:border-zinc-700 focus:ring-2 focus:ring-indigo-500 outline-none transition-all text-gray-900 dark:text-white"
                            placeholder="Enter your username"
                        />
                        {errors.username && <span className="text-red-500 text-sm mt-1">{errors.username.message}</span>}
                    </div>

                    <PasswordInput
                        label="Password"
                        name="password"
                        register={register}
                        validation={{ required: "Password is required" }}
                        error={errors.password}
                        placeholder="••••••••"
                    />

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg shadow-indigo-500/30"
                    >
                        Sign In
                    </button>
                </form>

                <p className="mt-6 text-center text-gray-600 dark:text-gray-400">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-indigo-600 hover:text-indigo-500 font-medium">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
}
