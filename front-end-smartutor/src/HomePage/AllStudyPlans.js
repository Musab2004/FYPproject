import React, { useState } from 'react';
import {Container,Modal, Row, Col, FormControl, Button, Card, Pagination, Form } from 'react-bootstrap';
import calender from './calendar.svg'
import members from './members.svg'
import degre from './degre.svg'
import book from './book.svg'
const StudyPlans = ({ studyPlans, itemsPerPage }) => {
  const [activePage, setActivePage] = useState(1);
  const [locationFilter, setLocationFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  const handleReadMore = (index) => {
    setSelectedCard(studyPlans[index]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleFilterChange = (filterType, value) => {
    if (filterType === 'location') {
      setLocationFilter(value);
    } else if (filterType === 'subject') {
      setSubjectFilter(value);
    }
    setActivePage(1); // Reset pagination to page 1 when filters change
  };

  const filteredStudyPlans = studyPlans.filter((studyPlan) => {
    const locationMatch = !locationFilter || studyPlan.academic_level.toLowerCase() === locationFilter.toLowerCase();
    const subjectMatch = !subjectFilter || studyPlan.subject.toLowerCase().includes(subjectFilter.toLowerCase());

    return locationMatch && subjectMatch;
  });

  const indexOfLastItem = activePage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStudyPlans = filteredStudyPlans.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(filteredStudyPlans.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  return (
    <div>
        <div style={{width:'80%',marginLeft:'8%',marginTop:'5%'}}>
    

<div class="input-group mb-3"style={{width:'40%',marginLeft:'25%'}}>
  <input type="text" class="form-control" placeholder="Search Study Plans faster" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
  <div class="input-group-append">
    <button class="btn btn-outline-secondary" type="button" style={{backgroundColor:'#f66b1d',color:'white'}}>  <i class="fas fa-search"></i> Button</button>
  </div>
</div>
      <Row style={{marginTop:'5%'}}>
    
      {/* <SearchBar handleSearch={handleSearch} handleFilterChange={handleFilterChange} /> */}
    
      <Col  md={2} >
 
  
      <Form>
        <Form.Group>
          <Form.Label>Location</Form.Label>
          <Form.Control as="select" onChange={(e) => handleFilterChange('location', e.target.value)}>
            <option value="">All Academic Levels</option>
            <option value="Middle School">Middle School</option>
            <option value="High School">High School</option>
            <option value="Higher Education">Higher Education</option>
            {/* Add other location options */}
          </Form.Control>
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Subjects</Form.Label>
          <Form.Control as="select" onChange={(e) => handleFilterChange('subject', e.target.value)}>
            <option value="">All Subjects</option>
            <option value="Physics">Physics</option>
            <option value="Chemistry">Chemistry</option>
            <option value="Geography">Geography</option>
            <option value="History">History</option>
            <option value="English">English</option>
            {/* Add other subject options */}
          </Form.Control>
        </Form.Group>

      </Form>
     
{/*       
      <Filters handleFilterChange={handleFilterChange} /> */}
        </Col>
        <Col  md={10}>
     
        {/* <CardList filteredCards={filteredCards} />
        <AllStudyPlans studyPlans={posts} itemsPerPage={12} />  */}
     
      <div className="d-flex flex-wrap" style={{marginLeft:'10%'}}>
        {currentStudyPlans.map((studyPlan, index) => (
               <Card
               key={index}
               style={{
                 width: '14rem',
                 margin: '10px',
                 transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
                 transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
                 boxShadow: hoveredCard === index ? '0 4px 8px 0 rgba(0,0,0,4)' : 'none',
                 backgroundColor: hoveredCard === index ? '#f9f9f9' : 'white', // Light color when hovering
               }}
               onMouseEnter={() => handleMouseEnter(index)}
               onMouseLeave={handleMouseLeave}
             >
              <Card.Img variant="top"  style={{ width: '100%', height: '150px' }}src={studyPlan.image} />
              <Card.Body>
                <Card.Title>{studyPlan.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{studyPlan.schedule}</Card.Subtitle>
                <Card.Text>{studyPlan.description}</Card.Text>
                <Button variant="primary" style={{backgroundColor: '#f66b1d',borderColor:'#f66b1d'}} onClick={() => handleReadMore(index)}>Read more</Button>
              </Card.Body>
            </Card>
        ))}
      </div>
 
     

      <Modal show={showModal} onHide={handleCloseModal}>
        {selectedCard && (
          <>
            <Modal.Header closeButton>
           
            </Modal.Header>
            <Modal.Body>
                     {/* <Card className="user-card-full" style={{  marginBottom: '5%' }}>
  <Card.Body> */}
    {/* <Card.Title>Study Plans Details</Card.Title> */}
    <Row>
      
      <Card.Img variant="top" src={selectedCard.image} style={{ width: '100%', height: '100px' }}  />
     
     
      <Col style={{marginTop:'3%'}} >
        <p></p>
        <div style={{textAlign:'left',marginRight:'-40%'}}>
        <h2 style={{fontSize:'24px',fontStyle:'italic',color:'#f66b1d'}}>Study Plans Details</h2>
        </div>
        <Row>
        <Col> 
        <div style={{display:'flex'}}>
        <Card.Img variant="top" src={members} style={{ width: '30px', height: '30px' }}  />
        <p style={{marginLeft:'5px'}}>  Members : 1</p>
        </div>
      </Col>
      <Col >
      <div style={{display:'flex'}}>
        <Card.Img variant="top" src={calender} style={{ width: '30px', height: '30px' }}  />
        <p style={{marginLeft:'5px'}}> Number of weeks : {selectedCard.duration}</p>
        </div>
     
      </Col>
      </Row>
      <Row>
        <Col> 
        <div style={{display:'flex'}}>
        <Card.Img variant="top" src={degre} style={{ width: '30px', height: '30px' }}  />
        <p style={{marginLeft:'5px'}}>  Subject : {selectedCard.subject}</p>
        </div>
     
      </Col>
      <Col >
      <div style={{display:'flex'}}>
        <Card.Img variant="top" src={book} style={{ width: '30px', height: '30px' }}  />
        <p style={{marginLeft:'5px'}}> High School</p>
        </div>
      
      </Col>
      </Row>
  
  
  
      <Button variant="primary" style={{backgroundColor:'#f66b1d',marginTop:'5%',marginLeft:'35%' ,borderColor:'#f66b1d'}}>Join StudyPlan</Button>
      </Col>
      
      {/* ... content */}
      </Row>
      
            </Modal.Body>
          </>
        )}
      </Modal>

      <Pagination style={{marginLeft:'10%'}}> 
        {Array.from({ length: totalPages }, (_, index) => (
          <Pagination.Item
            key={index + 1}
            active={index + 1 === activePage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
      </Col>
      </Row>
      </div>
    </div>
  );
};

export default StudyPlans;
