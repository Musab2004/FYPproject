import { Row, Col, Card, Button,Badge,Modal, Form,Nav,Dropdown ,Container } from 'react-bootstrap';
// import { Button, Card, } from 'react-bootstrap';
// import Navbar from './HomePageNavbar'
import React, { useState,useContext,useRef,useEffect } from 'react';
import { UserContext } from '../landing_page_component/UserContext';
import { Bar,Cate } from 'react-chartjs-2';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Chart as ChartJS } from "chart.js/auto";
import { Link,useNavigate } from 'react-router-dom';
import logo from '../landing_page_component/logo_smarttutor.svg';
import Navbar from "./HomePageNavbar"
const UserProfile = () => {
  
  const [show, setShow] = useState(false);
  // const [userData, setUserData] = useState({ name: 'John Doe', job: 'Web Designer' });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
    
  const [activeTab, setActiveTab] = useState("home");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const handleSave = () => {
    // Here you can make a request to your server to update the user data
    // After that, you should close the modal
    handleClose();
  };

  const handleInputChange = (event) => {
    // setUserData({ ...userData, [event.target.name]: event.target.value });
  };

    const markedDates = [
        new Date(2023, 11, 1).getTime(),
        new Date(2023, 11, 2).getTime(),
        new Date(2023, 11, 3).getTime(),
      ];
  // This is just sample data. Replace this with your actual data.
const timeSpentLastWeek = [120, 200, 150, 220, 300, 250, 400]; // in minutes
const chartRef = useRef(null);

useEffect(() => {
  return () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  };
}, []);
const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'My First dataset',
        fill: false,
        lineTension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: [65, 59, 80, 81, 56, 55, 40]
      }
    ]
  };
    var { userData } = useContext(UserContext);
    var baseURL = ''
    if (userData) {
        baseURL= 'http://127.0.0.1:8000/media/'+userData.profile_pic
        console.log(baseURL)
    }

 console.log(userData)
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
      <Navbar activeTab={'none'}/>
        <div className="container" style={{marginTop:'100px',display:'flex'}}>
        {userData &&    <Card style={{ width: '18rem' ,height:'50%'}}>
     
      <Card.Body className="text-center" >
                                    <div className="m-b-25">
                                        {userData && <img src={baseURL} className="img-radius" alt="User-Profile-Image" />}
                                        
                                    </div>
                                    <h6 className="f-w-600">{userData.name} </h6>
                                    <p>{userData.email_address}</p>
                                    <p>{userData.City}, {userData.Country}</p>
                                    <i className="mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                    <Button className="m-2" onClick={handleShow}>
            Edit Profile
          </Button>
      
                                </Card.Body>
                         
    </Card> }
        
    {userData &&   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" name="name" value={userData.name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email Address</Form.Label>
              <Form.Control type="text" name="job" value={userData.email_address} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="text" name="job" value={userData.password} onChange={handleInputChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
}

        <div>
                    {userData && <Card className="user-card-full" style={{width:'900px',marginLeft:'15%'}}>
                     
                        
                            <Card.Body >
                                <Card.Title>Education Activity</Card.Title>
                            
                                <Calendar style={{marginLeft:'10%'}}
      tileContent={({ date, view }) => {
        // Check if a date should be marked
        if (view === 'month' && markedDates.includes(date.getTime())) {
          // Mark the date with a dot
          return <Badge variant="danger">User Activity</Badge>;
        }
      }}
    />
  

  
</Card.Body>
                    

                      
                    </Card>



}
{userData && <Card className="user-card-full" style={{width:'900px', marginTop:'10%',marginLeft:'15%',marginBottom:'5%'}}>
                        
                    
                          
                            <Card.Body>
  
    <Card.Title>StudyPLans</Card.Title>
    <div>

    <Bar data={data} style={{height:'300px'}} />
  </div>
    
    {/* Rest of your content */}
</Card.Body>
                    

                         
                    </Card>}
                    </div>



           
        </div>
        </>
    );
}

export default UserProfile;
