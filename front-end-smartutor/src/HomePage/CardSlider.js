import React, { useState } from 'react';
import { Container, Card, Button, Modal,Row,Col } from 'react-bootstrap';
import calender from './calendar.svg'
import members from './members.svg'
import degre from './degre.svg'
import book from './book.svg'
const CardSlider = ({ cards }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cardsToShow = 4;
  const totalCards = cards.length;
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (index) => {
    setHoveredCard(index);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };
  const slideLeft = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const slideRight = () => {
    if (currentIndex < totalCards - cardsToShow) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleReadMore = (index) => {
    setSelectedCard(cards[index]);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Container style={{backgroundColor:'#e1efff'}}>
      <div style={{ display: 'flex', overflowX: 'hidden' }}>
        {cards.slice(currentIndex, currentIndex + cardsToShow).map((studyPlan, index) => (
        <Card
        key={index}
        style={{
          width: '20rem',
          margin: '10px',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
          transform: hoveredCard === index ? 'scale(1.05)' : 'scale(1)',
          boxShadow: hoveredCard === index ? '0 4px 8px 0 rgba(173,216,230,0.6)' : 'none',
          backgroundColor: hoveredCard === index ? '#f9f9f9' : 'white', // Light color when hovering
        }}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
      >
        <Card.Img variant="top" src={studyPlan.image} style={{ width: '100%', height: '150px' }} />
        <Card.Body style={{alignItems:'center'}}>
            <Card.Title  style={{color:'#696969'}}>{studyPlan.name}</Card.Title>
            <Card.Text style={{color:'#696969'}}>{studyPlan.subject}</Card.Text>
            <Button variant="primary" style={{backgroundColor: '#f66b1d',borderColor:'#f66b1d'}} onClick={() => handleReadMore(index)}>Read more</Button>
        </Card.Body>
    </Card>
        ))}
      </div>

      <Modal show={showModal}  onHide={handleCloseModal}>
        {selectedCard && (
          <>
            <Modal.Header closeButton/>
            <Modal.Body >
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
    
  {/* </Card.Body>
</Card> */}
            </Modal.Body>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default CardSlider;
