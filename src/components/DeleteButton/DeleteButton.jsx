import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contacts/contactsRTK';

import css from './DeleteButton.module.css';
import { toast } from 'react-toastify';

export default function DeleteButton({ id, number, name }) {
  const [deleteContact, { isLoading }] = useDeleteContactMutation();

  const handleDelete = () => {
    try {
      const response = deleteContact(id);
      response.then(({ data }) => {
        toast.success(
          `Number ${data.number} with name ${data.name} was successfully deleted from your phonebook`
        );
      });
    } catch (error) {
      toast.error('ERROR!!! Try delete this contact again!!!');
    }
  };

  return (
    <button
      className={css.delButton}
      type="button"
      id={id}
      onClick={handleDelete}
    >
      Delete
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
};
