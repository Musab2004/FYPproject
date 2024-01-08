// RedditPost.js
import React, { useState ,useEffect,useContext} from 'react';
import { Card, Button, Collapse,Form, FormControl ,Modal} from 'react-bootstrap';
import { UserContext } from '../landing_page_component/UserContext';
import userService from '../landing_page_component/UserSerive';
import  { useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
// import { UserContext } from '../landing_page_component/UserContext';


const ITEM_HEIGHT = 48
const Comments = (props) => {
  var post=props.post
  var comment=props.comment
  const [author, setauthor] = useState([]);
  const { userData } = useContext(UserContext);
  const [comments, setComments] = useState([]);

  // const { userData } = useContext(UserContext);
  // console.log(userData)
  const [isEditing, setIsEditing] = useState(null);
  const [editedText, setEditedText] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // const fetchComments = async (postId) => {
  //   try {
  //     const response = await userService.get(`/api/answersposts/?post_id=${postId}`);
  //     setComments(response.data);
  //     setIsLoading(false);
  //   } catch (error) {
  //     console.error('Failed to fetch comments', error);
  //     setIsLoading(false);
  //   }
  // };
  
// fetchComments(props.post.id); // Fetch comments when props.post changes
  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setReason('');
  };

  const handleReasonChange = (event) => {
    setReason(event.target.value);
  };


  const handleEdit = (commentId) => {
    setIsEditing(commentId);
  };



    useEffect(() => {
        const fetchUser = async () => {
          try {
            const response = await userService.get(`/api/users/${comment.author}`); // Your Django endpoint to fetch users
          console.log("User : ",response.data)
          setauthor(response.data);
          } catch (error) {
            console.error('Failed to fetch users', error);
          }
        };
    
        fetchUser();
    
      }, []);
  const handleReportComment = async (comment) => {
    handleClose();
    const reportData = {
      comment: comment.id, // Replace postId with the actual identifier of the post being reported
      reason: reason,
      reporter:userData.pk,
    };
  
    try {
      await userService.post('/api/reportanswers/',reportData);
      // Update UI or state to show the comment has been reported
    } catch (error) {
      console.error('Error reporting comment:', error);
    }
  };

  const handleSave = async (comment,newContent) => {
    try {

      await userService.put(`/api/answersposts/${comment.id}/`, {        
        text: editedText,
        author:userData.pk,
        post:post.id,});
      // Update UI or state to reflect the edited comment
    } catch (error) {
      console.error('Error editing comment:', error);
    }
    setIsEditing(false);
  };

  const handleDeleteComment = async (comment) => {
    handleClose();
    if (window.confirm('Are you sure you want to delete this post?')) {
    try {
      await userService.delete(`api/answersposts/${comment.id}`);
      props.commentfunc(props.post.id);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
}
  };

  const handleReplyComment = async (comment,replyContent) => {
    try {
      await userService.post(`api/answersposts/${comment.id}/reply`, { content: replyContent });
    } catch (error) {
      console.error('Error replying to comment:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    handleClose();
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };
  const [upvotedComments, setUpvotedComments] = useState(new Set());

  const handleUpvoteComment = (comment,comment_id) => {
    if (comment.is_upvoted.includes(userData.pk)) {
      userService.post(`api/downvotecomment/`, { user: userData.pk,comment:comment_id });
      props.commentfunc(props.post.id);
      props.commentfunc(props.post.id);
      props.commentfunc(props.post.id);
  
    } else {
      userService.post(`api/upvotecomment/`, { user: userData.pk,comment:comment_id });

      props.commentfunc(props.post.id);
      props.commentfunc(props.post.id);
      props.commentfunc(props.post.id);

    }
  };
  return (
    <>
    <br/>
            <div style={{marginLeft:"20%"}}>
          <div style={{ display: 'flex', alignItems: 'center'}}>
                <div style={{ marginRight: '15px' }}>
              <Card.Img
                variant="top"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYPxHTOtUvx8GB1mR1XfLov8CmiqxxDBW1d8p78A6Hg&s"
                style={{
                  borderRadius: '50%',
                  width: '30px', 
                  height: '30px', 
                  objectFit: 'cover', 
                }}
              />
            </div>
            <div>
            <Card.Title>{author.name}</Card.Title>
            
    
            </div>
            <div style={{marginLeft:'70%'}}>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        <MenuItem key="Edit"  onClick={() => handleEdit(comment.id)}>
          Edit
        </MenuItem>
        <MenuItem key="Delete" onClick={() => handleDeleteComment(comment)}>
          DeleteW
        </MenuItem>
        <MenuItem key="Report" onClick={handleModalOpen}>
          Report
        </MenuItem>
      </Menu>
    </div>
            </div>
            <div>

            <Card.Text>{comment.text}</Card.Text>
            </div>
            <div>
            {isEditing === comment.id ? (
            <>
              <textarea
                value={ editedText}
                onChange={(e) => setEditedText(e.target.value)}
              />
              <Button onClick={() => handleSave(comment,"hehe")}>Save</Button>
            </>
          ) : (
            <>
            
                
             
              <Button onClick={() => handleUpvoteComment(comment,comment.id)} style={{background:'none'}}>
                
            
              {comment.is_upvoted.includes(userData.pk)  ? <i className="fas fa-thumbs-up" style={{ color: 'green' }}></i> : <i className="far fa-thumbs-up " style={{ color: 'grey' }}></i>}
              <div style={{color:'black'}}>{comment.is_upvoted.length}</div>
            </Button>

            </>
          )}


            </div>
            </div>
      
          
            <Modal show={showModal} onHide={handleModalClose}>
      <Modal.Header closeButton>
          <Modal.Title>Report Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Reason for report</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reason}
              onChange={handleReasonChange}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button> */}
          <Button variant="primary" onClick={() =>handleReportComment(comment)}>
            Submit Report
          </Button>
        </Modal.Footer>
      </Modal>          
          
          </>
  );
};

export default Comments;