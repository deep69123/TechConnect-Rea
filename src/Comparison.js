import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from './firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import './Comparison.css';

const Comparison = () => {
    const location = useLocation();
    const { product } = location.state || {};
    const [retailerPrices, setRetailerPrices] = useState([]);

    useEffect(() => {
        const fetchRetailerPrices = async () => {
            if (product && product.productId) {
                try {
                    const q = query(collection(db, 'retailerPrices'), where('productId', '==', product.productId));
                    const querySnapshot = await getDocs(q);
                    
                    const prices = [];
                    querySnapshot.forEach((doc) => {
                        prices.push(doc.data());
                    });
                    
                    prices.sort((a, b) => a.price - b.price);
                    setRetailerPrices(prices);
                } catch (error) {
                    console.error("Error fetching retailer prices: ", error);
                }
            } else {
                console.error("Product or Product ID is undefined:", product);
            }
        };

        fetchRetailerPrices();
    }, [product]);

    if (!product) {
        return <div>No product data available.</div>;
    }

    return (
        <div className="comparison-container">
            <h1 className="comparison-header">COMPARE PRICES</h1>
            <h2 className="product-title">{product.name}</h2>
            
            <img src={product.image} alt={product.name} className="product-image" />
            <p className="product-price">MRP: ₹{product.price}</p>

            <h2>Retailer Prices:</h2>
            <div className="retailer-prices-container">
                {retailerPrices.length > 0 ? (
                    retailerPrices.map((retailerPrice, index) => (
                        <div key={index} className="retailer-container">
                            <h3 className="retailer-name">{retailerPrice.retailerName}</h3>
                            <p className="retailer-price">Price: ₹{retailerPrice.price}</p>
                        </div>
                    ))
                ) : (
                    <p>No retailer prices available for this product.</p>
                )}
            </div>
        </div>
    );
};

export default Comparison;
