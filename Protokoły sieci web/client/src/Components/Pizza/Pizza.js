import React from "react";
import { Link } from "react-router-dom";
import UpdateButton from "../UI/UpdateButton";
import DeleteButton from "../UI/DeleteButton";
import useAuth from "../../hooks/useAuth";

const Pizza = (props) => {
  const { isAdmin } = useAuth();

  const { id, name, price, imageUrl, vegan } = props.pizza;

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
          to={"/dash/pizzas/pizza/" + id}
        >
          Details
        </Link>
        {isAdmin && (
          <div className="pizza-actions">
            <UpdateButton id={id} />
            <DeleteButton id={id} />
          </div>
        )}
        {vegan && <h5 className="vegan">Vegan</h5>}
      </div>
    </article>
  );
};

export default Pizza;
