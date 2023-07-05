import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Contacts from './Contacts';
import SearchBox from './SearchBox';
import ContactForm from './ContactForm';

const KEY = 'contacts';

export function App() {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = JSON.parse(localStorage.getItem(KEY));
    if (savedContacts) {
      return savedContacts;
    }
    return [];
  });
  const [filter, setFilter] = useState('');

  const handleSubmit = (data, { resetForm }) => {
    data.id = nanoid();

    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].number === data.number) {
        alert(
          `${data.number} is already in your contacts with name:  ${contacts[i].name}`
        );
        return;
      }
      if (contacts[i].name === data.name) {
        alert(
          `${data.name} is already in your contacts with number:  ${contacts[i].number}`
        );
        return;
      }
    }

    setContacts(prevState => [...prevState, data]);
    resetForm();
  };

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(contacts));
  }, [contacts]);

  const changeFilter = evt => {
    setFilter(evt.currentTarget.value);
  };

  const getfilteredContacts = () => {
    const normilizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );
  };

  const delContact = evt => {
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].id === evt.currentTarget.id) {
        contacts.splice(i, 1);
        setContacts(prevState => [...prevState]);
      }
    }
  };

  return (
    <div className="container">
      <h1>PhoneBook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <SearchBox value={filter} onChange={changeFilter} />
      <Contacts contacts={getfilteredContacts()} deleteContact={delContact} />
    </div>
  );
}
