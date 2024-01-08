import React, { useState,useContext,useEffect } from 'react';
import  { useLocation,useNavigate,Link } from 'react-router-dom';
import { Tabs, Tab,Button ,Row,Col,Modal,Container,Alert,ButtonGroup} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sidebar from './sidebar';
import DashBoardNavbar from './DashBoardNavbar';
import DisscusionForum from './DisscusionForum';
import ResourcePreview from './ResourcePreview';
import { UserContext } from '../landing_page_component/UserContext';
import userService from '../landing_page_component/UserSerive';
import LoadingScreen from '../HomePage/LoaderScreen';
// import { Link,useNavigate } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
const StylishTabs = () => {
  const navigate = useNavigate()
  const { userData } = useContext(UserContext);
  const [key, setKey] = useState('tab4');
  const [isLoading, setIsLoading] = useState(false);
  const [activeButton, setActiveButton] = useState('tab4');
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

  const fetchPosts = async () => {
    setIsLoading(true);
  try { 
    const response = await userService.get(`/api/queryposts/?study_plan_id=${studyPlan.id}`);
    // console.log(response.data);
    setPosts(response.data);
  } catch (error) {
    console.error('Failed to fetch posts', error);
    // navigate('/homepage');
  }
  setIsLoading(false);
};
  useEffect(() => {

    fetchPosts(); // This will run only once, when the component mounts
  },[]);

  const fetchBook = async () => {
    try { 
      const response = await userService.get(`/api/books/${studyPlan.books}/`);
      // console.log(response.data);
      setbookData(response.data);
    } catch (error) {
      console.error('Failed to fetch posts', error);
      // navigate('/landingpage');
    }
  };

  useEffect(() => {
    fetchBook(); // This will run only once, when the component mounts
  }, []);
  // console.log(studyPlan);
  // console.log(props)
  const [showModal, setShowModal] = useState(false);
  const [postInput, setPostInput] = useState('');
  const [textAreaValue, setTextAreaValue] = useState('');
  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalShow = () => {
    setShowModal(true);
  };

  const handlePostSubmit = async (e) => {
    // Assuming postInput contains the data to be sent
    const postData = {
      content:textAreaValue,
      author: userData.pk,
      study_plan:studyPlan.id,

    };
  
      try {
        const response = await userService.post('/api/queryposts/', postData);
        // Handle success - maybe show a success message or redirect
        console.log('Response:', response.data);
        console.log('Response:', response.data);
        handleModalClose();
        fetchPosts();
        setAlert({show: true, variant: 'success', message: 'Post submitted successfully!'});
      } catch (error) {
        // Handle error - show error message or perform necessary actions
        // console.error('Error:', error);
        console.error('Error:', error);
         
        handleModalClose();
        setAlert({show: true, variant: 'danger', message: 'Error submitting post!'});
      }
  };

  const postsPerPage = 4; // Number of posts to load per click

  const handleLoadMore = () => {
    setVisiblePosts(visiblePosts + postsPerPage);
  };

  const [content, setContent] = useState('');

  const handleEditorChange = (content) => {
    setPostInput(content);
  };

  const handleTextAreaChange = (event) => {
    setTextAreaValue(event.target.value);
  };
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
    <div style={{marginTop:'100px' }}>
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
    <Container>
      <Row>
        <Col xs={8}>
          <h1>Latest Question Asked</h1>
        </Col>
        <Col>
          <Button variant="primary" onClick={handleModalShow}>
            Ask a question
          </Button>
          {/* Other content related to the latest question goes here */}
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Write your post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
 


 
<textarea
        value={textAreaValue} // Set the value of the text area
        onChange={handleTextAreaChange} // Handle changes in the text area
        placeholder="Type something here..."
        rows={4}
        
        cols={40}
      />

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handlePostSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
        {/* Content for Tab 3 */}
        {/* <DisscusionForum post={samplePost} /> */}
        {isLoading ? <LoadingScreen /> : <>     
        {posts.slice(0, visiblePosts).map((post) => (
        <DisscusionForum key={post.id} post={post} studyPlan={studyPlan} fetchPostfunc={fetchPosts}/> 
      ))}
    
      {visiblePosts < posts.length && (
        <Button onClick={handleLoadMore} style={{marginTop:'5px',marginLeft:'50%'}}>Load More</Button>
      )}
      </>}
    
    

    </div>
    </>
  );
};

export default StylishTabs;