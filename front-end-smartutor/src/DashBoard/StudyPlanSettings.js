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
// import StudyPlanSettings from './StudyPlanSettings';
import { Editor } from '@tinymce/tinymce-react';
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
        <div className="container" style={{marginTop:'100px',display:'flex'}}>
           <Card style={{ width: '18rem' ,height:'50%'}}>
      <Card.Img variant="top" src={plan.image} />
      <Card.Body className="text-center" >
      <div className="container">
            <p>{plan.name}</p>
            <p>{plan.academic_level}</p>
            {/* <h1>Study Plans</h1> */}
            <div className="row">

            </div>
        </div>
      
                                </Card.Body>
                         
    </Card> 
        
 

        <div>
                   <Card className="user-card-full" style={{width:'900px',marginLeft:'15%'}}>
                     
                        
                            <Card.Body >
                                <Card.Title>Weekly Goals</Card.Title>
                            
                                <Button variant="primary" >
             Reset Study PLan           </Button>

   
  

  
</Card.Body>
                    

                      
                    </Card>



 <Card className="user-card-full" style={{width:'900px', marginTop:'10%',marginLeft:'15%',marginBottom:'5%'}}>
                        
                    
                          
                            <Card.Body>
  
    <Card.Title>StudyPlans Details</Card.Title>
    <div>
    <div key={plan.id} className="col-md-4">
                        
                            {/* <img src={plan.image} className="card-img-top" alt="Plan" /> */}
                            <div className="card-body">
                                <h5 className="card-title">{plan.name}</h5>
                                <p className="card-text">Subject: {plan.subject}</p>
                                <p className="card-text">Academic Level: {plan.academic_level}</p>
                            
                            </div>
                        </div>
                        <Button variant="primary">
             Delete Study Plan          </Button>
                    {/* </div> */}
   
  </div>
    
    {/* Rest of your content */}
</Card.Body>
                    

                         
                    </Card>


                    <Card className="user-card-full" style={{width:'900px', marginTop:'10%',marginLeft:'15%',marginBottom:'5%'}}>
                        
                    
                          
                        <Card.Body>

<Card.Title>Progress</Card.Title>
<div>
<div key={plan.id} className="col-md-4">
                    
                        {/* <img src={plan.image} className="card-img-top" alt="Plan" /> */}
                        <div className="card-body">
                            <h5 className="card-title">{plan.name}</h5>
                            <p className="card-text">Subject: {plan.subject}</p>
                            <p className="card-text">Academic Level: {plan.academic_level}</p>
                            {/* Add more fields as needed */}
                            <a href={`/study-plans/${plan.id}`} className="btn btn-primary">View Details</a>
                        </div>
                    </div>
                {/* </div> */}

</div>

{/* Rest of your content */}
</Card.Body>
                

                     
                </Card>



                    </div>



           
        </div>
        </>
    );
}

export default StudyPlanSettings;
