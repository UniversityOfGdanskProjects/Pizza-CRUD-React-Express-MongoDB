import * as yup from "yup";

const FiveDigitsMaxBeforeFloatingPointAndUpToTwoDigitsAfter = (value) =>
  /^(\d{1,5}|\d{0,5}\.\d{1,2})$/.test(value);
const urlValidator = (value) =>
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
    value
  );

export const PizzaFormSchema = yup.object().shape({
  name: yup
    .string()
    .min(1)
    .max(15, "Name must be 20 characters or less")
    .required("Required"),
  toppings: yup.string().min(3).required("Required"),
  small: yup
    .number()
    .positive()
    .required("Required")
    .test(
      "small",
      "Please enter a valid price",
      FiveDigitsMaxBeforeFloatingPointAndUpToTwoDigitsAfter
    ),
  large: yup
    .number()
    .positive()
    .required("Required")
    .test(
      "large",
      "Please enter a valid price",
      FiveDigitsMaxBeforeFloatingPointAndUpToTwoDigitsAfter
    ),
  imageUrl: yup
    .string()
    .required("Required")
    .test("imageUrl", "Please enter a valid URL", urlValidator),
  vegan: yup.boolean().required("A radio option is required"),
});
