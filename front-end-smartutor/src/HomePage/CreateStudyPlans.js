import React, { useState,useContext } from 'react';
import { Form, Button,Container } from 'react-bootstrap';
import Navbar from "./HomePageNavbar"
import axios from 'axios';
import userService from '../landing_page_component/UserSerive';
import { UserContext } from '../landing_page_component/UserContext';
import background_image from './background_image.jpg';
import styled from 'styled-components';
import LoadingScreen from './LoaderScreen';
import { Link,useNavigate } from 'react-router-dom';
import ResourcePreview from '../DashBoard/ResourcePreview';
// import Quiz_icon from './Quiz_icon.png';
// import Summary_icon from './Summary_icon.png';
// Define your styled components
const StyledForm = styled(Form)`
  margin-top: 50px;
  background-color: #f8f9fa;
  backdropFilter: 'blur(50px)';
  padding: 20px;
  border-radius: 5px;
  width:60%;
  box-shadow: 0px 0px 15px -10px rgba(0,0,0,0.75);
`;


const StyledButton = styled(Button)`
  background-color: #007bff;
  border-color: #007bff;
  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }
`;

const StudyPlanForm = () => {
  const [activeTab, setActiveTab] = useState("createstudyplan");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [NextStep, setNextStep] = useState(false);
  var [StudyPlans, setStudyPlans] = useState(false);
  const { userData } = useContext(UserContext);
  const [bookData, setbookData] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    duration: '3',
    description: '',
    subject:'Physics',
    academic_level:'',
    is_public:true,
    quizzesPerWeek: '2',
    image: null, // Assuming you'll store the file here
  });
  const [selectedFile, setSelectedFile] = useState(null);





  
  const handleFileChange = (event) => {
    const file=event.target.files[0]
    setSelectedFile(file);
    console.log("selected file : ",selectedFile)
  };

  const handleUpload = () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Function to handle file input change


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const postData = new FormData();
    postData.append('name', formData.name);
    postData.append('duration', formData.duration);
    postData.append('subject', formData.subject);
    postData.append('owner',userData.pk)
    postData.append('books', selectedFile)
    postData.append('academic_level', formData.academic_level);
    postData.append('is_public',formData.is_public)
    postData.append('QuizesPerWeek',formData.quizzesPerWeek)
    postData.append('is_completed', false)    
    try {
      const study_plan = await userService.post('/api/studyplans/', postData);
      // Handle success - maybe show a success message or redirect
      console.log('Response:', study_plan.data);
      setStudyPlans(study_plan.data);
      console.log(StudyPlans)
      setNextStep(true)
      navigate('/maketimetable', { state: { books: study_plan.data } });
 // This will run only once, when the component mounts


    } catch (error) {
      // Handle error - show error message or perform necessary actions
      console.error('Error:', error);
    }
    finally{

      console.log("fetch book called here ")

      setIsLoading(false);
      // fetchBook();
      // setNextStep(true);
    }
  };
  const weeksOptions = [];
  for (let i = 2; i <= 12; i++) {
    weeksOptions.push(<option key={i} value={i}>{i} weeks</option>);
  }

  const quizzesPerWeekOptions = [1, 2, 3].map((num) => (
    <option key={num} value={num}>
      {num} quiz{num > 1 ? 'zes' : ''}
    </option>
  ));
  return (
    <>
    <style>
    {`
      body {
        background-color: #e1efff; /* Set the background color to blue */
        margin: 0; /* Reset margin for the body */
        padding: 0; /* Reset padding for the body */
      }
    `}
  </style>
    {isLoading ? <LoadingScreen /> : <>

    <Navbar activeTab={activeTab} />
    <Container style={{backgroundColor:'#e1efff'}}  >
    <div style={{display:'flex',marginTop:'5%'}} >
    <StyledForm  onSubmit={handleSubmit} style={{flex: 1, marginTop: '50px'}}>
      <Form.Group controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          maxLength={50}
        />
      </Form.Group>
      <br/>

      <Form.Group controlId="duration">
      <Form.Label>Duration (in weeks)</Form.Label>
      <Form.Control
        as="select"
        name="duration"
        value={formData.duration}
        onChange={handleChange}
        required
      >
        <option value="">Select duration</option>
        {weeksOptions}
      </Form.Control>
    </Form.Group>
    <br/>
      <Form.Group controlId="subject">
  <Form.Label>Subject</Form.Label>
  <Form.Control
    as="select"
    name="subject"
    value={formData.subject}
    onChange={handleChange}
    required
  >
    <option value="Physics">Physics</option>
    <option value="Chemistry">Chemistry</option>
    <option value="Geography">Geography</option>
    <option value="History">History</option>
    <option value="English">English</option>
  </Form.Control>
</Form.Group>
<br/>
<Form.Group controlId="academicLevel">
  <Form.Label>Academic Level</Form.Label>
  <Form.Control
    as="select"
    name="academic_level"
    value={formData.academic_level || "Middle School"}
    onChange={handleChange}
    required
  >
    <option value="Middle School">Middle School</option>
    <option value="High School">High School</option>
    <option value="Higher education">Higher Education</option>
    {/* Add more academic levels if needed */}
  </Form.Control>
</Form.Group>
<br/>
<Form.Group controlId="publicPrivate">
  <Form.Label>Public or Private</Form.Label>
  <Form.Check
    type="radio"
    label="Public"
    name="publicPrivate"
    id="public"
    value="public"
    checked={formData.publicPrivate === 'public'}
    onChange={handleChange}

  />
  <Form.Check
    type="radio"
    label="Private"
    name="publicPrivate"
    id="private"
    value="private"
    checked={formData.publicPrivate === 'private'}
    onChange={handleChange}
  />
</Form.Group>
<br/>

      <Form.Group controlId="image">
        <Form.Label>Upload Document</Form.Label>
     
  <Form.Control
    type="file"
    accept=".pdf"
    onChange={handleFileChange}
    required
  />
</Form.Group>
<br/>
<Form.Group controlId="quizzesPerWeek">
        <Form.Label>Number of quizzes per week</Form.Label>
        <Form.Control
          as="select"
          name="quizzesPerWeek"
          value={formData.quizzesPerWeek}
          onChange={handleChange}
          required
        >
          <option value="">Select number of quizzes per week</option>
          {quizzesPerWeekOptions}
        </Form.Control>
      </Form.Group>
<br/>
      <StyledButton variant="primary" type="submit" style={{backgroundColor: '#f66b1d'}} onClick={handleSubmit} >
        Submit
        </StyledButton>
      </StyledForm>


      <img
    src={background_image}
    alt=""
    loading="lazy"
    style={{ flex: 1, height: '85vh',width:'100%', objectFit: 'cover' ,marginTop:'50px' }}
  />
      </div>
      </Container>
   
    </>
  }
  
   {/* {NextStep ? <MakeTimeTable>: <>
   <div>hehehehhe</div>
   </>} */}
   </>
  );
};

export default StudyPlanForm;
