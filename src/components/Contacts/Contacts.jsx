import Contact from '../Contact/Contact';

const Contacts = ({ contacts, onDelete }) => {
  return (
    <>
      <table className='table table-striped '>
        <thead>
          <tr>
            <th>Name</th>
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
