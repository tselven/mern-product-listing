import axios from 'axios';
import React, { useEffect, useState } from 'react';

const API_URL = 'http://localhost:3000/api/products';

function DemoPage() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function getProduct() {
            try {
                const response = await axios.get(API_URL);
                console.log('Raw response:', response.data);

                if (Array.isArray(response.data.products)) {
                    setProducts(response.data.products);
                } else {
                    console.warn('Unexpected format:', response.data);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }
        getProduct();
    }, []);


    return (
        <>
        <div className="bg-green-400 h-lvh">
            
            <h2 className='text-3xl text-center mb-2'>Products List</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <ul className='list-none list-inside bg-white p-4 m-5 rounded-lg shadow-lg'>
                    {Array.isArray(products) && products.length > 0 ? (
                        products.map((product) => (
                            <li className='border-1 m-2 p-1 bg-purple-400 text-white border-black rounded-2xl text-center' key={product._id}>{product.name}</li>
                        ))
                    ) : (
                        <li>No product found.</li>
                    )}
                </ul>
            )}

            </div>
        </>
    );
}

export default DemoPage;
