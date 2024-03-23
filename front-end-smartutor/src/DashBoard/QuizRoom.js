import React, { useState, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	Tabs,
	Tab,
	Button,
	Row,
	Col,
	Modal,
	Container,
	Alert,
	ButtonGroup,
	Form,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Sidebar from "./sidebar";
import DashBoardNavbar from "./DashBoardNavbar";
import DisscusionForum from "./DisscusionForum";
import ResourcePreview from "./ResourcePreview";
import { UserContext } from "../landing_page_component/UserContext";
import userService from "../landing_page_component/UserSerive";
import StudyPlanSettings from "./StudyPlanSettings";
// import { Link,useNavigate } from 'react-router-dom';
import { Editor } from "@tinymce/tinymce-react";
import Footer from "../landing_page_component/footer";
import DashboardTabs from "./Dashbaord_tabs";
import Quiz from "./Quiz";
const StylishTabs = () => {
	const navigate = useNavigate();
	const { userData } = useContext(UserContext);
	const [activeButton, setActiveButton] = useState("tab6");
	const [showModal, setShowModal] = useState(false);

	// const [alertPost, setAlertPost] = useState({show: false, variant: '', message: ''});
	const [alert, setAlert] = useState({ show: false, variant: "", message: "" });

	const handleShow = () => setShowModal(true);

	// Function to handle modal close
	const handleClose = () => setShowModal(false);
	// console.log(userData)

	const location = useLocation();

	const studyPlan = location.state?.studyPlan;
	const plan = studyPlan;
	console.log(studyPlan);
	if (!studyPlan) {
		navigate("/homepage"); // Replace '/homepage' with your homepage route
	} else {
	}

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			console.log("token does'nt exit : ", localStorage);
			// Redirect to landing page if token doesn't exist

			navigate("/");
		} else {
		}
	}, []);

	// Step 3: Event handler to capture changes in the text area

	const [time, setTime] = useState("");
	const [chapter, setChapter] = useState("");
	const [topic, setTopic] = useState("");
	const [duration, setDuration] = useState("");
	const [numQuestions, setNumQuestions] = useState("");
	const [quizType, setQuizType] = useState("");

	// Function to handle form submission
	const handleSubmit = () => {
		// Perform actions with the form data (e.g., send it to a server)
		// ...

		// Close the modal
		handleClose();
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
			<DashBoardNavbar />
			{alert.show && (
				<Alert
					variant={alert.variant}
					style={{
						marginTop: "50px",
						position: "fixed",
						zIndex: 9999,
						top: 0,
						right: 0,
						left: 0,
					}}
					onClose={() => setAlert({ ...alert, show: false })}
					dismissible
				>
					{alert.message}
				</Alert>
			)}
			<div style={{ marginTop: "100px", backgroundColor: "#e1efff" }}>
				<DashboardTabs studyPlan={studyPlan} activeButton={activeButton} />
			</div>
			<Button variant="primary" onClick={handleShow}>
				Open Modal
			</Button>
			<Modal show={showModal} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Create Quiz Room</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{/* Form for quiz details */}
					<Form onSubmit={handleSubmit}>
						{/* Select Time and Date */}
						{/* ... (Add appropriate components for time and date selection) */}

						{/* Select Chapter and Topics */}
						<Form.Group controlId="formChapter">
							<Form.Label>Chapter</Form.Label>
							<Form.Control
								as="select"
								multiple
								onChange={(e) =>
									setChapter(Array.from(e.target.selectedOptions, (option) => option.value))
								}
							>
								<option value="chapter1">Chapter 1</option>
								<option value="chapter2">Chapter 2</option>
								{/* Add more chapters as needed */}
							</Form.Control>
						</Form.Group>

						<Form.Group controlId="formTopic">
							<Form.Label>Topic</Form.Label>
							<Form.Control
								as="select"
								multiple
								onChange={(e) =>
									setTopic(Array.from(e.target.selectedOptions, (option) => option.value))
								}
							>
								<option value="topic1">Topic 1</option>
								<option value="topic2">Topic 2</option>
								{/* Add more topics as needed */}
							</Form.Control>
						</Form.Group>

						{/* Select Duration */}
						<Form.Group controlId="formDuration">
							<Form.Label>Duration</Form.Label>
							<Form.Control as="select" onChange={(e) => setDuration(e.target.value)}>
								<option value="5">5 minutes</option>
								<option value="10">10 minutes</option>
								<option value="20">20 minutes</option>
								<option value="30">30 minutes</option>
							</Form.Control>
						</Form.Group>

						{/* Select Number of Questions */}
						<Form.Group controlId="formNumQuestions">
							<Form.Label>Number of Questions</Form.Label>
							<Form.Control as="select" onChange={(e) => setNumQuestions(e.target.value)}>
								<option value="5">5 questions</option>
								<option value="10">10 questions</option>
								<option value="15">15 questions</option>
								<option value="20">20 questions</option>
							</Form.Control>
						</Form.Group>

						{/* Select Quiz Type */}
						<Form.Group controlId="formQuizType">
							<Form.Label>Quiz Type</Form.Label>
							<Form.Control as="select" onChange={(e) => setQuizType(e.target.value)}>
								<option value="MCQ">MCQ</option>
								<option value="ShortQ">Short Q/A</option>
							</Form.Control>
						</Form.Group>

						{/* Submit button */}
						<Button variant="primary" type="submit">
							Create Quiz Room
						</Button>
					</Form>
				</Modal.Body>
			</Modal>
			<footer className="bg-light text-lg-start" style={{ marginTop: "100px" }}>
				<Footer />
			</footer>
		</>
	);
};

export default StylishTabs;
