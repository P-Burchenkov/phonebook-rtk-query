import css from './Contacts.module.css';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { getContacts } from 'redux/contacts/contactsSlice';
import { getFilter } from 'redux/filter/filterSlice';
import DeleteButton from 'components/DeleteButton';
import { fetchContacts } from 'redux/operations';

export default function Contacts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const contacts = useSelector(getContacts);

  const filter = useSelector(getFilter);

  const getfilteredContacts = () => {
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };

  const filteredContactsList = getfilteredContacts();

  if (!filteredContactsList.length) {
    return;
  }
  return (
    <ul className={css.list}>
      {filteredContactsList.map(({ number, name, id }) => {
        return (
          <li className={css.contact} key={id}>
            <span className={css.name}>{name}</span>
            <span>{number}</span>
            <DeleteButton id={id} />
          </li>
        );
      })}
    </ul>
  );
}
