import React from "react";
import Modal from "../UI/Modal";
import { useFormik } from "formik";
import { PizzaFormSchema } from "../../schemas/PizzaFormSchema";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../app/store/ui-slice";
import { useAddNewPizzaMutation } from "../../app/store/pizzaListApi-slice";

const PizzaForm = () => {

  const [addNewPizza, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useAddNewPizzaMutation()
 

  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const modalTitle = useSelector((state) => state.ui.modalTitle);
  const modalMsg = useSelector((state) => state.ui.modalMsg);

  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {

    const newPizza = {
      ...values,
    };

    const { message, newPizzaObj } = await addNewPizza(newPizza)

    dispatch(uiActions.showModal({title: "Success!", msg: message}))

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
      name: "",
      toppings: "",
      small: "",
      large: "",
      flour: "",
      instructions: "",
      imageUrl: "",
      gluten: "",
    },
    validationSchema: PizzaFormSchema,
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
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Margeritta"
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
          <label htmlFor="toppings">Toppings</label>
          <input
            type="text"
            id="toppings"
            name="toppings"
            placeholder="Sos pomidorowy, mozzarella, bazylia"
            value={values.toppings}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.toppings && touched.toppings ? "input-error" : ""}
          />
          {errors.toppings && touched.toppings ? (
            <p className="error">{errors.toppings}</p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="small_price">Small price (zł)</label>
          <input
            type="text"
            id="small"
            name="small"
            placeholder="0.00"
            value={values.small}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.small && touched.small ? "input-error" : ""}
          />
          {errors.small && touched.small ? (
            <p className="error">{errors.small}</p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="large_price">Large price (zł)</label>
          <input
            type="text"
            id="large"
            name="large"
            placeholder="0.00"
            value={values.large}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.large && touched.large ? "input-error" : ""}
          />
          {errors.large && touched.large ? (
            <p className="error">{errors.large}</p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="flour">Flour</label>
          <input
            type="text"
            id="flour"
            name="flour"
            placeholder="Włoska"
            value={values.flour}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.flour && touched.flour ? "input-error" : ""}
          />
          {errors.flour && touched.flour ? (
            <p className="error">{errors.flour}</p>
          ) : (
            ""
          )}
        </div>
        <div className="input-container">
          <label htmlFor="instructions">instructions</label>
          <input
            type="text"
            id="instructions"
            name="instructions"
            placeholder="Podawać na ciepło. Posypać świeżymi liśćmi bazylii."
            value={values.instructions}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.instructions && touched.instructions ? "input-error" : ""}
          />
          {errors.instructions && touched.instructions ? (
            <p className="error">{errors.instructions}</p>
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
        <div className="radio-container">
          <p>Contains gluten:</p>
          {errors.gluten && touched.gluten ? (
            <p className="radio error">{errors.gluten}</p>
          ) : (
            ""
          )}
          <div className="radio-options">
            <div className="radio-option">
              <input
                type="radio"
                id="radio-gluten-true"
                name="gluten"
                value="true"
                onChange={handleChange}
                className={errors.gluten ? "input-error" : ""}
              />
              <label htmlFor="radio-gluten-true">true</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="radio-gluten-false"
                name="gluten"
                value="false"
                onChange={handleChange}
                className={errors.gluten ? "input-error" : ""}
              />
              <label htmlFor="radio-gluten-false">false</label>
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
        <button type="button" className="reset" onClick={resetInputsHandler}>
          Reset
        </button>
      </form>
    </React.Fragment>
  );
};

export default PizzaForm;
