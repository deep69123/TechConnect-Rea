// src/components/Admin.js
import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import './admin.css';

const Admin = () => {
    const [product, setProduct] = useState({
        name: '',
        price: '',
        image: '',
        brand: 'Apple',
    });

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addDoc(collection(db, 'products'), product);
            alert('Product added successfully!');
            setProduct({ name: '', price: '', image: '', brand: 'Apple' });
        } catch (error) {
            console.error('Error adding product: ', error);
        }
    };

    return (
        <div className='body1'>
            <h1>Admin Panel</h1>
            <form onSubmit={handleSubmit}>
                <label>Product Name:</label>
                <input type="text" name="name" value={product.name} onChange={handleChange} required />

                <label>Product Price:</label>
                <input type="text" name="price" value={product.price} onChange={handleChange} required />

                <label>Product Image URL:</label>
                <input type="text" name="image" value={product.image} onChange={handleChange} required />

                <label>Product Brand:</label>
                <select name="brand" value={product.brand} onChange={handleChange}>
                    <option value="Apple">Apple</option>
                    <option value="Samsung">Samsung</option>
                    <option value="Oppo">Oppo</option>
                    <option value="Vivo">Vivo</option>
                </select>

                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default Admin;
