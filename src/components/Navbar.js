import React,{ useEffect }  from "react";

import {NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import axios from '../utils/axios.js';
import ProfileImage from "./ProfileImage.js";

const Navbar = () => {
  const UserData = useSelector(state => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
      const isLoggedIn = async () => {
          try {
              const { data } = await axios.get('/getuser');
              if (data.user) {
                  console.log("DATA ", data.user);
                  // SET THE DATA TO REDUX
                  dispatch({ type: 'SET_USER', payload: data.user })
                  // NAVIGATE TO HOME PAGE
                  navigate('/app');
              }
          } catch (error) {
              alert(error.response.data.message)
          }
      }
      isLoggedIn();
  }, []);
  

    
    



  return (
    <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-around items-center">

           <div className="text-white text-2xl font-bold">
           BiteBurst
        </div> 
        <div className="flex space-x-8">
        {!UserData.isLoggedIn &&
        <NavLink to="/login" className="text-white text-xl font-bold">Login</NavLink>}
        {!UserData.isLoggedIn &&
        <NavLink to="/signup"className="text-white text-xl font-bold">Signup</NavLink>}

        {UserData.isLoggedIn &&
        <NavLink to="/app"className="text-white text-xl font-bold">Home</NavLink>}
      
     { UserData.isLoggedIn&&<NavLink to="/cart"className="text-white text-xl font-bold">Cart<span className="ml-2 bg-white text-blue-800 rounded-full px-1.5 py-1 text-sm text-center font-semibold">  {UserData.cart ? UserData.cart.length : 0}</span></NavLink>}
        {UserData.isLoggedIn &&<NavLink to="/history"className="text-white text-xl font-bold">History</NavLink>}
        {UserData.isLoggedIn && <ProfileImage  imageUrl={UserData.image} />}
        {UserData.isLoggedIn &&<NavLink to="/logout"className="text-white text-xl font-bold">Logout</NavLink>}
        </div>
        </div>

    </nav>
  )
}

export default Navbar