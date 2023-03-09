import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPizzaById } from "../app/store/pizzaListApi-slice";

const SinglePizza = () => {

  const { id } = useParams();

  // console.log(id);

  const singlePizza = useSelector((state) => selectPizzaById(state, id));

  const { name, toppings, price, vegan, imageUrl, comments } = singlePizza ? singlePizza : {};

  console.log(singlePizza);

  if (singlePizza) {
    return (
      <>
        <section className="section pizza-section">
          <Link to={"/dash/pizzas"} className="btn btn-primary">
            go back
          </Link>
          <div className="pizza">
            <img src={imageUrl} alt={name} />
            <div className="pizza-info">
              <p>
                <span className="pizza-data">Name :</span>
                {name}
              </p>
              <p>
                <span className="pizza-data">Toppings :</span>
                {toppings.map((topping, index) => (
                  <span key={index}>{topping}</span>
                ))}
              </p>
              <p>
                <span className="pizza-data">32cm :</span>
                {price.small}zł
              </p>
              <p>
                <span className="pizza-data">42cm :</span>
                {price.large}zł
              </p>
              {vegan && (
                <p>
                  <span className="pizza-data">Info :</span>
                  Vegan
                </p>
              )}
            </div>
          </div>
        </section>
      </>
    );
  } else return <p>Pizza not found!</p>;
};

export default SinglePizza;
