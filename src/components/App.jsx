import { ToastContainer } from 'react-toastify';

import Contacts from './Contacts';
import SearchBox from './SearchBox';
import ContactForm from './ContactForm';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  return (
    <div className="container">
      <h1>PhoneBook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <SearchBox />
      <Contacts />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
