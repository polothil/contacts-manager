import { useEffect, useState } from 'react';
import Header from './components/Header/Header';
import Contacts from './components/Contacts/Contacts';
import AddContact from './components/AddContact/AddContact';

function App() {
  const [contacts, setContacts] = useState([]);
  const [showLoader, setShowLoader] = useState(false);
  const [loaderMsg, setloaderMsg] = useState('Fetching data from server...');
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredList, setFilteredList] = useState([]);

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
      const contactsList = contacts.filter((contact) => contact.id !== id);
      localStorage.setItem('contactsList', JSON.stringify(contactsList));
      setContacts(contactsList);
    } catch (error) {
      console.error('Error deleting data');
      alert('Error deleting data');
    }
  };

  const handleSort = (direction) => {
    console.log('Sort called: ', direction);
    const sorted = contacts.sort((a, b) =>
      a.name > b.name ? direction : -1 * direction
    );
    console.log('sorted contacts: ', sorted);
    setContacts([...sorted]);
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value !== '') {
      const newContacts = contacts.filter((contact) => {
        return Object.values(contact)
          .join(' ')
          .toLowerCase()
          .includes(e.target.value.toLowerCase());
      });
      console.log('newContacts: ', newContacts);
      setFilteredList(newContacts);
    } else {
      setFilteredList(contacts);
    }
  };

  const handleDarkMode = () => {
    const element = document.body;
    element.classList.toggle('dark-mode');
  };

  return (
    <div className='container mt-4'>
      <button className='btn btn-warning' onClick={handleDarkMode}>
        Toggle dark mode
      </button>
      <Header />
      <AddContact onAdd={addContact} />
      <div className='form-group'>
        <input
          className='form-control'
          type='text'
          name='search'
          placeholder='Search here...'
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      {showLoader ? (
        loaderMsg
      ) : contacts.length > 0 ? (
        <Contacts
          contacts={searchTerm.length < 1 ? contacts : filteredList}
          onDelete={handleDelete}
          onSort={handleSort}
        />
      ) : (
        'No contacts to show'
      )}
    </div>
  );
}

export default App;
