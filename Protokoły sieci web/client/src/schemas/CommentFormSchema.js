import * as yup from "yup";

const urlValidator = (value) => /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(value)

export const CommentFormSchema = yup.object().shape({
  author: yup.string().min(1).max(20, "Name must be 20 characters or less").required("Required"),
  title: yup.string().min(1).max(20, "Title must be 20 characters or less").required("Required"),
  body: yup.string().min(1).max(120, "Comment body must be 120 characters or less").required("Required"),
  imageUrl: yup.string().required("Required").test("imageUrl", "Please enter a valid URL", urlValidator),
});