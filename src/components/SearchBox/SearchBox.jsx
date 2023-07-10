import { useDispatch, useSelector } from 'react-redux';

import { filterContacts } from 'redux/filter/filterSlice';
import { selectFilter } from 'redux/filter/filterSlice';

import css from './SearchBox.module.css';

export default function SearchBox() {
  const value = useSelector(selectFilter);
  const dispatch = useDispatch();
  const onChange = e => {
    dispatch(filterContacts(e.currentTarget.value));
  };

  return (
    <label className={css.filter}>
      Find contacts by name
      <input type="text" value={value} onChange={onChange} name="filter" />
    </label>
  );
}
