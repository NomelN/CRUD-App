import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function LandingPage() {
    const { isAuthenticated } = useAuth();

    return (
        <div className="min-h-[calc(100vh-80px)] flex flex-col">
            {/* Hero Section */}
            <section className="flex-1 flex flex-col justify-center items-center text-center px-4 py-20 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-200/30 via-transparent to-transparent dark:from-indigo-900/30"></div>

                <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-up">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 text-sm font-medium mb-4">
                        🚀 The Future of Stock Management
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                        Manage Your Inventory <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
                            Like a Pro
                        </span>
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
                        Streamline your operations with our powerful, intuitive, and beautiful stock management solution. Track products, analyze trends, and grow your business.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                        {isAuthenticated ? (
                            <Link
                                to="/dashboard"
                                className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2"
                            >
                                Go to Dashboard
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                                </svg>
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/register"
                                    className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg shadow-indigo-500/30"
                                >
                                    Get Started Free
                                </Link>
                                <Link
                                    to="/login"
                                    className="px-8 py-4 bg-white dark:bg-zinc-800 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 rounded-xl font-bold text-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all"
                                >
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-sm">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Everything you need</h2>
                        <p className="text-gray-600 dark:text-gray-400">Powerful features to help you stay on top of your inventory</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Real-time Tracking",
                                description: "Monitor stock levels instantly. Get low stock alerts and never run out of best-sellers.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 006 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0118 16.5h-2.25m-7.5 0h7.5m-7.5 0l-1 3m8.5-3l1 3m0 0l.5 1.5m-.5-1.5h-9.5m0 0l-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6" />
                                    </svg>
                                ),
                                color: "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400"
                            },
                            {
                                title: "Smart Analytics",
                                description: "Visualize your data with beautiful charts. Understand trends and make data-driven decisions.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
                                    </svg>
                                ),
                                color: "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400"
                            },
                            {
                                title: "Secure & Reliable",
                                description: "Enterprise-grade security for your data. Role-based access control and encrypted connections.",
                                icon: (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                                    </svg>
                                ),
                                color: "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400"
                            }
                        ].map((feature, index) => (
                            <div key={index} className="p-8 rounded-2xl bg-white dark:bg-zinc-800 border border-gray-100 dark:border-zinc-700/50 hover:shadow-xl transition-all hover:-translate-y-1">
                                <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-6`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{feature.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
