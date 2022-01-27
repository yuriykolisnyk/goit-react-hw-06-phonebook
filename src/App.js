import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

const initialContacts = [
  { id: 'id-1', name: 'Rosie Simpson', number: '+38 067 459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '+38 067 443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '+38 067 645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '+38 067 227-91-26' },
];

function App() {
  const [contacts, setContacts] = useState(initialContacts);
  const [filter, setFilter] = useState('');
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      const parsedContacts = JSON.parse(localStorage.getItem('contacts'));

      if (parsedContacts) {
        setContacts(parsedContacts);
      }

      isFirstRender.current = false;
      return;
    }
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (name, number) => {
    const newContact = {
      id: nanoid(),
      name,
      number,
    };

    setContacts([newContact, ...contacts]);
  };

  const changeFilter = e => setFilter(e.currentTarget.value);

  const filterContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact => contact.name.toLowerCase().includes(normalizedFilter));
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} contacts={contacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filterContacts()} onDeleteContact={deleteContact} />
    </Container>
  );
}

export default App;
