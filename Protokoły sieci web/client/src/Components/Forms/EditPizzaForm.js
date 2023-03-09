import React from "react";
import Modal from "../UI/Modal";
import { useFormik } from "formik";
import { PizzaFormSchema } from "../../schemas/PizzaFormSchema";
import { useSelector, useDispatch } from "react-redux";
import { uiActions } from "../../app/store/ui-slice";
import { useUpdatePizzaMutation } from "../../app/store/pizzaListApi-slice";

const EditPizzaForm = ({ pizza }) => {

  const [updatePizza, {
    isLoading,
    isSuccess,
    isError,
    error
  }] = useUpdatePizzaMutation()

  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const modalTitle = useSelector((state) => state.ui.modalTitle);
  const modalMsg = useSelector((state) => state.ui.modalMsg);

  const dispatch = useDispatch();

  const onSubmit = async (values, actions) => {

    const newPizza = {
      id: pizza.id,
      ...values,
    };

    const { message, updatedPizza } = await updatePizza(newPizza)

    // console.log(resObj);

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
      name: pizza.name,
      toppings: pizza.toppings.join(", "),
      small: pizza.price.small,
      large: pizza.price.large,
      imageUrl: pizza.imageUrl,
      vegan: pizza.vegan.toString(),
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
          <p>Vegan:</p>
          {errors.vegan && touched.vegan ? (
            <p className="radio error">{errors.vegan}</p>
          ) : (
            ""
          )}
          <div className="radio-options">
            <div className="radio-option">
              <input
                type="radio"
                id="radio-vegan-true"
                name="vegan"
                value="true"
                onChange={handleChange}
                className={errors.vegan ? "input-error" : ""}
              />
              <label htmlFor="radio-vegan-true">true</label>
            </div>
            <div className="radio-option">
              <input
                type="radio"
                id="radio-vegan-false"
                name="vegan"
                value="false"
                onChange={handleChange}
                className={errors.vegan ? "input-error" : ""}
              />
              <label htmlFor="radio-vegan-false">false</label>
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

export default EditPizzaForm;
