import React, { useEffect, useState } from 'react';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './home.css';

const Home = () => {
    const [products, setProducts] = useState({
        Apple: [],
        Samsung: [],
        Oppo: [],
        Vivo: []
    });

    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchProducts = async () => {
            const querySnapshot = await getDocs(collection(db, 'products'));
            const brandProducts = {
                Apple: [],
                Samsung: [],
                Oppo: [],
                Vivo: []
            };

            querySnapshot.forEach((doc) => {
                const data = { ...doc.data(), productId: doc.id }; // Add productId from the document ID
                brandProducts[data.brand].push(data);
            });

            setProducts(brandProducts);
        };

        fetchProducts();
    }, []);

    const handleProductClick = (product) => {
        navigate(`/comparison/${product.productId}`, { state: { product } }); // Pass product data with productId
    };

    return (
        <div>
            {/* Products */}
            {Object.keys(products).map((brand) => (
                <div key={brand} className="brand-container">
                    <h2>{brand}</h2>
                    <div className="product-list">
                        {products[brand].map((product) => (
                            <div key={product.productId} className="product-item" onClick={() => handleProductClick(product)}>
                                <img src={product.image} alt={product.name} className="product-image" />
                                <p className="product-name">{product.name}</p>
                                <p>Price: ₹{product.price}</p>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Home;
