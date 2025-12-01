import { useEffect, useState } from 'react';
import { getAllCategories, deleteCategory } from '../api/categories.api';
import { Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IonAlert } from '@ionic/react';
import { useAuth } from "../context/AuthContext";

export function CategoriesPage() {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryToDelete, setCategoryToDelete] = useState(null);
    const { user } = useAuth();
    const canEdit = user?.roles?.includes('Manager') || user?.roles?.includes('Admin');

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
        if (!categoryToDelete) return;
        try {
            await deleteCategory(categoryToDelete);
            toast.success("Category deleted successfully");
            loadCategories();
        } catch (error) {
            console.error("Failed to delete category", error);
            toast.error("Failed to delete category");
        }
        setCategoryToDelete(null);
    };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto">

            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Categories</h1>
                <Link to={canEdit ? "/categories-create" : "#"} className={!canEdit ? "pointer-events-none" : ""}>
                    <button
                        disabled={!canEdit}
                        className={`bg-indigo-600 text-white px-4 py-2 rounded-lg font-medium shadow-lg shadow-indigo-500/30 flex items-center gap-2 transition-all ${canEdit ? 'hover:bg-indigo-700 hover:scale-105 active:scale-95' : 'opacity-50 cursor-not-allowed'}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        New Category
                    </button>
                </Link>
            </div>

            {categories.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-500 dark:text-zinc-500">
                    <p className="text-xl font-medium">No categories found</p>
                    <p className="text-sm mt-2">Create a new category to get started.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <div key={category.id} className="bg-white dark:bg-zinc-800/50 p-6 rounded-xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <span className="text-4xl">{category.icon || '📦'}</span>
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">{category.name}</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">{category.description || 'No description'}</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <Link to={canEdit ? `/categories/${category.id}` : "#"} className={`p-2 transition-colors ${canEdit ? 'text-gray-400 hover:text-indigo-500' : 'text-gray-600 cursor-not-allowed'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                        </svg>
                                    </Link>
                                    <button
                                        disabled={!canEdit}
                                        onClick={() => setCategoryToDelete(category.id)}
                                        className={`p-2 transition-colors ${canEdit ? 'text-gray-400 hover:text-red-500' : 'text-gray-600 cursor-not-allowed opacity-50'}`}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <IonAlert
                isOpen={!!categoryToDelete}
                onDidDismiss={() => setCategoryToDelete(null)}
                header="Delete Category"
                message="Are you sure you want to delete this category? Products in this category will be unassigned."
                buttons={[
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                        handler: () => setCategoryToDelete(null)
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
