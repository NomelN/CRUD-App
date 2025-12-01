import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    PieChart, Pie, Cell, LineChart, Line
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

export function DashboardPage() {
    const [stats, setStats] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const { user } = useAuth();

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const res = await axios.get('http://localhost:8000/products/api/v1/stats/', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setStats(res.data);
            } catch (error) {
                console.error("Failed to fetch stats", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchStats();
    }, []);

    if (isLoading) return <div className="flex justify-center items-center h-screen">Loading Dashboard...</div>;
    if (!stats) return <div className="text-center py-10">Failed to load data</div>;

    const { metrics, charts } = stats;

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Dashboard</h1>

            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-white/10">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Stock Value</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{metrics.total_stock_value}€</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-white/10">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Total Products</h3>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{metrics.total_products}</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-white/10">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Low Stock Items</h3>
                    <p className="text-3xl font-bold text-yellow-500 mt-2">{metrics.low_stock_count}</p>
                </div>
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-white/10">
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">Out of Stock</h3>
                    <p className="text-3xl font-bold text-red-500 mt-2">{metrics.out_of_stock_count}</p>
                </div>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Stock Evolution (Line Chart) */}
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-white/10">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Stock Value Evolution</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={charts.stock_evolution}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                                <XAxis dataKey="month" stroke="#9CA3AF" />
                                <YAxis stroke="#9CA3AF" />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Line type="monotone" dataKey="value" stroke="#6366f1" strokeWidth={3} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Distribution (Pie Chart) */}
                <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-white/10">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Stock Value by Category</h3>
                    <div className="h-80 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={charts.category_distribution}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    label={false}
                                    outerRadius={90}
                                    fill="#8884d8"
                                    dataKey="value"
                                    nameKey="category__name"
                                >
                                    {charts.category_distribution.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#fff',
                                        border: '1px solid #e5e7eb',
                                        borderRadius: '8px',
                                        color: '#111827',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                    }}
                                    itemStyle={{ color: '#111827' }}
                                />
                                <Legend
                                    verticalAlign="middle"
                                    align="right"
                                    layout="vertical"
                                    iconType="circle"
                                    wrapperStyle={{ paddingLeft: '20px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Top Products (Bar Chart) */}
            <div className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-white/10 lg:col-span-2 mt-8">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Top Selling Products</h3>
                <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={charts.top_products} margin={{ bottom: 20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.1} />
                            <XAxis
                                dataKey="name"
                                stroke="#9CA3AF"
                                tickFormatter={(value) => value.length > 10 ? `${value.substring(0, 10)}...` : value}
                                interval={0}
                                angle={-45}
                                textAnchor="end"
                                height={60}
                            />
                            <YAxis stroke="#9CA3AF" />
                            <Tooltip
                                contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px', color: '#fff' }}
                                cursor={{ fill: 'transparent' }}
                            />
                            <Bar dataKey="revenue" fill="#8b5cf6" radius={[4, 4, 0, 0]} name="Revenue (€)" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
}
