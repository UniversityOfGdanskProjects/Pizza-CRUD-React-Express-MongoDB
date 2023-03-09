import React from "react";
import Modal from "../UI/Modal";

import { useFormik } from "formik";
import { editUserFormSchema } from "../../schemas/NewUserFormSchema";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../app/store/ui-slice";
import { useUpdateUserMutation } from "../../app/store/userListApi-slice";


const NewUserForm = ({ user }) => {

  const [updateUser, { isLoading, isSuccess, isError, error }] =
  useUpdateUserMutation();

  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const modalTitle = useSelector((state) => state.ui.modalTitle);
  const modalMsg = useSelector((state) => state.ui.modalMsg);

  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    console.log(user.id);
    const updatedUser = {
      id: user.id,
      ...values,
    };

    const { message } = await updateUser(updatedUser);

    dispatch(uiActions.showModal({ title: "Success!", msg: message }));

    actions.resetForm();

    // console.log(values);
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
    initialValues: {
      username: user.username,
      password: "",
    },
    validationSchema: editUserFormSchema,
    onSubmit,
  });

  const confirmSubmissionHandler = () => {
    dispatch(uiActions.hideModal());
  };

  const resetInputsHandler = () => {
    resetForm();
  };

  return (
    <React.Fragment>
      {modalIsVisible && (
        <Modal
          title={modalTitle}
          message={modalMsg}
          onConfirm={confirmSubmissionHandler}
        />
      )}
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className="input-container">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            username="username"
            placeholder="user123"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username ? "input-error" : ""}
          />
          {errors.username && touched.username ? (
            <p className="error">{errors.username}</p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="password">password</label>
          <input
            type="text"
            id="password"
            name="password"
            placeholder="Margeritta"
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
          />
          {errors.password && touched.password ? (
            <p className="error">{errors.password}</p>
          ) : (
            ""
          )}
        </div>
        <button type="submit">Submit</button>
        <button type="button" className="reset" onClick={resetInputsHandler}>
          Reset
        </button>
      </form>
    </React.Fragment>
  );
};

export default NewUserForm;
