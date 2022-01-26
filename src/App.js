import { useState, useEffect, useRef } from 'react';
import { nanoid } from 'nanoid';
import Container from './components/Container';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Filter from './components/Filter';

import toast, { Toaster } from 'react-hot-toast';

import './App.css';

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

    if (contacts.some(item => item.name === newContact.name)) {
      toast.error(`${newContact.name} is already on contacts`);
      return;
    }

    setContacts(state => [newContact, ...state]);
    toast.success(`${newContact.name} successfully is already add to contacts`);
  };

  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  const filterContacts = () => {
    if (filter === '') {
      return contacts;
    } else {
      return contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));
    }
  };

  const deleteContact = id => {
    setContacts(state => state.filter(contact => contact.id !== id));
  };

  return (
    <Container>
      <Toaster />
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={filterContacts()} onDeleteContact={deleteContact} />
    </Container>
  );
}

export default App;
