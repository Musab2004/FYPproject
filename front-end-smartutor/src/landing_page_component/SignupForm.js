import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import axios from 'axios';
import { Container, Form, Button,Alert} from 'react-bootstrap';
import Select from 'react-select';
const countries = [
  { label: 'USA', value: 'USA', cities: ['New York', 'Los Angeles', 'Chicago'] },
  { label: 'Canada', value: 'Canada', cities: ['Toronto', 'Montreal', 'Vancouver'] },
  // Add more countries and their cities here...
];
const SignupForm = (props) => {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState('');
  const [email_address, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [current_academic_level, setCurrentAcademicLevel] = useState('');
  const [city, setCity] = useState('');
  const [location, setLocation] = useState('');

  const [errors, setErrors] = useState({});
  const [formValid, setFormValid] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [citiesOptions, setCitiesOptions] = useState([]);
  const [reportalert, setReportAlert] = useState({show: false, variant: '', message: ''});
  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    // Update cities dropdown based on the selected country
    const cities = countries.find((country) => country.value === selectedOption.value)?.cities || [];
    setCitiesOptions(cities.map((city) => ({ label: city, value: city })));
    setSelectedCity(null); // Reset city selection
  };

  const handleCityChange = (selectedOption) => {
    setSelectedCity(selectedOption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    validateForm();

    if (formValid) {
      try {
        const formData = {
          name,
          email_address,
          password,
          confirmPassword,
          current_academic_level,
          Country:selectedCountry['value'],
          City : selectedCity['value'],
        };

        const response = await axios.post('http://127.0.0.1:8000/api/users/', formData);

        console.log('Data posted:', response.data);
        handleClose();
        setReportAlert({show: true, variant: 'success', message: 'Signup successfull!'});
        // Handle success, redirect user, or perform other actions upon successful form submission
      } catch (error) {
        console.error('Error posting data:', error);
        setReportAlert({show: true, variant: 'danger', message: 'Error in signing up!'});
        // Handle error: display error message or perform other actions
      }
    } else {
      console.log('Form has errors, cannot submit.');
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (name.trim() === '') {
      errors.name = 'Name is required';
      isValid = false;
    }

    if (email_address.trim() === '') {
      errors.email_address = 'Email is required';
      isValid = false;
    }

    if (current_academic_level === '') {
      errors.current_academic_level = 'Academic level is required';
      isValid = false;
    }
  console.log(selectedCountry['value'])
    // if (selectedCountry.trim() === '') {
    //   errors.city = 'Country is required';
    //   isValid = false;
    // }

    // if (selectedCity.trim() === '') {
    //   errors.location = 'City is required';
    //   isValid = false;
    // }

    if (password.trim() === '') {
      errors.password = 'Password is required';
      isValid = false;
    }

    if (confirmPassword.trim() === '') {
      errors.confirmPassword = 'Confirm Password is required';
      isValid = false;
    } else if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setErrors(errors);
    setFormValid(isValid);
  };

  return (
    <>
    {reportalert.show && <Alert 
  variant={alert.variant} 
  style={{
    marginTop: '50px', 
    position: 'fixed', 
    zIndex: 9999, 
    top: 0, 
    right: 0, 
    left: 0
  }} 
  onClose={() => setReportAlert({...alert, show: false})} 
  dismissible
>
  {reportalert.message}
</Alert>}
      <Button variant="primary" onClick={handleShow} style={{background:'white',backgroundColor:'#f66b1d',borderColor:'#f66b1d'}}>
        Signup
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{color:'#1f5692'}}> Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="name" className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email_address" className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email_address}
                  onChange={(e) => setEmailAddress(e.target.value)}
                />
                {errors.email_address && <p style={{ color: 'red' }}>{errors.email_address}</p>}
              </Form.Group>

              <Form.Group controlId="current_academic_level" className="mb-3">
                <Form.Label>Current Academic Level</Form.Label>
                <Form.Control
                  as="select"
                  value={current_academic_level}
                  onChange={(e) => setCurrentAcademicLevel(e.target.value)}
                >
                  <option value="highschool">High School</option>
                  <option value="middleschool">Middle School</option>
                </Form.Control>
                {errors.current_academic_level && <p style={{ color: 'red' }}>{errors.current_academic_level}</p>}
              </Form.Group>

              <div>
      <Form.Group controlId="country" className="mb-3">
        <Form.Label>Country</Form.Label>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          options={[{ label: 'USA', value: 'USA' }, { label: 'Canada', value: 'Canada' }]} // Replace with your country options
          placeholder="Select Country"
        />
        {errors.location && <p style={{ color: 'red' }}>{errors.location}</p>}
      </Form.Group>

      {selectedCountry && (
        <Form.Group controlId="city" className="mb-3">
          <Form.Label>City</Form.Label>
          <Select
            value={selectedCity}
            onChange={handleCityChange}
            options={[{ label: 'New York', value: 'New York' }, { label: 'Los Angeles', value: 'Los Angeles' }]} // Replace with your city options based on the selected country
            placeholder="Select City"
          />
          {errors.city && <p style={{ color: 'red' }}>{errors.city}</p>}
        </Form.Group>
      )}
    </div>

              <Form.Group controlId="password" className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p style={{ color: 'red' }}>{errors.password}</p>}
              </Form.Group>

              <Form.Group controlId="confirmPassword" className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p style={{ color: 'red' }}>{errors.confirmPassword}</p>}
              </Form.Group>

              <div style={{ textAlign: 'center' }}>
                <Button variant="primary" type="submit" onClick={handleSubmit}  style={{background:'white',backgroundColor:'#f66b1d',borderColor:'#f66b1d'}}>
                  Sign Up
                </Button>
              </div>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignupForm;
