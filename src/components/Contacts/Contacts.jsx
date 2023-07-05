import PropTypes from 'prop-types';
import css from './Contacts.module.css';
import DeleteButton from 'components/DeleteButton';

export default function Contacts({ contacts, deleteContact }) {
  if (!contacts.length) {
    return;
  }
  return (
    <ul className={css.list}>
      {contacts.map(({ number, name, id }) => {
        return (
          <li className={css.contact} key={number}>
            <span className={css.name}>{name}</span>
            <span>{number}</span>
            <DeleteButton deleteContact={deleteContact} id={id} />
          </li>
        );
      })}
    </ul>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.exact({
      name: PropTypes.string,
      number: PropTypes.string,
      id: PropTypes.string,
    })
  ).isRequired,
};
