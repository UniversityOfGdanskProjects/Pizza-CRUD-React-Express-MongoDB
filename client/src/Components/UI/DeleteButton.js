import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { uiActions } from "../../app/store/ui-slice";
import { useDeletePizzaMutation } from "../../app/store/pizzaListApi-slice";

const DeleteButton = (props) => {

  const id = props.id;

  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const modalTitle = useSelector((state) => state.ui.modalTitle);
  const modalMsg = useSelector((state) => state.ui.modalMsg);

  const [deletePizza, {
    isSuccess,
    isError,
    error
  }] = useDeletePizzaMutation()

  const dispatch = useDispatch();

  const deleteHandler = async () => {
   const { message } = await deletePizza({id})
    dispatch(uiActions.showModal({title: "Success!", msg: message}))
  };

  const confirmSubmissionHandler = () => {
    dispatch(uiActions.hideModal());
  };

  return (
    <>
      {modalIsVisible && (
        <Modal
          title={modalTitle}
          message={modalMsg}
          onConfirm={confirmSubmissionHandler}
        />
      )}
      <button className="btn-delete" onClick={deleteHandler}>
        Delete
      </button>
    </>
  );
};

export default DeleteButton;
