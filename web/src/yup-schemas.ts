import * as yup from "yup";
import * as reg from "./regex";

const charMin = 3;

export const login = yup.object({
  usernameoremail: yup
    .string()
    .required("username or email is required")
    .min(charMin, `username or email must be at least ${charMin} characters`),
  password: yup.string().required("password is required").min(charMin),
});

export const phoneLogin = yup.object({
  phonenumber: yup.string().matches(reg.regPhone, "phone number is not valid"),
});

export const registerStep1 = yup.object({
  username: yup
    .string()
    .required("username is required")
    .min(charMin)
    .matches(reg.regAt, "cannot include an @ character"),
  password: yup.string().required("password is required").min(charMin),
  email: yup.string().required("email is required").email(),
});

export const registerStep2 = yup.object({
  firstName: yup
    .string()
    .required("first name is required")
    .max(40)
    .matches(reg.regName, "please enter valid name"),
  lastName: yup
    .string()
    .required("last name is required")
    .max(40)
    .matches(reg.regName, "please enter valid name"),
});

export const usernameOrEmail = yup.object({
  usernameoremail: yup
    .string()
    .required("username or email is required")
    .min(charMin, `username or email must be at least ${charMin} characters`),
});

export const newpassword = yup.object({
  newpassword: yup.string().required("password is required").min(charMin),
});

export const fileUpload = yup.object().shape({
  file: yup.mixed().required(),
});

export const hotel = yup.object({
  name: yup.string().required("name is required").max(250),
  city: yup.string().required("city is required").max(250),
  country: yup.string().required("country is required").max(250),
  description: yup.string().required("description is required").max(1000),
  image: yup.string().max(250),
  location: yup.string().required("location is required").max(250),
  stars: yup.number().required("hotel stars are required").min(1).max(5),
  price: yup.number().required("price is required").min(1).max(5000),
});