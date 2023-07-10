import { useSelector } from 'react-redux/es/hooks/useSelector';
import { LineWave } from 'react-loader-spinner';
import { toast } from 'react-toastify';

import { selectFilter } from 'redux/filter/filterSlice';
import DeleteButton from 'components/DeleteButton';
import { useGetContactsQuery } from 'redux/contacts/contactsRTK';

import { filterContacts } from 'redux/operations';

import css from './Contacts.module.css';

export default function Contacts() {
  const { data: contacts = [], error, isFetching } = useGetContactsQuery();

  const filter = useSelector(selectFilter);

  const filteredContacts = filterContacts(filter, contacts);

  return (
    <>
      {error ? (
        toast.error(error.error)
      ) : (
        <ul className={css.list}>
          {filteredContacts.map(({ number, name, id }) => {
            return (
              <li className={css.contact} key={id}>
                <span className={css.name}>{name}</span>
                <span>{number}</span>
                <DeleteButton id={id} />
              </li>
            );
          })}
        </ul>
      )}

      {isFetching && (
        <LineWave
          color="red"
          firstLineColor="blue"
          middleLineColor="green"
          lastLineColor="grey"
        />
      )}
    </>
  );
}
