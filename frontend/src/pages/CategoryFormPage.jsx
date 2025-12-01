import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createCategory, deleteCategory, updateCategory, getCategory } from '../api/categories.api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IonAlert } from '@ionic/react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function CategoryFormPage() {

    const { register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm();
    const navigate = useNavigate()
    const params = useParams()
    const [showAlert, setShowAlert] = useState(false);

    const onSubmit = handleSubmit(async data => {
        try {
            if (params.id) {
                await updateCategory(params.id, data)
                toast.success('Category updated', {
                    position: "bottom-right",
                    style: { background: "#10b981", color: "#fff" }
                })
            } else {
                await createCategory(data);
                toast.success('Category created', {
                    position: "bottom-right",
                    style: { background: "#10b981", color: "#fff" }
                })
            }
            navigate("/categories");
        } catch (error) {
            console.error('Error saving category:', error);
            toast.error('Failed to save category');
        }
    });

    useEffect(() => {
        async function loadCategory() {
            if (params.id) {
                try {
                    const { data } = await getCategory(params.id);
                    setValue('name', data.name)
                    setValue('description', data.description)
                    setValue('icon', data.icon)
                } catch (error) {
                    console.error("Failed to load category", error);
                    toast.error("Failed to load category details");
                    navigate("/categories");
                }
            }
        }
        loadCategory()
    }, [params.id, setValue, navigate])

    const handleDelete = async () => {
        await deleteCategory(params.id);
        toast.success('Category deleted', {
            position: "bottom-right",
            style: { background: "#ef4444", color: "#fff" }
        });
        navigate('/categories');
    };

    return (
        <div className='max-w-xl mx-auto mt-10'>
            <Breadcrumbs />

            <Link to="/categories" className="inline-flex items-center mb-6 text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Categories
            </Link>

            <div className='p-6 bg-white dark:bg-zinc-800/50 backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-2xl shadow-xl transition-colors duration-300'>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{params.id ? 'Edit Category' : 'Create Category'}</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1">Category Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Electronics"
                            {...register("name", { required: "Name is required" })}
                            className={`bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-lg block w-full border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500'} focus:ring-1 outline-none transition-colors text-gray-900 dark:text-white`}
                        />
                        {errors.name && <span className="text-red-400 text-sm mt-1 block">{errors.name.message}</span>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1">Icon (Emoji)</label>
                        <input
                            type="text"
                            placeholder="e.g. 💻"
                            {...register("icon")}
                            className="bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-lg block w-full border border-gray-300 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 outline-none transition-colors text-gray-900 dark:text-white"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-500 dark:text-zinc-400 mb-1">Description</label>
                        <textarea
                            rows="3"
                            placeholder="Category description..."
                            {...register("description")}
                            className="bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-lg block w-full border border-gray-300 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500 focus:ring-1 outline-none transition-colors text-gray-900 dark:text-white resize-none"
                        ></textarea>
                    </div>

                    <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium p-3 rounded-lg block w-full mt-6 transition-colors shadow-lg shadow-indigo-500/20'>
                        Save Category
                    </button>
                </form>

                {params.id &&
                    <div className='flex justify-end mt-4 pt-4 border-t border-gray-200 dark:border-white/10'>
                        <button
                            className='bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 font-medium p-3 rounded-lg w-full transition-colors'
                            onClick={() => setShowAlert(true)}
                        >
                            Delete Category
                        </button>
                        <IonAlert
                            isOpen={showAlert}
                            onDidDismiss={() => setShowAlert(false)}
                            header="Delete Category"
                            message="Are you sure you want to delete this category?"
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
                }
            </div>
        </div>
    )
}
