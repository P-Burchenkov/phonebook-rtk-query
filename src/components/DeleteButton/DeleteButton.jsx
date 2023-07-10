import PropTypes from 'prop-types';
import { useDeleteContactMutation } from 'redux/contacts/contactsRTK';
import { RotatingLines } from 'react-loader-spinner';

import css from './DeleteButton.module.css';
import { toast } from 'react-toastify';

export default function DeleteButton({ id }) {
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
      delete
      {isLoading && <RotatingLines strokeColor="grey" width="16" />}
    </button>
  );
}

DeleteButton.propTypes = {
  id: PropTypes.string.isRequired,
};
