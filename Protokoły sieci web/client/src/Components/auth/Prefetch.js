import store from "../../app/store/store"

import { pizzasApiSlice } from "../../app/store/pizzaListApi-slice";
import { usersApiSlice } from "../../app/store/userListApi-slice";
import { catsApiSlice } from "../../app/store/catListApi-slice";
import { dogsApiSlice } from "../../app/store/dogListApi-slice";

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')

        const pizzas = store.dispatch(pizzasApiSlice.endpoints.getPizzas.initiate())
        const users = store.dispatch(usersApiSlice.endpoints.getUsers.initiate())
        const cats = store.dispatch(catsApiSlice.endpoints.getCats.initiate())
        const dogs = store.dispatch(dogsApiSlice.endpoints.getDogs.initiate())
        
        
        return () => {
            console.log('unsubscribing')
            pizzas.unsubscribe()
            users.unsubscribe()
            cats.unsubscribe()
            dogs.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch