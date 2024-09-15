import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from '../utils/axios';
import AllRestaurants from '../components/AllRestaurant';

import { Outlet } from 'react-router-dom';

const Home = () => {
    const userData = useSelector(state => state.userReducer);
    const dispatch = useDispatch();
    const [isRestaurantsFetched, setIsRestaurantsFetched] = useState(false);
    useEffect(() => {
        async function getRestaurantDetails() {

            try {
                let { data } = await axios.get('/restaurant/all');
                dispatch({ type: "SET_RESTAURANTS", payload: data.restaurants });
                setIsRestaurantsFetched(true);
            } catch (error) {
                alert(error);
            }
        }

        getRestaurantDetails();
    }, []);

    return (
        <>
            {
                userData.isLoggedIn && <div>
                  
                    {isRestaurantsFetched && <AllRestaurants />}
                    <Outlet />
                </div>
            }

        


        </>
    )
}

export default Home