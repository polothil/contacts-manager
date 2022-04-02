import { useEffect, useRef, useState } from 'react';

const AddContact = ({ onAdd }) => {
  const initialValues = { name: '', address: '', phone: '' };
  const [formValues, setformValues] = useState(initialValues);
  const [errors, setErrors] = useState({});

  const inputRef = useRef(null);

  useEffect(() => {
    getInitialValues();
    inputRef.current.focus();
  }, []);

  const getInitialValues = () => {
    if (localStorage.getItem('name') !== null) {
      setformValues((prevFormValues) => ({
        ...prevFormValues,
        name: localStorage.getItem('name'),
      }));
    }
    if (localStorage.getItem('address') !== null) {
      setformValues((prevFormValues) => ({
        ...prevFormValues,
        address: localStorage.getItem('address'),
      }));
    }
    if (localStorage.getItem('phone') !== null) {
      setformValues((prevFormValues) => ({
        ...prevFormValues,
        phone: localStorage.getItem('phone'),
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validate(formValues));
    const errorsObj = validate(formValues);
    if (Object.keys(errorsObj).length === 0) {
      const { name, address, phone } = formValues;
      onAdd({ name, address, phone });
      setformValues(initialValues);
      localStorage.setItem('name', '');
      localStorage.setItem('address', '');
      localStorage.setItem('phone', '');
      inputRef.current.focus();
    }
  };

  const validate = (values) => {
    const errors = {};
    const regex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/;
    if (!values.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!values.address.trim()) {
      errors.address = 'Address is required';
    }
    if (!values.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!regex.test(values.phone)) {
      errors.phone = 'Phone number is not valid';
    }
    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformValues({ ...formValues, [name]: value });
    setErrors({ ...errors, [name]: '' });
    localStorage.setItem(`${name}`, e.target.value);
  };

  const handleClear = (e) => {
    e.preventDefault();
    setformValues(initialValues);
    localStorage.setItem('name', '');
    localStorage.setItem('address', '');
    localStorage.setItem('phone', '');
  };

  return (
    <form className='add-form' onSubmit={handleSubmit}>
      <div className='form-group'>
        <label>Name</label>
        <input
          ref={inputRef}
          className='form-control'
          type='text'
          name='name'
          placeholder='Enter Name'
          value={formValues.name}
          onChange={handleChange}
        />
      </div>
      <p className='text-danger'>{errors.name}</p>
      <div className='form-group'>
        <label>Address</label>
        <input
          className='form-control'
          type='text'
          name='address'
          placeholder='Enter Address'
          value={formValues.address}
          onChange={handleChange}
        />
      </div>
      <p className='text-danger'>{errors.address}</p>
      <div className='form-group'>
        <label>Phone</label>
        <input
          className='form-control'
          type='text'
          name='phone'
          placeholder='Enter Phone Number'
          value={formValues.phone}
          onChange={handleChange}
        />
      </div>
      <p className='text-danger'>{errors.phone}</p>

      <input className='btn btn-dark' type='submit' value='Add Contact ' />
      <button className='btn btn-secondary m-2' onClick={handleClear}>
        Clear
      </button>
    </form>
  );
};

export default AddContact;
