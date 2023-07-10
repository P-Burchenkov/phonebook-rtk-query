import { Formik, Form, Field, ErrorMessage } from 'formik';
import { object, string, number } from 'yup';
import { toast } from 'react-toastify';
import { RotatingLines } from 'react-loader-spinner';

import ValidateWarning from 'components/ValidateWarning';
import {
  useAddContactMutation,
  useGetContactsQuery,
} from 'redux/contacts/contactsRTK';

import css from './ContactForm.module.css';

export default function ContactForm() {
  const [addContact, { isLoading }] = useAddContactMutation();
  const { data: contacts = [] } = useGetContactsQuery();

  const initialValue = {
    name: '',
    number: '',
    id: '',
  };

  const schema = object({
    name: string().required(),
    number: number().required().positive().integer(),
  });

  const handleSubmit = (data, { resetForm }) => {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].number === data.number) {
        toast.error(
          `Number: ${data.number} is already in your contacts with name:  "${contacts[i].name}"!`
        );

        return;
      }
      if (contacts[i].name === data.name) {
        toast.error(
          `"${data.name}" is already in your contacts with number:  ${contacts[i].number}!`
        );

        return;
      }
    }
    try {
      const response = addContact(data);
      response.then(({ data }) => {
        toast.success(
          `Number ${data.number} was successfully added to you phonebook with name: "${data.name}"!`
        );
      });
    } catch (error) {}

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={handleSubmit}
      validationSchema={schema}
    >
      <Form className={css.form}>
        <label className={css.label}>
          Name
          <Field
            type="text"
            name="name"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
          <ErrorMessage
            name="name"
            component={ValidateWarning}
            text="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          />
        </label>
        <label className={css.label}>
          Number
          <Field
            type="tel"
            name="number"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
          <ErrorMessage
            name="number"
            text="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            component={ValidateWarning}
          />
        </label>
        <button type="submit" className={css.button}>
          Add contact
          {isLoading && <RotatingLines strokeColor="grey" width="16" />}
        </button>
      </Form>
    </Formik>
  );
}
