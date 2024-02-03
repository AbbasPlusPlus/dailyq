import * as Yup from "yup";

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
};

export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(7, "Password must be at least 7 characters")
    .matches(/[a-z]/, "Password must contain at least one lowercase character")
    .matches(/[A-Z]/, "Password must contain at least one uppercase character")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  firstName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "First Name should only contain letters")
    .trim("First Name cannot just be blank spaces")
    .required("First Name is required"),
  lastName: Yup.string()
    .matches(/^[aA-zZ\s]+$/, "Last Name should only contain letters")
    .trim("Last Name cannot just be blank spaces")
    .required("Last Name is required"),
});
