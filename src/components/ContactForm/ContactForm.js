import { useState } from 'react';
import { Form, Label, Input, Button } from './ContactForm.styled';
import toast, { Toaster } from 'react-hot-toast';

function ContactForm({ contacts, onSubmit }) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contactMatching = () => {
    const namesInPhonebook = contacts.reduce((acc, contact) => [...acc, contact.name], []);

    const numbersInPhonebook = contacts.reduce((acc, contact) => [...acc, contact.number], []);

    if (namesInPhonebook.includes(name) || numbersInPhonebook.includes(number)) {
      toast.error(`${name}${number} is already on contacts`);
      return true;
    }

    if (name === '' || number === '') {
      toast.error('Please enter all data');
      return true;
    }
  };

  const handleChange = e => {
    const item = e.currentTarget.name;
    const value = e.currentTarget.value;

    switch (item) {
      case 'name':
        setName(value);
        break;
      case 'number':
        setNumber(value);
        break;
      default:
        return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    setName('');
    setNumber('');

    if (contactMatching()) {
      return;
    }

    onSubmit(name, number);
  };

  return (
    <>
      <Toaster />
      <Form onSubmit={handleSubmit}>
        <Label>
          Name
          <Input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Rosie Simpson"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </Label>
        <Label>
          Number
          <Input
            type="tel"
            name="number"
            value={number}
            onChange={handleChange}
            placeholder="+38 000 000-00-00"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </Label>
        <Button type="submit">Add contact</Button>
      </Form>
    </>
  );
}

export default ContactForm;
