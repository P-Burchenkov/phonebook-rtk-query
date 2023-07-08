import { LineWave } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';

import Contacts from './Contacts';
import SearchBox from './SearchBox';
import ContactForm from './ContactForm';
import { selectIsLoading, selectError } from 'redux/selectors';

import 'react-toastify/dist/ReactToastify.css';

export function App() {
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);

  return (
    <div className="container">
      <h1>PhoneBook</h1>
      <ContactForm />
      <h2>Contacts</h2>
      <SearchBox />
      {error ? toast.error(error) : <Contacts />}
      {isLoading && (
        <LineWave
          color="red"
          firstLineColor="blue"
          middleLineColor="green"
          lastLineColor="grey"
        />
      )}
      <ToastContainer autoClose={3000} />
    </div>
  );
}
