import React from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { uiActions } from "../../app/store/ui-slice";

import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "./auth-slice";
import { useLoginMutation } from "./authApi-slice";
import { NewUserFormSchema } from "../../schemas/NewUserFormSchema";
import Modal from "../UI/Modal";

import usePersist from "../../hooks/usePersist";

const Login = () => {
  const modalIsVisible = useSelector((state) => state.ui.modalIsVisible);
  const modalTitle = useSelector((state) => state.ui.modalTitle);
  const modalMsg = useSelector((state) => state.ui.modalMsg);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [persist, setPersist] = usePersist();

  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (values, actions) => {
    const { username, password } = values;

    try {
      const { accessToken } = await login({ username, password }).unwrap();
      dispatch(setCredentials({ accessToken }));
      actions.resetForm();
      navigate("/dash");
    } catch (err) {
      if (!err.status) {
        dispatch(
          uiActions.showModal({ title: "Failure!", msg: "No Server Response" })
        );
      } else if (err.status === 400) {
        dispatch(
          uiActions.showModal({
            title: "Failure!",
            msg: "Missing Username or Password",
          })
        );
      } else if (err.status === 401) {
        dispatch(
          uiActions.showModal({ title: "Failure!", msg: "Unauthorized" })
        );
      } else {
        dispatch(
          uiActions.showModal({ title: "Failure!", msg: err.data?.message })
        );
      }
    }
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    enableReinitialize: true,
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: NewUserFormSchema,
    onSubmit,
  });

  const confirmSubmissionHandler = () => {
    dispatch(uiActions.hideModal());
  };

  const handleToggle = () => setPersist(prev => !prev);

  if (isLoading) return <p>Loading...</p>;

  const content = (
    <React.Fragment>
      {modalIsVisible && (
        <Modal
          title={modalTitle}
          message={modalMsg}
          onConfirm={confirmSubmissionHandler}
        />
      )}
      <form onSubmit={handleSubmit} className="login-form" autoComplete="off">
        <h1>Sign in</h1>
        <div className="input-container">
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            username="username"
            placeholder="exampleUser"
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
            type="password"
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
        <button type="submit">Sign In</button>
        <label htmlFor="persist" className="form-persist">
          <input
            type="checkbox"
            className="form-checkbox"
            id="persist"
            onChange={handleToggle}
            checked={persist}
          />
          Trust This Device
        </label>
      </form>
    </React.Fragment>
  );

  return content;
};
export default Login;
