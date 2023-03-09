import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../api/api-slice";
import uiReducer from "../store/ui-slice"
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import authReducer from "../../Components/auth/auth-slice"

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        ui: uiReducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})

setupListeners(store.dispatch)

export default store;