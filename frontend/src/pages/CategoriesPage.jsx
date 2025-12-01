import { useEffect, useState } from 'react';
import { getAllCategories, deleteCategory } from '../api/categories.api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IonAlert } from '@ionic/react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null);

    useEffect(() => {
        loadCategories();
    }, []);

    async function loadCategories() {
        setIsLoading(true);
        try {
            const res = await getAllCategories();
            setCategories(res.data);
        } catch (error) {
            console.error("Failed to load categories", error);
            toast.error("Failed to load categories");
        } finally {
            setIsLoading(false);
        }
    }

    const handleDelete = async () => {
        if (!selectedCategoryId) return;
        try {
            await deleteCategory(selectedCategoryId);
            toast.success('Category deleted');
            loadCategories();
        } catch (error) {
            console.error("Failed to delete category", error);
            toast.error("Failed to delete category");
        } finally {
            setShowAlert(false);
            setSelectedCategoryId(null);
        }
    };

    const confirmDelete = (id) => {
        setSelectedCategoryId(id);
        setShowAlert(true);
    };

    return (
        <div>
            <Breadcrumbs />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
                <Link to="/categories-create">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-indigo-500/30 transition-all hover:scale-105 active:scale-95 flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        New Category
                    </button>
                </Link>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[...Array(3)].map((_, index) => (
                        <div key={index} className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl border border-gray-200 dark:border-white/10 h-32 animate-pulse"></div>
                    ))}
                </div>
            ) : categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-zinc-500">
                    <p className="text-xl font-medium">No categories found</p>
                    <p className="text-sm mt-2">Create a new category to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div key={category.id} className="group relative bg-white dark:bg-zinc-800/50 backdrop-blur-md border border-gray-200 dark:border-white/10 p-5 rounded-2xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-zinc-800/80 hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10">
                            <div className="flex justify-between items-start mb-2">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{category.icon || '📦'}</span>
                                    <h2 className="font-bold text-xl text-gray-900 dark:text-white">{category.name}</h2>
                                </div>
                                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Link to={`/categories/${category.id}`} className="p-2 text-blue-500 hover:bg-blue-500/10 rounded-lg transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link>
                                    <button onClick={() => confirmDelete(category.id)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <p className="text-gray-500 dark:text-zinc-400 text-sm line-clamp-2">{category.description || 'No description'}</p>
                        </div>
                    ))}
                </div>
            )}

            <IonAlert
                isOpen={showAlert}
                onDidDismiss={() => setShowAlert(false)}
                header="Delete Category"
                message="Are you sure you want to delete this category? Products in this category will be unassigned."
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => setShowAlert(false)
                    },
                    {
                        text: 'Delete',
                        handler: handleDelete,
                        cssClass: 'alert-button-delete'
                    }
                ]}
            />
        </div>
    );
}
