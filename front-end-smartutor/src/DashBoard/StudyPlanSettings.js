import React, { useState, useContext, useRef, useEffect } from 'react';
import { Row, Col, Card, Button, Badge, Modal, Form, Tabs, Tab, Container, Alert, ButtonGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserContext } from '../landing_page_component/UserContext';
import { Bar, Cate } from 'react-chartjs-2';
import InfiniteCalendar from 'react-infinite-calendar';
import 'react-infinite-calendar/styles.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Chart as ChartJS } from "chart.js/auto";
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from './sidebar';
import DashBoardNavbar from './DashBoardNavbar';
import DisscusionForum from './DisscusionForum';
import ResourcePreview from './ResourcePreview';
import userService from '../landing_page_component/UserSerive';
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';
import TaskList from './TasKlist' 
// import StudyPlanSettings from './StudyPlanSettings';
import Weekicon from './week-icon.png'
import { Editor } from '@tinymce/tinymce-react';
import Footer from "../landing_page_component/footer"
import calender from './calendar.svg'
import members from './members.svg'
import degre from './degre.svg'
import book from './book.svg'
const StudyPlanSettings = () => {
  const navigate = useNavigate()
  const { userData } = useContext(UserContext);
  const [activeButton, setActiveButton] = useState('tab5');


  const [key, setKey] = useState('tab1');
  // const [alertPost, setAlertPost] = useState({show: false, variant: '', message: ''});
  const [alert, setAlert] = useState({show: false, variant: '', message: ''});

  const [posts, setPosts] = useState([]);
  const [bookData, setbookData] = useState([]);
  
  const [visiblePosts, setVisiblePosts] = useState(4); // Number of posts to display initially
  // console.log(userData)

  const location = useLocation();

  const studyPlan = location.state?.studyPlan;
  const plan=studyPlan
  console.log(studyPlan)
  if (!studyPlan) {
    navigate('/homepage'); // Replace '/homepage' with your homepage route
  }
  else{



  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log("token does'nt exit : ",localStorage)
      // Redirect to landing page if token doesn't exist
      
      navigate('/landingpage');
    } else {
     

    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try { 
        const response = await userService.get(`/api/queryposts/?study_plan_id=${studyPlan.id}`);
        // console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.error('Failed to fetch posts', error);
        navigate('/homepage');
      }
    };
  
    const interval = setInterval(fetchPosts, 3000); // Fetch data every 5 seconds (adjust as needed)
  
    // Cleanup function to clear the interval when component unmounts or when you don't need it anymore
    return () => clearInterval(interval);
  }, []);


  


  const handleClick = (tab, path) => {
    setActiveButton(tab);
    navigate(path,{state:{
        studyPlan
          },});
  };
  const tasks = [
    {
      assignee: 'Week No.1',
      avatar: Weekicon,
      taskName: 'Call Sam For payments are',
      priority: 'Good',
      priorityClass: 'bg-success',
    },
    {
      assignee: 'Week No.2',
      avatar: Weekicon,
      taskName: 'Call Sam For payments are',
      priority: 'Good',
      priorityClass: 'bg-success',
    },
    {
      assignee: 'Week No.3',
      avatar: Weekicon,
      taskName: 'Call Sam For payments are',
      priority: 'very Bad',
      priorityClass: 'bg-danger',
    },
    {
      assignee: 'Week No.4',
      avatar: Weekicon,
      taskName: 'Call Sam For payments are',
      priority: 'None',
      priorityClass: 'bg-info',
    },
    // Add more tasks similarly
  ];
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
    <DashBoardNavbar/>
    {alert.show && <Alert 
  variant={alert.variant} 
  style={{
    marginTop: '50px', 
    position: 'fixed', 
    zIndex: 9999, 
    top: 0, 
    right: 0, 
    left: 0
  }} 
  onClose={() => setAlert({...alert, show: false})} 
  dismissible
>
  {alert.message}
</Alert>}
    <div style={{marginTop:'100px'}}>
    <div aria-label="Basic example" style={{marginLeft:'20%',marginBottom:'3%'}}>
    <Button 
    style={{
        marginLeft: '15px', 
        backgroundColor: activeButton === 'tab1' ? '#1f5692' : 'white', 
        color: activeButton === 'tab1' ? 'white' : '#1f5692', 
        borderColor: 'white', 
        fontStyle: 'italic', 
        borderRadius: '10px'
    }}
    variant={activeButton === 'tab1' ? 'primary' : 'secondary'} 
    onClick={() => handleClick('tab1', '/dashboard')}>
    Study Schedule
</Button>
<Button 
    style={{
        marginLeft: '15px', 
        backgroundColor: activeButton === 'tab2' ? '#1f5692' : 'white', 
        color: activeButton === 'tab2' ? 'white' : '#1f5692', 
        borderColor: 'white', 
        fontStyle: 'italic', 
        borderRadius: '10px'
    }}
    variant={activeButton === 'tab2' ? 'primary' : 'secondary'} 
    onClick={() => handleClick('tab2', '/dashboard-quiz-generation')}>
    Quiz Generation
</Button>
<Button 
    style={{
        marginLeft: '15px', 
        backgroundColor: activeButton === 'tab3' ? '#1f5692' : 'white', 
        color: activeButton === 'tab3' ? 'white' : '#1f5692', 
        borderColor: 'white', 
        fontStyle: 'italic', 
        borderRadius: '10px'
    }}
    variant={activeButton === 'tab3' ? 'primary' : 'secondary'} 
    onClick={() => handleClick('tab3', '/dashboard-summary-generation')}>
    Summary Generation
</Button>
<Button 
    style={{
        marginLeft: '15px', 
        backgroundColor: activeButton === 'tab4' ? '#1f5692' : 'white', 
        color: activeButton === 'tab4' ? 'white' : '#1f5692', 
        borderColor: 'white', 
        fontStyle: 'italic', 
        borderRadius: '10px'
    }}
    variant={activeButton === 'tab4' ? 'primary' : 'secondary'} 
    onClick={() => handleClick('tab4', '/dashboard-discussion-forum')}>
    Discussion Forum
</Button>
<Button 
    style={{
        marginLeft: '15px', 
        backgroundColor: activeButton === 'tab5' ? '#1f5692' : 'white', 
        color: activeButton === 'tab5' ? 'white' : '#1f5692', 
        borderColor: 'white', 
        fontStyle: 'italic', 
        borderRadius: '10px'
    }}
    variant={activeButton === 'tab5' ? 'primary' : 'secondary'} 
    onClick={() => handleClick('tab5', '/dashboard-settings')}>
    Settings
</Button>
</div>

      
      
   
 
    </div>
        {/* <Navbar/> */}
        {/* <div className="container" style={{marginTop:'100px',display:'flex'}}> */}
        {/* <Card style={{ width: '18rem', height: '50%' }}>
  <Card.Img variant="top" src={plan.image} style={{ width: '100%', height: '200px' }}  />
  <Card.Body className="text-center">
    <div className="container">
      <p>{plan.name}</p>
      <p>{plan.academic_level}</p>
    </div>
  </Card.Body>
</Card> */}
<div>
  <div style={{  marginLeft: '15%' }}>
<h2 style={{fontSize:'24px',fontStyle:'italic',color:'#1f5692'}}>Current Progress</h2>
<Card className="user-card-full" style={{ width: '90%'}}>
  <Card.Body>
    <Card.Title>Your progress</Card.Title>
    <MDBProgress height='20'>
      <MDBProgressBar width='25' valuemin={0} valuemax={100} style={{backgroundColor:'#f66b1d',color:'white'}}  bgColor='#1f5692'>
        25%
      </MDBProgressBar>
    </MDBProgress>
    <h>Keep Going you are not there yet.....</h>
    <br/>
    <br/>
    
    <div>
      <h2 style={{fontSize:'24px',fontStyle:'italic'}}>Weekly feedback</h2>
      <TaskList tasks={tasks} />
    </div>
    <div className="d-flex justify-content-end" style={{marginTop:'5%'}}>
      <p>Wanna Change the pace of your studyplan? Click here to   </p>
      <a variant="primary" style={{color:'#f66b1d',textDecoration: 'underline'}}>  Reset Study Plan</a>
    </div>
  </Card.Body>
</Card>
</div>
<div style={{ marginTop: '10%', marginLeft: '15%' }}>
<h2 style={{fontSize:'24px',fontStyle:'italic',color:'#1f5692'}}>StudyPlan Details</h2>
<Card className="user-card-full" style={{ width: '90%', marginBottom: '5%' }}>
  <Card.Body>
    {/* <Card.Title>Study Plans Details</Card.Title> */}
    <Row>
      <Col md={4}  >
    <Card.Img variant="top" src={plan.image} style={{ width: '300px', height: '300px' }}  />
    </Col>
   
    <Col style={{marginTop:'3%'}} >
      <p></p>
      <div style={{textAlign:'left',marginRight:'-40%'}}>
      <h2 style={{fontSize:'24px',fontStyle:'italic',color:'#f66b1d'}}>Study Plans Details</h2>
      </div>
      <Row>
      <Col> 
      <div style={{display:'flex'}}>
      <Card.Img variant="top" src={members} style={{ width: '30px', height: '30px' }}  />
      <p style={{marginLeft:'5px'}}>  Members : 0</p>
      </div>
    </Col>
    <Col >
    <div style={{display:'flex'}}>
      <Card.Img variant="top" src={calender} style={{ width: '30px', height: '30px' }}  />
      <p style={{marginLeft:'5px'}}> Number of weeks : 4</p>
      </div>
   
    </Col>
    </Row>
    <Row>
      <Col> 
      <div style={{display:'flex'}}>
      <Card.Img variant="top" src={degre} style={{ width: '30px', height: '30px' }}  />
      <p style={{marginLeft:'5px'}}>  Subject</p>
      </div>
   
    </Col>
    <Col >
    <div style={{display:'flex'}}>
      <Card.Img variant="top" src={book} style={{ width: '30px', height: '30px' }}  />
      <p style={{marginLeft:'5px'}}> Academic Level</p>
      </div>
    
    </Col>
    </Row>



    <Button variant="primary" style={{backgroundColor:'#f66b1d' ,borderColor:'#f66b1d'}}>Delete Study Plan</Button>
    </Col>
    
    {/* ... content */}
    </Row>
    
  </Card.Body>
</Card>
</div>

                    </div>
        {/* </div> */}
        <footer className="bg-light text-lg-start" style={{marginTop:'100px'}}>
       <Footer/>
      </footer>
        </>
    );
}

export default StudyPlanSettings;
