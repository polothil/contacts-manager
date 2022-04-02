import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Contacts from './components/Contacts/Contacts';
import AddContact from './components/AddContact/AddContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderMsg, setloaderMsg] = useState('Fetching data from server...');

  useEffect(() => {
    setShowLoader(true);
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const res = await fetch('http://localhost:21111/contacts');
      const fetchedContacts = await res.json();
      console.log('Fetched data: ', fetchedContacts);
      setContacts(fetchedContacts);
      setShowLoader(false);
    } catch (error) {
      console.error('An error occurred');
      // alert('Error fetching data from server');
      setloaderMsg('Error fetching data from server!');
    }
  };

  const addContact = async (contact) => {
    let copyFlag = false;
    for (let k in contacts) {
      if (contacts[k].phone === contact.phone) {
        alert('Phone number already exists');
        copyFlag = true;
      }
    }
    if (!copyFlag) {
      try {
        const res = await fetch('http://localhost:21111/contact', {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(contact),
        });
        const data = await res.json();
        contact = { ...contact, ...data };
        console.log(contact);
        const contactsList = [...contacts, contact];
        setContacts(contactsList);
        localStorage.setItem('contactsList', JSON.stringify(contactsList));
      } catch (error) {
        console.error('Error sending data');
        alert('Error sending data');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await fetch('http://localhost:21111/contact', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      console.log('Data: ', data);
      const contactsList = contacts.filter((contact) => contact.id !== id);
      localStorage.setItem('contactsList', JSON.stringify(contactsList));
      setContacts(contactsList);
    } catch (error) {
      console.error('Error deleting data');
      alert('Error deleting data');
    }
  };

  return (
    <div className='container mt-4'>
      <Header />
      <AddContact onAdd={addContact} />
      {showLoader ? (
        loaderMsg
      ) : contacts.length > 0 ? (
        <Contacts contacts={contacts} onDelete={handleDelete} />
      ) : (
        'No contacts to show'
      )}
    </div>
  );
}

export default App;
