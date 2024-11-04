// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { doc, getDoc } from 'firebase/firestore';
import Comparison from './Comparison';

const ProductDetail = ({ match }) => {
    const [product, setProduct] = useState(null);
    const productId = match.params.id; // Assume you're using react-router

    useEffect(() => {
        const fetchProduct = async () => {
            const productDoc = doc(db, 'products', productId);
            const productData = await getDoc(productDoc);
            setProduct(productData.data());
        };

        fetchProduct();
    }, [productId]);

    if (!product) return <div>Loading...</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <img src={product.image} alt={product.name} />
            <p>Price: {product.price}</p>
            <Comparison productId={product.id} />
        </div>
    );
};

export default ProductDetail;
