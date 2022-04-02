import Contact from '../Contact/Contact';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

const Contacts = ({ contacts, onDelete, onSort }) => {
  return (
    <>
      <table className='table table-striped '>
        <thead>
          <tr>
            <th>
              <FaArrowUp
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onSort(1)}
              />{' '}
              Name{' '}
              <FaArrowDown
                style={{ color: 'red', cursor: 'pointer' }}
                onClick={() => onSort(-1)}
              />
            </th>
            <th>Address</th>
            <th>Phone</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {contacts.map((contact) => (
            <Contact key={contact.phone} contact={contact} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Contacts;
