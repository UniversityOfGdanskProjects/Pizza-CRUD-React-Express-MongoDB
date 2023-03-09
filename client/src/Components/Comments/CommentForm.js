import React from "react";
import { useFormik } from "formik";
import { CommentFormSchema } from "../../schemas/CommentFormSchema"
import { useAddPizzaCommentMutation } from "../../app/store/pizzaListApi-slice";
import { uiActions } from "../../app/store/ui-slice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";

const CommentForm = (props) => {

  const pizzaId = props.pizzaId;

  const [addComment, {
    isSuccess,
    isError,
    error
  }] = useAddPizzaCommentMutation();

  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const modalTitle = useSelector((state) => state.ui.modalTitle);
  const modalMsg = useSelector((state) => state.ui.modalMsg);

  const confirmSubmissionHandler = () => {
    dispatch(uiActions.hideModal());
  };

  const dispatch = useDispatch();

  const initialValues = {
    author: "",
    title: "",
    body: "",
    imageUrl: ""
  }

  const onSubmit = (values, actions) => {

    console.log("halo!");
    console.log(values);

    const newComment = {
      ...values,
    };

    addComment({pizzaId, newComment})
   
    dispatch(uiActions.showModal({title: "Success!", msg: "Comment has been added."}))

    console.log(values);
    actions.resetForm();
  }

  const resetInputsHandler = () => {
    resetForm();
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
    enableReinitialize: true,
    initialValues: initialValues,
    validationSchema: CommentFormSchema,
    onSubmit,
  });

  return (
    <>
      {modalIsVisible && (
        <Modal
          title={modalTitle}
          message={modalMsg}
          onConfirm={confirmSubmissionHandler}
        />)}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="input-container">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            placeholder="user1234"
            value={values.author}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.author && touched.author ? "input-error" : ""}
          />
          {errors.author && touched.author ? (
            <p className="error">{errors.author}</p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title 1"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.title && touched.title ? "input-error" : ""}
          />
          {errors.title && touched.title ? (
            <p className="error">{errors.title}</p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="body">Body</label>
          <textarea
            id="body"
            name="body"
            placeholder="Write text..."
            value={values.body}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.body && touched.body ? "input-error" : ""}
          />
          {errors.body && touched.body ? (
            <p className="error">{errors.body}</p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="image_URL">Image URL</label>
          <input
            type="text"
            id="image_URL"
            name="imageUrl"
            placeholder="https://example.com/"
            value={values.imageUrl}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.imageUrl && touched.imageUrl ? "input-error" : ""}
          />
          {errors.imageUrl && touched.imageUrl ? (
            <p className="error">{errors.imageUrl}</p>
          ) : (
            ""
          )}
        </div>
        <button type="submit">Submit</button>
        <button type="button" className="reset" onClick={resetInputsHandler}>
          Reset
        </button>
      </form>
    </>
  );
}
 
export default CommentForm;