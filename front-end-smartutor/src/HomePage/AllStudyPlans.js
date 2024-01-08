import React, { useState } from 'react';
import {Container,Modal, Row, Col, FormControl, Button, Card, Pagination, Form } from 'react-bootstrap';

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
                <Card.Title>{studyPlan.subject}</Card.Title>
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
              <Card>
                {/* <Card.Img variant="top" src={selectedCard.image} /> */}
                <Card.Body>
                <div style={{textAlign:'center'}}>
                  <Card.Title >{selectedCard.name}</Card.Title>
                  </div>
                  <Card.Text>{selectedCard.id}</Card.Text>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Card.Text>Quizes per week : {selectedCard.QuizesPerWeek }</Card.Text>
    <Card.Text>duration : {selectedCard.duration }</Card.Text>
</div>
<div style={{ display: 'flex', justifyContent: 'space-between' }}>
    <Card.Text>Subject: {selectedCard.subject }</Card.Text>
    <Card.Text>Academic level: {selectedCard.acdemic_level}</Card.Text>
</div>
<div>
    <Card.Text>Members : 45</Card.Text>
</div>
<br/>
<div style={{marginLeft:'30%'}}>
                  <Button variant="success">Join Study Plan</Button>
                  </div>
                 
                </Card.Body>
              </Card>
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
