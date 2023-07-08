import { useSelector } from 'react-redux/es/hooks/useSelector';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { selectFilteredContacts } from 'redux/selectors';
import DeleteButton from 'components/DeleteButton';
import { fetchContacts } from 'redux/operations';

import css from './Contacts.module.css';

export default function Contacts() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filteredContactsList = useSelector(selectFilteredContacts);

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
