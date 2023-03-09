import React from "react";
import "./Comment.css";
import { useDeletePizzaCommentMutation } from "../../app/store/pizzaListApi-slice";
import { useParams } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Comment = (props) => {

  const { isAdmin } = useAuth();

  const { id } = useParams();
  
  const { _id, author, title, body, imageUrl, createdAt } = props.comment;

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const [deleteComment, {
    isSuccess,
    isError,
    error
  }] = useDeletePizzaCommentMutation();

  const deleteHandler = () => {
    deleteComment({ pizzaId: id, commentId: _id })
  }

  return (
    <div className="pizza-comment">
      <h4 className="title">{title}</h4>
      <div className="bio">
        <img src={imageUrl} alt={author} />
        <div className="comment-author">{author}</div>
      </div>
      <div className="comment-content">
        <h3 className="comment-message">“{body}”</h3>
        <span>created at:</span>
        <h5>{date}</h5>
      </div>
      { isAdmin && <button className="btn-delete" onClick={deleteHandler}>DELETE</button>}
    </div>
  );
};

export default Comment;