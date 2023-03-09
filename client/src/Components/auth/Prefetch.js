import store from "../../app/store/store"

import { pizzasApiSlice } from "../../app/store/pizzaListApi-slice";

import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

const Prefetch = () => {
    useEffect(() => {
        console.log('subscribing')

        const pizzas = store.dispatch(pizzasApiSlice.endpoints.getPizzas.initiate({name: "", withGluten: true}))
        
        return () => {
            console.log('unsubscribing')
            pizzas.unsubscribe()
        }
    }, [])

    return <Outlet />
}
export default Prefetch