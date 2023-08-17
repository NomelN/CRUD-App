import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { createProduct, deleteProduct, updateProduct, getProduct } from '../api/products.api';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export function ProductFormPage(){

    const {register, 
        handleSubmit, 
        formState: { errors}, 
        setValue
    } =  useForm();
    const navigate = useNavigate()
    const params = useParams()
    

    const onSubmit = handleSubmit(async data => {
        if (params.id) {
           await updateProduct(params.id, data)
           toast.success('Product updated', {
            position: "bottom-right",
            style: {
                background: "#013d57",
                color: "#fff"
            }
        })
        }else {
            await createProduct(data);
            toast.success('Product created', {
                position: "bottom-right",
                style: {
                    background: "#013d57",
                    color: "#fff"
                }
            })
        }
        navigate("/products");
    });
    useEffect(() => {
        async function loadProduct() {
            if (params.id) {
                const {data: {name, price, quantity}} = await getProduct(params.id);
                setValue('name', name)
                setValue('price', price)
                setValue('quantity', quantity)
            }
        }
        loadProduct()
    }, [])

    return(
        <div className='max-w-xl mx-auto'>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="name" 
                    {...register("name", { required: true})}
                    className='bg-zinc-700 p-3 rounded-lg block w-full mb-3'
                />
                {errors.name && <span>Name is required</span>}

                <input 
                    type="number" 
                    placeholder="Unit price" 
                    min="0.1" 
                    step="0.01"
                    {...register("price", { required: true})}
                    className="bg-zinc-700 p-3 rounded-lg block w-50 mb-3"
                />
                {errors.price && <span>Price is required</span>}
                
                <input 
                    type="number" 
                    placeholder="quantity"
                    min='0' 
                    step='1' 
                    {...register("quantity", { required: true})}
                    className="bg-zinc-700 p-3 rounded-lg block w-50 mb-3"
                />
                {errors.quantity && <span>Quantity is required</span>}
                <button className='bg-indigo-500 p-3 rounded-lg block w-full mt-3'>
                    Save
                </button>
            </form>

            {params.id && 
                <div className='flex justify-end'>
                    <button
                    className='bg-red-500 p-3 rounded-lg w-48 mt-3' 
                    onClick={async() => {
                        const accepted = window.confirm('are you sure?')
                        if (accepted){
                            await deleteProduct(params.id);
                            toast.success('Product deleted', {
                                position: "bottom-right",
                                style: {
                                    background: "#013d57",
                                    color: "#fff"
                                }
                            });
                            navigate('/products');
                        }
                    }}>
                    Delete
                </button>
                </div>
            }
        </div>
    )
}