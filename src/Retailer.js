// src/components/Retailer.js
import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

const Retailer = () => {
    const [products, setProducts] = useState([]);
    const [retailerName, setRetailerName] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const productList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProducts(productList);
        };

        fetchProducts();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedProduct && price && retailerName) {
            try {
                // Assuming you have a 'retailerPrices' collection to store the prices
                await addDoc(collection(db, 'retailerPrices'), {
                    retailerName,
                    productId: selectedProduct,
                    price: parseFloat(price), // Ensure price is a number
                });
                alert('Price submitted successfully!');
                // Clear the form after submission
                setRetailerName('');
                setSelectedProduct('');
                setPrice('');
            } catch (error) {
                console.error('Error adding document: ', error);
            }
        } else {
            alert('Please fill all fields.');
        }
    };

    return (
        <div className='body1'>
            <h1>Retailer Price Submission</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Retailer Name:
                        <input 
                            type="text" 
                            value={retailerName} 
                            onChange={(e) => setRetailerName(e.target.value)} 
                            required 
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Select Product:
                        <select 
                            value={selectedProduct} 
                            onChange={(e) => setSelectedProduct(e.target.value)} 
                            required
                        >
                            <option value="">-- Select a Product --</option>
                            {products.map((product) => (
                                <option key={product.id} value={product.id}>
                                    {product.name} - {product.brand}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>
                <div>
                    <label>
                        Price:
                        <input 
                            type="number" 
                            value={price} 
                            onChange={(e) => setPrice(e.target.value)} 
                            required 
                        />
                    </label>
                </div>
                <button type="submit">Submit Retailer Price</button>
            </form>
        </div>
    );
};

export default Retailer;
