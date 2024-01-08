import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
 // Bootstrap Icons

const TopicContent = ({ topic }) => {
  // Placeholder content for each topic
  const contentMap = {
    'Topic 1': 'Content for Topic 1 goes here.',
    Quiz: 'Quiz questions and options go here.',
    'Topic 2': 'Content for Topic 2 goes here.',
    // Add more topics as needed
  };

  return <div>{contentMap[topic]}</div>;
};

const Sidebar = () => {
  const [weekItems, setWeekItems] = useState([
    {
      id: 1,
      title: 'Week 1',
      topics: ['Topic 1', 'Quiz', 'Topic 2'],
      isOpen: false,
    },
    {
      id: 2,
      title: 'Week 2',
      topics: ['Topic 3', 'Quiz 2', 'Topic 4'],
      isOpen: false,
    },
    // Add more weeks as needed
  ]);

  const [selectedTopic, setSelectedTopic] = useState(null);

  const handleItemClick = (weekId) => {
    // Handle item click logic here
    const updatedWeeks = weekItems.map((week) => {
      if (week.id === weekId) {
        return { ...week, isOpen: !week.isOpen };
      } else {
        return { ...week, isOpen: false };
      }
    });
    setWeekItems(updatedWeeks);
  };

  const handleTopicClick = (topic) => {
    // Handle topic click logic here
    setSelectedTopic(topic);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <nav className="col-md-2 d-none d-md-block bg-light sidebar">
          <div className="sidebar-sticky">
            {weekItems.map((week) => (
              <div key={week.id} className="nav-item">
                <h6
                  className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
                  onClick={() => handleItemClick(week.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <span>
                    <i className={`bi bi-calendar-week me-2`} />
                    {week.title}
                  </span>
                  <i
                    className={`bi ${
                      week.isOpen ? 'bi-chevron-up' : 'bi-chevron-down'
                    }`}
                  />
                </h6>
                <ul
                  className={`nav flex-column ${
                    week.isOpen ? 'show' : 'collapse'
                  }`}
                >
                  {week.topics.map((topic, index) => (
                    <li key={index} className="nav-item">
                      <div
                        className="nav-link"
                        onClick={() => handleTopicClick(topic)}
                        style={{ cursor: 'pointer' }}
                      >
                        {topic}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </nav>
        <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-md-4">
          {selectedTopic && (
            <div>
              <h2>{selectedTopic}</h2>
              <TopicContent topic={selectedTopic} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Sidebar;
