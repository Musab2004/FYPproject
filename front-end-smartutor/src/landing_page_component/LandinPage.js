import React , { useState } from 'react';
import {  Container, Nav, Button,  Row, Col, Card, Pagination } from 'react-bootstrap';
// import '../App.css'; // Import the Bootstrap CSS
import 'font-awesome/css/font-awesome.min.css';
import Dashboard from '../DashBoard';
import Navbar from "./Navbar"
import { Link } from 'react-router-dom';


import  student_image1 from './lan1.png';

import Summary_icon from './summary_icon.svg'
import Footer from './footer'
import Quiz_icon from './quiz_icon.svg'
import StudyPlan_icon from './studyplan_icon.svg'
function App() {



    
  return (
  

    <div>
   
<Navbar/>
      {/* Jumbotron */}
      <Container fluid style={{marginTop:'3%',   width: '100%',
            height: '600px',backgroundColor:'#e1efff'}}> 
      <div style={{ position: 'relative' }}>
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'left',
            color: 'white',
            width: '100%',
          }}
        >
          <div style={{marginLeft:'3%',marginTop:'5%' ,width:'50%',color:'#1f5692'}}>
          <p>SmartTutor AI</p>
          <h1>Welcome to SmartTutor AI, your personalized learning companion designed to make education engaging, effective, and tailored just for you</h1>
          <Button  className="m-2" style={{background:'white',backgroundColor:'#f66b1d',borderColor:'#f66b1d'}}>
          Start your Journey here
        </Button>
          </div>
        </div>
        <img
          src={student_image1}
          alt="Your Image"
          className="img-fluid"
          style={{
            marginLeft:'70%',
            marginTop:'5%',
            width: '20%',
            height: '500px',
          }}
        />
       
      </div>
   
    </Container>
      {/* <Container id="intro" className="text-center bg-light" style={{ marginTop: '100px' ,height:'200px'}} >
        <div >
        <h1 className="mb-3 h2" >SmartTutor AI</h1>
    
        <p className="mb-3">AI based Tutoring App to cater all your needs</p>
        <Button 
          href="https://www.youtube.com/watch?v=c9B4TPnak1A"
          role="button"
          target="_blank"
          rel="nofollow"
          variant="primary"
          className="m-2"
        >
          Create a plan
        </Button>
        <Link to="/dashboard" >
        <Button  className="m-2">
          Go to Dashboard
        </Button>
      </Link>
      </div>
      </Container> */}
      <Container fluid  style={{ backgroundColor: '#f66b1d',width:'100%',height:'60vh' }}>
{/* <Row> */}
        {/* <Col md={6}  style={{marginTop:'3%' ,marginBottom:'5%'}}> */}
        <div className="right-container" style={{marginTop:'0%' }}>
          <div className="left-container" style={{textAlign:'center' ,marginLeft:'0%'}}>
          <br/>
          <h2 style={{fontSize: '64px', fontWeight: 'bold', fontFamily: 'roca',color:'white'}}>What we provide</h2>
          </div>
          </div>
     
         <div>
      <Row className="justify-content-center" style={{marginLeft:'5%',marginRight:'5%'}}>
      <Col xs={12} md={4}>
  <Card style={{ marginTop: '5%', color: '#ffffff', textAlign: 'center',alignItems:'Center', height: '300px', borderRadius: '15px' }}>
  <Card.Img variant="top" src={Summary_icon} style={{width:'70px',height:'70px',marginTop:'10px'}} />
    <Card.Body>
      <Card.Title style={{ color: '#1f5692', fontSize: '30px', fontFamily: 'roca' }}>Quiz Generation</Card.Title>
      <Card.Text style={{ color: '#1f5692' }}>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
</Col>
<Col xs={12} md={4}>
  <Card style={{ marginTop: '5%', color: '#ffffff', textAlign: 'center',alignItems:'Center', height: '300px', borderRadius: '15px' }}>
  <Card.Img variant="top" src={Quiz_icon} style={{width:'70px',height:'70px',marginTop:'10px'}} />
    <Card.Body>
      <Card.Title style={{ color: '#1f5692', fontSize: '30px', fontFamily: 'roca' }}>Summary Generation</Card.Title>
      <Card.Text style={{ color: '#1f5692' }}>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
</Col>
<Col xs={12} md={4}>
  <Card style={{ marginTop: '5%', color: '#ffffff', textAlign: 'center',alignItems:'Center', height: '300px', borderRadius: '15px' }}>
  <Card.Img variant="top" src={StudyPlan_icon} style={{width:'70px',height:'70px',marginTop:'10px'}} />
    <Card.Body>
      <Card.Title style={{ color: '#1f5692', fontSize: '30px', fontFamily: 'roca' }}>Study Plan Generation</Card.Title>
      <Card.Text style={{ color: '#1f5692' }}>
        Some quick example text to build on the card title and make up the bulk of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
</Col>
        {/* Add more Col components for additional cards */}
      </Row>
    </div>

{/*        
        </Row> */}
    </Container>
  
    {/* <Container class='container' fluid style={{ backgroundColor: '#f2f2f2' }}>
      <Row style={{}}>
        <Col md={6}  style={{marginTop:'5%' ,marginBottom:'5%'}} >
        <div className="right-container" style={{marginTop:'5%' }}>
          <div className="left-container" style={{textAlign:'left',marginTop:'5%' ,marginLeft:'10%' }}>
          <p >SmartTutor AI</p>
          <h2 style={{ fontSize: '44px', fontWeight: 'bold' }}>What we provide</h2>

            <p>Get Personalized Study Plans</p>
            <ul>
              <li>Personalized Study Plans</li>
              <li>AI Quiz Generation</li>
              <li>AI Summary Generation</li>
              <li>Community</li>
            
            </ul>
            <Button  className="m-2">
          Try Out
        </Button>
          </div>
      
      
          </div>
        </Col>
        <Col md={6} style={{marginTop:'5%' ,marginBottom:'5%'}} >
   
      <img
  src={landingpage_gif}
  alt="Your Image"
  className="img-fluid"
  style={{
    border: '2px solid #ccc',
    borderRadius: '10%',
    width: '500px', // Set the width
    height: '300px', // Set the height
  }}
/>

        </Col>
      </Row> 
    </Container> */}

    {/* <Container fluid style={{ backgroundColor: '#f2f2f2' }}>
      <Row style={{}}>
        <Col md={6}  style={{marginTop:'5%' ,marginBottom:'5%'}} >
    
      <img
  src={landingpage_gif}
  alt="Your Image"
  className="img-fluid"
  style={{
    border: '2px solid #ccc',
    borderRadius: '10%',
    width: '500px', // Set the width
    height: '300px', // Set the height
  }}
/>
        </Col>
        <Col md={6} style={{marginTop:'5%' ,marginBottom:'5%'}} >
          <div className="right-container" style={{marginTop:'5%' }}>
          <div className="left-container" style={{textAlign:'left',marginTop:'5%' ,marginLeft:'10%' }}>
          <p >SmartTutor AI</p>
          <h2 style={{ fontSize: '44px', fontWeight: 'bold' }}>AI Quiz generation of Content</h2>

            <p>we aim to provde following stuff to our users</p>
            <ul>
              <li>Personalized Study Plans</li>
              <li>AI Quiz Generation</li>
              <li>AI Summary Generation</li>
              <li>Community</li>
             
            </ul>
            <Button  className="m-2">
          Try Out
        </Button>
          </div>
          </div>
      
        </Col>
      </Row>
    </Container> */}
  <Container fluid style={{textAlign:'center' ,marginTop:'3%',backgroundColor:'#e1efff',height:'600px'}}>
    <h style={{fontSize:'34px',fontWeight:'bold' ,}}>Who is it For?</h>
  <Row>
      {/* <Col>
        <Card>
          <Card.Img variant="top"  style={{height:'300px'}}src={teacher_image1} />
          <Card.Body>
            <Card.Title>Students</Card.Title>
            <Card.Text>
            This could include high school, college, or university students preparing for exams, standardized tests (SAT, ACT, GRE, etc.), or even professional certifications
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Img variant="top" style={{height:'300px'}} src={student_image2} />
          <Card.Body>
            <Card.Title>Teachers</Card.Title>
            <Card.Text>
            This could include high school, college, or university students preparing for exams, standardized tests (SAT, ACT, GRE, etc.), or even professional certifications
            </Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col>
        <Card>
          <Card.Img variant="top" style={{height:'300px'}} src={student_image1} />
          <Card.Body>
            <Card.Title>HR Managers</Card.Title>
            <Card.Text>
            This could include high school, college, or university students preparing for exams, standardized tests (SAT, ACT, GRE, etc.), or even professional certifications
            </Card.Text>
          </Card.Body>
        </Card>
      </Col> */}
    </Row>


  </Container>



      {/* Footer */}
      <footer className="bg-light text-lg-start">
       <Footer/>

      </footer>
    </div>
  );
}

export default App;
