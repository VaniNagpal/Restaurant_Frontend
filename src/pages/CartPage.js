import React, { useEffect, useState } from 'react';
import axios from '../utils/axios'; // Ensure this is pointing to your axios instance

const CartPage = () => {
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                const response = await axios.get('http://localhost:4444/restaurant/view-cart');
                console.log(response);
                setCartItems(response?.data?.data || []); // Adjust based on your response structure
                setLoading(false);
            } catch (error) {
                console.error('Error fetching cart items:', error);
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleQuantityChange = async (itemId, newQuantity) => {
        try {
            await axios.patch(`/cart/${itemId}`, { quantity: newQuantity });
            // Refresh cart items
            const response = await axios.get('/cart');
            setCartItems(response.data.data);
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const handleRemoveItem = async (itemId) => {
        try {
            await axios.delete(`/cart/${itemId}`);
            // Refresh cart items
            const response = await axios.get('/cart');
            setCartItems(response.data.data);
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
            {cartItems.length === 0 ? (
                <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
                <div>
                    {cartItems.map((item) => (
                        item.food && ( // Ensure item.food exists before mapping
                            <div key={item._id} className="flex items-center justify-between p-4 mb-4 border rounded-md shadow-md">
                                <img src={item.food.images[0]?.url} alt={item.food.name} className="w-20 h-20 object-cover rounded-md" />
                                <div className="flex-1 ml-4">
                                    <h2 className="text-xl font-semibold">{item.food.name}</h2>
                                    <p className="text-gray-600">{item.food.description}</p>
                                    <p className="text-lg font-bold">Price: ${item.food.price}</p>
                                    <div className="flex items-center mt-2">
                                        <button
                                            onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                            disabled={item.quantity <= 1}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            -
                                        </button>
                                        <span className="mx-2">{item.quantity}</span>
                                        <button
                                            onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                            className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => handleRemoveItem(item._id)}
                                    className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                                >
                                    Remove
                                </button>
                            </div>
                        )
                    ))}
                </div>
            )}
        </div>
    );
};

export default CartPage;
