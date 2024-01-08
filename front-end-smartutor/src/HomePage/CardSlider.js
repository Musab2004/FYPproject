import React, { useState } from 'react';
import { Container, Card, Button, Modal } from 'react-bootstrap';

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

      <Modal show={showModal} onHide={handleCloseModal}>
        {selectedCard && (
          <>
            <Modal.Header closeButton/>
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
    <Card.Text >Subject: {selectedCard.subject }</Card.Text>
    <Card.Text>Academic level: {selectedCard.acdemic_level}</Card.Text>
</div>
<div>
    <Card.Text>Members : 45</Card.Text>
</div>
<br/>
<div style={{marginLeft:'30%'}}>
                  <Button variant="success" style={{backgroundColor: '#f66b1d',borderColor:'#f66b1d'}}>Join Study Plan</Button>
                  </div>
          
                </Card.Body>
              </Card>
            </Modal.Body>
          </>
        )}
      </Modal>
    </Container>
  );
};

export default CardSlider;
