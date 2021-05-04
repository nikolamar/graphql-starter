import * as yup from 'yup';
import * as reg from './regex';

const charMin = 3;

export const verifySignIn = yup.object({
  usernameoremail: yup
    .string()
    .required('username or email is required')
    .min(charMin, `username or email must be at least ${charMin} characters`),
  password: yup.string().required('password is required').min(charMin),
});

export const verifySignUp = yup.object({
  username: yup
    .string()
    .required('username is required')
    .min(charMin)
    .matches(reg.regAt, 'cannot include an @ character'),
  email: yup.string().required('email is required').email(),
  password: yup.string().required('password is required').min(charMin),
});
