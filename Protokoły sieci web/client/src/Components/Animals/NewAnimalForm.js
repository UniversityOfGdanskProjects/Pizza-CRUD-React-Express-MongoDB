import React from "react";
import Modal from "../UI/Modal";
import { useFormik } from "formik";

import { NewAnimalFormSchema } from "../../schemas/NewAnimalSchema";

import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../app/store/ui-slice";

import { useAddNewCatMutation } from "../../app/store/catListApi-slice";
import { useAddNewDogMutation } from "../../app/store/dogListApi-slice";

import { useLocation } from "react-router-dom";

const NewAnimalForm = () => {
  const path = useLocation();

  let animal;

  if (path.pathname.includes("cats")) {
    animal = "cat";
  }

  if (path.pathname.includes("dogs")) {
    animal = "dog";
  }

  console.log(animal);

  const [addNewCat, { isLoading, isSuccess, isError, error }] =
    useAddNewCatMutation();

  const [
    addNewDog,
    { isLoading: isDogLoading, isSuccess: isDogSuccess, isError: isDogError },
  ] = useAddNewDogMutation();

  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const modalTitle = useSelector((state) => state.ui.modalTitle);
  const modalMsg = useSelector((state) => state.ui.modalMsg);

  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {
    const newAnimal = {
      ...values,
    };

    if (animal === "cat") {
      const { message } = await addNewCat(newAnimal);
      dispatch(uiActions.showModal({ title: "Success!", msg: message }));
    } else if (animal === "dog") {
      const { message } = await addNewDog(newAnimal);
      dispatch(uiActions.showModal({ title: "Success!", msg: message }));
    }

    actions.resetForm();
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
      name: "",
      imageUrl: "",
    },
    validationSchema: NewAnimalFormSchema,
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
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.name && touched.name ? "input-error" : ""}
          />
          {errors.name && touched.name ? (
            <p className="error">{errors.name}</p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="imageUrl">imageUrl</label>
          <input
            type="text"
            id="imageUrl"
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
    </React.Fragment>
  );
};

export default NewAnimalForm;
