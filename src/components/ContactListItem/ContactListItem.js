import { Item, Name, Number, Button } from './ContactListItem.styled';

const ContactItem = ({ contact, onDeleteContact }) => {
  return (
    <Item>
      <Name>{contact.name}: </Name>
      <Number href={`tel:${contact.number}`}>{contact.number}</Number>
      <Button type="button" onClick={() => onDeleteContact(contact.id)}>
        Delete
      </Button>
    </Item>
  );
};

export default ContactItem;
