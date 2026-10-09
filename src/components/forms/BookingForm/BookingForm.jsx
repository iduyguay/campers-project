import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { Formik, Form } from 'formik';
import { bookingValidation } from '@utils/bookingValidation';

import { Button, TextField } from '@components';
import { changeBooking } from '@redux/applicationStorageSlice';

import css from './BookingForm.module.css';

const initialValues = {
  userName: '',
  userEmail: '',
};

export default function BookingForm({ camperId }) {
  const dispatch = useDispatch();

  const handleSubmit = async (values, actions) => {
    try {
      await bookingValidation.validate(values, { abortEarly: false });

      const bookingInfo = {
        id: camperId,
        email: values.userEmail.trim(),
        name: values.userName.trim(),
      };

      dispatch(changeBooking(bookingInfo));
      toast.success('Form submitted successfully!');
      actions.resetForm();
    } catch {
      toast.error("This didn't work.");
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={bookingValidation} onSubmit={handleSubmit}>
      {({ isSubmitting }) => (
        <Form className={css.form} noValidate>
          <p className={css.caption}>Book your campervan now</p>
          <small className={css.lead}>
            Stay connected! We are always ready to help you.
          </small>

          <div className={css.group}>
            <TextField
              fieldName={'userName'}
              label={'Name'}
              required
            />
            <TextField
              fieldType="email"
              fieldName={'userEmail'}
              label={'Email'}
              required
            />
          </div>

          <Button type={'submit'} filled centered disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Send'}
          </Button>
        </Form>
      )}
    </Formik>
  );
}
