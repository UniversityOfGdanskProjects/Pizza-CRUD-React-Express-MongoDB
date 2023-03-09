import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";

import LoginPage from "./Components/auth/LogInPage";
import LoggedInPage from "./pages/LoggedInPage";

import PizzaList from "./Components/Pizza/PizzaList";
import SinglePizza from "./pages/SinglePizza";

import UsersList from "./Components/Users/UsersList";
import NewUserForm from "./Components/Users/NewUserForm";
import EditUser from "./Components/Users/EditUser";

import PizzaForm from "./Components/Forms/PizzaForm";
import EditPizza from "./Components/Forms/EditPizza";

import CatsList from "./Components/Cats.js/CatsList";
import DogsList from "./Components/Dogs.js/DogsList";

import NewAnimalForm from "./Components/Animals/NewAnimalForm";
import EditCat from "./Components/Animals/EditCat";
import EditDog from "./Components/Animals/EditDog";

import Error from "./pages/Error";

import DefaultLayout from "./layouts/DefaultLayout";
import DashLayout from "./layouts/DashLayout";

import PersistLogin from "./Components/auth/PersistLogin";
import Prefetch from "./Components/auth/Prefetch";

import RequireAuth from "./Components/auth/RequireAuth";
import { ROLES } from "./config/roles";

import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          {/* PUBLIC */}
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          {/* PROTECTED */}
          <Route element={<PersistLogin />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}>
              <Route element={<Prefetch />}>
                <Route path="dash" element={<DashLayout />}>
                  <Route index element={<LoggedInPage />} />

                  <Route path="pizzas">
                    <Route index element={<PizzaList />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path=":id" element={<EditPizza />} />
                      <Route path="new" element={<PizzaForm />} />
                    </Route>
                    <Route path="pizza/:id" element={<SinglePizza />} />
                  </Route>

                  <Route path="users">
                    <Route index element={<UsersList />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path=":id" element={<EditUser />} />
                      <Route path="new" element={<NewUserForm />} />
                    </Route>
                  </Route>

                  <Route path="cats">
                    <Route index element={<CatsList />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path=":id" element={<EditCat />} />
                      <Route path="new" element={<NewAnimalForm />} />
                    </Route>
                  </Route>

                  <Route path="dogs">
                    <Route index element={<DogsList />} />
                    <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
                      <Route path=":id" element={<EditDog />} />
                      <Route path="new" element={<NewAnimalForm />} />
                    </Route>
                  </Route>
                </Route>
                {/* End Dash */}
              </Route>
            </Route>
          </Route>
          {/* End Protected */}
          <Route path="*" element={<Error />}></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default App;
