import * as Yup from 'yup';

export const bookingValidation = Yup.object({
  userName: Yup.string().trim().matches(/^[\p{L}\p{M}][\p{L}\p{M}\s.'’-]*$/u, 'Please enter your name.').required('Please enter your name.'),
  userEmail: Yup.string().trim().email('Please enter a valid email address.').required('Please enter your email.'),
});
