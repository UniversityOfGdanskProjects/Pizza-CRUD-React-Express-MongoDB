import React from "react";
import { useParams, Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectPizzaById } from "../app/store/pizzaListApi-slice";
import Comment from "../Components/Comments/Comment";
import CommentForm from "../Components/Comments/CommentForm";

const SinglePizza = () => {

  const { pathname } = useLocation();

  const goBackLink = pathname.includes("dash") ?  "/dash/pizzas" : "/";

  const { id } = useParams();

  console.log(id);

  const singlePizza = useSelector((state) => selectPizzaById(state, id));

  const { name, toppings, price, flour, gluten, instructions, imageUrl, comments } = singlePizza ? singlePizza : {};

  console.log(singlePizza);

  if (singlePizza) {
    return (
      <>
        <section className="section pizza-section">
          <Link to={goBackLink} className="btn btn-primary">
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
                <span className="pizza-data">Flour :</span>
                {flour}
              </p>
              <div className="p">
                <span className="pizza-data">Toppings :</span>
                <ul>
                {toppings.map((topping, index) => (
                  <li key={index}>{topping}</li>
                ))}
                </ul>

              </div>
              <p>
                <span className="pizza-data">32cm :</span>
                {price.small}zł
              </p>
              <p>
                <span className="pizza-data">42cm :</span>
                {price.large}zł
              </p>
              <p>
                <span className="pizza-data">Info :</span>
                {gluten ? "Contains Gluten" : "Gluten-Free"}
              </p>
              <div className="p">
                <span className="pizza-data">Instructions :</span>
                <ul className="instructions-list">
                {instructions.split(". ").map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="comment-section">
          <CommentForm pizzaId={id}/>
          <h2>Comments:</h2>
          {comments?.length === 0 && <p>No comments to display!</p>}
          {comments?.length !== 0 && comments.map((comment, index) => <Comment key={index} comment={comment} />)}
        </section>
      </>
    );
  } else return <p>Pizza not found!</p>;
};

export default SinglePizza;
