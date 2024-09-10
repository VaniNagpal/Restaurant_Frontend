import React from 'react';
import axios from "../utils/axios";

const FoodItem = ({ food, category, restaurantName }) => {
    console.log(food);

    const addToCartHandler = async (id, category, restaurantName) => {
        try {
            const { data } = await axios.get(`http://localhost:4444/restaurant/add-cart/${id}?category=${category}&restaurant_name=${restaurantName}`)
            console.log(data);
        } catch (error) {
            alert(error);
        }
    }

    return (
        <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden w-full max-w-xs mx-auto">
            <div className="flex-shrink-0">
                <img
                    src={food?.images[0]?.url}
                    alt="food-item-image"
                    className="w-full h-40 object-cover"
                />
            </div>
            <div className="p-4">
                <h2 className="text-lg font-semibold mb-2">{food.name}</h2>
                <p className="text-gray-500 mb-2">{food.description}</p>
                <p className="text-xl font-bold mb-4">${food.price}</p>
                <button
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                    onClick={() => addToCartHandler(food._id, category, restaurantName)}
                >
                    Add To Cart
                </button>
            </div>
        </div>
    );
}

export default FoodItem;
