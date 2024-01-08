import React, { useState,useContext,useEffect } from 'react';
import './TimeTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import userService from '../landing_page_component/UserSerive';
import { UserContext } from '../landing_page_component/UserContext';
import { useLocation,useNavigate } from 'react-router-dom';
import { Button, Container } from 'react-bootstrap';
import Navbar from "./HomePageNavbar"
import background_image from './background_image.jpg';
import StudyPlans from './StudyPlansStillGoingOn';
function App() {
  const navigate = useNavigate();
  let location = useLocation();
  let studyPlan_id = location.state.books.id;
  let studyPlan = location.state.books;
  const [activeTab, setActiveTab] = useState("createstudyplan");
  console.log(studyPlan);
 const [data, setData] = useState([]);
  useEffect(() => {
    const fetchWeeklyGoals = async () => {
     
        const response = await userService.get('api/getweeklygoals/', {
          params: {
            studyplan_id: studyPlan_id,
          }
        })
        .then(response => {
          console.log(response.data);
          setData(response.data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
      
    };
  
    fetchWeeklyGoals();
  }, []);

  const GottoDashBoard = () => {
    navigate('/dashboard',{state:{
      studyPlan
        },})
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
   <Navbar activeTab={activeTab} />
{data &&<> 
  <Container style={{marginTop:'5%', backgroundColor:'white', borderRadius: '10px'}} >
<div style={{display:'flex'}}>
 
<div>
  
  <div className="container py-7" style={{textAlign:'center'}}>
    <h2 className="text-uppercase text-letter-spacing-xs my-0 text-primary font-weight-bold">
      StudyPlan Schedule
    </h2>
    <p>Your Final Time Table is here.</p>
    <p>Quizes per Week : {studyPlan.QuizesPerWeek}</p>
    <div className="row">
      {data.map((weekData, index) => (
        <div className="col-lg-4 mb-3" id={`week-${weekData.weekly_goals.order}`} key={index} style={{ marginTop: '5%' }}>
          <h4 className="mt-0 mb-3 text-dark op-8 font-weight-bold">
            Week {weekData.weekly_goals.order} 
          </h4>
          <p style={{color:'blue'}}>{weekData.weekly_goals.start_date} - {weekData.weekly_goals.end_date  }</p>
          <ul className="list-timeline list-timeline-primary">
            {weekData.chapters.map((chapter, chapIndex) => (
              <li className="list-timeline-item p-0 pb-3 pb-lg-4 d-flex flex-wrap flex-column" key={chapIndex}>
                <p className="my-0 text-dark flex-fw text-sm text-uppercase">
                  {chapter.title}
                </p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  </div>
  <Button
        onClick={() => GottoDashBoard()}
      style={{ fontWeight: 'bold', borderColor:'#f66b1d',backgroundColor:'#f66b1d',marginLeft:'45%',marginBottom:'5%' ,marginTop:'30px',height:'50px',width:'250px'}}
    >
      Got to DashBoard
    </Button>
       
</div>


</div>
</Container>
</>
 }
</>
  );
}

export default App;