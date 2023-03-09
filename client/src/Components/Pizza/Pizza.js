import React from "react";
import { Link, useLocation } from "react-router-dom";
import UpdateButton from "../UI/UpdateButton";
import DeleteButton from "../UI/DeleteButton";
import useAuth from "../../hooks/useAuth";

const Pizza = (props) => {
  const { isAdmin } = useAuth();

  const { pathname } = useLocation();

  const { id, name, price, imageUrl, gluten } = props.pizza;

  const detailsPath = pathname.includes("dash") ? "/dash/pizzas/pizza/" + id : "/pizza/" + id;

  const glutenHeader = gluten ? <h5 className="gluten">Gluten</h5> : <h5 className="gluten-free">Gluten-Free</h5>

  return (
    <article className="pizza-box">
      <div className="img-box">
        <img src={imageUrl} alt={name} />
      </div>
      <div className="pizza-footer">
        <h3>{name}</h3>
        <p>
          {price.small} zł / {price.large} zł
        </p>
        <Link
          className="btn btn-primary btn-details"
          to={detailsPath}
        >
          Details
        </Link>
        {isAdmin && (
          <div className="pizza-actions">
            <UpdateButton id={id} />
            <DeleteButton id={id} />
          </div>
        )}
        { glutenHeader }
      </div>
    </article>
  );
};

export default Pizza;
