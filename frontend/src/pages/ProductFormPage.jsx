import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { createProduct, deleteProduct, updateProduct, getProduct } from '../api/products.api';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { IonAlert } from '@ionic/react';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function ProductFormPage() {

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
                await updateProduct(params.id, data)
                toast.success('Product updated', {
                    position: "bottom-right",
                    style: {
                        background: "#10b981",
                        color: "#fff"
                    }
                })
            } else {
                await createProduct(data);
                toast.success('Product created', {
                    position: "bottom-right",
                    style: {
                        background: "#10b981",
                        color: "#fff"
                    }
                })
            }
            navigate("/products");
        } catch (error) {
            console.error('Error saving product:', error);
            toast.error(error.response?.data?.message || 'Failed to save product. Please check the console for details.', {
                position: "bottom-right",
                style: {
                    background: "#ef4444",
                    color: "#fff"
                }
            })
        }
    });

    useEffect(() => {
        async function loadProduct() {
            if (params.id) {
                const { data: { name, price, quantity } } = await getProduct(params.id);
                setValue('name', name)
                setValue('price', price)
                setValue('quantity', quantity)
            }
        }
        loadProduct()
    }, [params.id, setValue])

    const handleDelete = async () => {
        await deleteProduct(params.id);
        toast.success('Product deleted', {
            position: "bottom-right",
            style: {
                background: "#ef4444",
                color: "#fff"
            }
        });
        navigate('/products');
    };

    return (
        <div className='max-w-xl mx-auto mt-10'>
            <Breadcrumbs />

            <Link to="/products" className="inline-flex items-center mb-6 text-sm text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Back to Products
            </Link>

            <div className='p-6 bg-white dark:bg-zinc-800/50 backdrop-blur-md border border-gray-200 dark:border-white/5 rounded-2xl shadow-xl transition-colors duration-300'>
                <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">{params.id ? 'Edit Product' : 'Create Product'}</h2>
                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-zinc-400 mb-1">Product Name</label>
                        <input
                            type="text"
                            placeholder="e.g. Gaming Mouse"
                            {...register("name", { required: "Name is required" })}
                            className={`bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-lg block w-full border ${errors.name ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500'} focus:ring-1 outline-none transition-colors text-gray-900 dark:text-white`}
                        />
                        {errors.name && <span className="text-red-400 text-sm mt-1 block">{errors.name.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Price (€)</label>
                            <input
                                type="number"
                                placeholder="0.00"
                                min="0.1"
                                step="0.01"
                                {...register("price", { required: "Price is required" })}
                                className={`bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-lg block w-full border ${errors.price ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500'} focus:ring-1 outline-none transition-colors text-gray-900 dark:text-white`}
                            />
                            {errors.price && <span className="text-red-400 text-sm mt-1 block">{errors.price.message}</span>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-zinc-400 mb-1">Quantity</label>
                            <input
                                type="number"
                                placeholder="0"
                                min='0'
                                step='1'
                                {...register("quantity", { required: "Quantity is required" })}
                                className={`bg-gray-50 dark:bg-zinc-900/50 p-3 rounded-lg block w-full border ${errors.quantity ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-zinc-700 focus:border-indigo-500 focus:ring-indigo-500'} focus:ring-1 outline-none transition-colors text-gray-900 dark:text-white`}
                            />
                            {errors.quantity && <span className="text-red-400 text-sm mt-1 block">{errors.quantity.message}</span>}
                        </div>
                    </div>

                    <button className='bg-indigo-600 hover:bg-indigo-700 text-white font-medium p-3 rounded-lg block w-full mt-6 transition-colors shadow-lg shadow-indigo-500/20'>
                        Save Product
                    </button>
                </form>

                {params.id &&
                    <div className='flex justify-end mt-4 pt-4 border-t border-gray-200 dark:border-white/10'>
                        <button
                            className='bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/50 font-medium p-3 rounded-lg w-full transition-colors'
                            onClick={() => setShowAlert(true)}
                        >
                            Delete Product
                        </button>
                        <IonAlert
                            isOpen={showAlert}
                            onDidDismiss={() => setShowAlert(false)}
                            header="Delete Product"
                            message="Are you sure you want to delete this product? This action cannot be undone."
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
                                    cssClass: 'alert-button-delete' // Custom class if needed, or rely on Ionic defaults
                                }
                            ]}
                        />
                    </div>
                }
            </div>
        </div>
    )
}