export const filterContacts = (filter, contacts) => {
  const normilizedFilter = filter.toLowerCase();
  return contacts.filter(contact =>
    contact.name.toLowerCase().includes(normilizedFilter)
  );
};
