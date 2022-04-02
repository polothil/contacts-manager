import { FaTimes } from 'react-icons/fa';

const Contact = ({ contact, onDelete }) => {
  return (
    <tr>
      <td>{contact.name}</td>
      <td>{contact.address}</td>
      <td>{contact.phone}</td>
      {contact.id !== 0 && (
        <td>
          <FaTimes
            style={{ color: 'red', cursor: 'pointer' }}
            onClick={() => onDelete(contact.id)}
          />
        </td>
      )}
    </tr>
  );
};

export default Contact;
