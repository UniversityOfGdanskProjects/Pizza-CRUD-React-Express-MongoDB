import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectCatById,
  useDeleteCatMutation,
} from "../../app/store/catListApi-slice";
import useAuth from "../../hooks/useAuth";

const Cat = (props) => {
  const { isAdmin } = useAuth();

  const catId = props.catId;

  const navigate = useNavigate();

  const cat = useSelector((state) => selectCatById(state, catId));

  const { name, imageUrl } = cat;

  const [deleteCat, { isSuccess, isError, error }] = useDeleteCatMutation();

  const deleteHandler = async () => {
    console.log(catId);
    const res = await deleteCat({ id: catId });
    console.log(res);
  };

  const handleEdit = () => navigate(`/dash/cats/${catId}`);

  if (cat) {
    return (
      <article className="pizza-box">
        <div className="img-box">
          <img src={imageUrl} alt={name} />
        </div>
        <div className="pizza-footer">
          <h3>{name}</h3>
          {isAdmin && (
            <div className="pizza-actions">
              <button className="del" onClick={deleteHandler}>
                DELETE
              </button>
              <button className="upd" onClick={handleEdit}>
                UPDATE
              </button>
            </div>
          )}
        </div>
      </article>
    );
  } else return null;
};

export default Cat;
