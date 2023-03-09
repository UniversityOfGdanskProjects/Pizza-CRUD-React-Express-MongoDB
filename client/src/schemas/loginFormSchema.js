import * as yup from "yup";

export const loginFormSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(15, "Name must be 15 characters or less")
    .required("Required"),
  password: yup
    .string()
    .min(3, "Password must be more than 3 characters")
    .max(32)
    .required("Required"),
});

export const editUserFormSchema = yup.object().shape({
  username: yup
    .string()
    .min(1)
    .max(15, "Name must be 15 characters or less")
    .required("Required"),
  password: yup
    .string()
    .min(3, "Password must be more than 3 characters")
    .max(32)
});

