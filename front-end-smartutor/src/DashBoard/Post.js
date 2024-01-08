// // RedditPost.js
// import React, { useState ,useEffect,useContext} from 'react';
// import { Card, Button, Collapse,Form, FormControl ,Modal,Alert} from 'react-bootstrap';
// import { UserContext } from '../landing_page_component/UserContext';
// import userService from '../landing_page_component/UserSerive';
// import  { useLocation } from 'react-router-dom';
// import { Editor } from '@tinymce/tinymce-react';
// import Comments from './Comments'
// // import { UserContext } from '../landing_page_component/UserContext';
// const RedditPost = () => {
//   const { userData } = useContext(UserContext);
//   const [editalert, setEditAlert] = useState({show: false, variant: '', message: ''});
//   const [reportalert, setReportAlert] = useState({show: false, variant: '', message: ''});
//   const [deletealert, setDeleteAlert] = useState({show: false, variant: '', message: ''});
//   const location = useLocation();
//   const [post, setposts] = useState([]);
//   var posts = location.state?.post;
 
//   // setposts(post)
//   const [comments, setComments] = useState([]);
//   const [showModaleditpost, setShowModaleditpost] = useState(false);
//   const [editingPost, setEditingPost] = useState('');
//   var [upvoted, setUpvoted] = useState(false);

//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await userService.get(`/api/queryposts/${posts.id}`); // Your Django endpoint to fetch users
//         setposts(response.data)
//       } catch (error) {
//         console.error('Failed to fetch users', error);
//       }
//     };

//     fetchPost();
//     const interval = setInterval(fetchPost, 500);
//     return () => clearInterval(interval);
//   }, []);
//   if (post.is_upvoted !=undefined){
//     for (let i = 0; i < post.is_upvoted.length; i++) {
//       if(userData.pk==post.is_upvoted[i]){
//         upvoted=true
//         // console.log("yup is like")
//       }
    
//     }
//   }


//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await userService.get(`/api/answersposts/?post_id=${posts.id}`); // Your Django endpoint to fetch users
        
//         console.log(response.data)
//         setComments(response.data);
//       } catch (error) {
//         console.error('Failed to fetch users', error);
//       }
//     };

//     fetchUsers();
//     const interval = setInterval(fetchUsers, 1000); // Fetch data every 5 seconds (adjust as needed)
  
//     // Cleanup function to clear the interval when component unmounts or when you don't need it anymore
//     return () => clearInterval(interval);
//   }, []);

// //  console.log(post.is_upvoted.length)
//   // console.log(userData)
//   const [commentsOpen, setCommentsOpen] = useState(false);

//   const handleToggleComments = () => {
//     setCommentsOpen(!commentsOpen);
//   };
//   const [commentsOpen1, setCommentsOpen1] = useState(false);
//   const [commentText, setCommentText] = useState('');
  
//   const handleToggleComments1 = () => {
//     setCommentsOpen1(!commentsOpen1);
//   };

//   const handleInputChange = (event) => {
//     setCommentText(event.target.value);
//   };
//   const [showModal, setShowModal] = useState(false);
//   const [reason, setReason] = useState('');

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleReasonChange = (e) => {
//     setReason(e.target.value);
//   };
//   const handleEditChange = (e) => {
//     setEditingPost(e.target.value);
//   };


//   const handleSubmitReportPost = () => {
//     // Perform actions with the report reason (e.g., send report to server)
//     console.log('Reported with reason:', reason);
//     const reportData = {
//       post: post.id, // Replace postId with the actual identifier of the post being reported
//       reason: reason,
//       reporter:userData.pk,
//     };
  
//     userService.post('/api/reportposts/', reportData)
//       .then(response => {
//         // Handle successful response, e.g., show a success message
//         console.log('Report submitted successfully:', response.data);
//         // Close the modal or perform any other necessary actions
//         handleCloseModal();
//         setReportAlert({show: true, variant: 'success', message: 'Post Reported successfully!'});
//       })
//       .catch(error => {
//         // Handle errors, e.g., show an error message
//         console.error('Error submitting report:', error);
//         setReportAlert({show: true, variant: 'danger', message: 'Error reporting post!'});
//         // Optionally, you might want to handle specific error cases here
//       });
//     handleCloseModal();
//   };
//   const handleSubmitComment = async () => {
    
//     try {
//       const response = await userService.post('/api/answersposts/', {
//         text: commentText,
//         author:userData.pk,
//         post:post.id,
//       });
//       // Handle success - maybe show a success message or redirect
//       console.log('Response:', response.data);
//     } catch (error) {
//       // Handle error - show error message or perform necessary actions
//       console.error('Error:', error);
//     }
//   };
//   const handleEdit = (postId) => {
//     // Logic for editing a post
//     // You can navigate to an edit page or open a modal, etc.
//     setShowModaleditpost(true);
//     console.log(`Editing post ${postId}`);
    
//   };

//   const handleDelete = (postId) => {
//     // Logic for deleting a post
//     userService.delete(`/api/queryposts/${post.id}`)
//       .then(response => {
//         // Remove the deleted post from the UI
//         // setPosts(posts.filter(post => post.id !== postId));
//         console.log(`Deleted post ${postId}`);
//         setDeleteAlert({show: true, variant: 'success', message: 'Post deleted successfully!'});
        
//       })
//       .catch(error => {
//         console.error(`Error deleting post ${postId}:`, error);
//         setDeleteAlert({show: true, variant: 'danger', message: 'Error deleteing post!'});
//       });
//   };
//   const handleCloseModaleditpost = () => {
//     setShowModaleditpost(false);
//     setEditingPost(null);
//   };
//   const [content, setContent] = useState('');
//   const handleSubmitEditPost= (updatedPostData) => {
//     // Send updated post data to the server
//     // Perform Axios request to update the post
//     // Close modal and update UI if successful
//     console.log('Updated post:', content);
//     userService.put(`/api/queryposts/${post.id}/`, { author:userData.pk,content:editingPost,title:editingPost }) // Replace `/api/posts/${postId}` with your API endpoint
//     .then(response => {
//       console.log('Post updated successfully:', response.data);
//       setposts(response.data)
      
//       console.log(post)
//       handleCloseModaleditpost(); // Close the modal or perform UI update
//       setEditAlert({show: true, variant: 'success', message: 'Post editted successfully!'});
//     })
//     .catch(error => {
//       console.error('Error updating post:', error);
//       setEditAlert({show: true, variant: 'danger', message: 'Error editing post!'});
//       // Handle error scenario here
//     });
//   };







//   const handleEditorChange = (content) => {
//     setContent(content);
//   };
//   // console.log(comments)


 

//   const handleUpvotePost = () => {
//     if (upvoted) {
//       userService.post(`api/downvotepost/`, { user: userData.pk,post:post.id });
//       // If already upvoted, allow the user to revoke the upvote
//       setUpvoted(false);
//     } else {
//       userService.post(`api/upvotepost/`, { user: userData.pk,post:post.id });
//       // Otherwise, upvote the comment
//       setUpvoted(true);
//     }
//   };

// // setEditingPost(post.content)
//   return (
//     <>
//       {editalert.show && <Alert 
//   variant={alert.variant} 
//   style={{
//     marginTop: '50px', 
//     position: 'fixed', 
//     zIndex: 9999, 
//     top: 0, 
//     right: 0, 
//     left: 0
//   }} 
//   onClose={() => setEditAlert({...alert, show: false})} 
//   dismissible
// >
//   {editalert.message}
// </Alert>}
// {reportalert.show && <Alert 
//   variant={alert.variant} 
//   style={{
//     marginTop: '50px', 
//     position: 'fixed', 
//     zIndex: 9999, 
//     top: 0, 
//     right: 0, 
//     left: 0
//   }} 
//   onClose={() => setReportAlert({...alert, show: false})} 
//   dismissible
// >
//   {reportalert.message}
// </Alert>}
// {deletealert.show && <Alert 
//   variant={alert.variant} 
//   style={{
//     marginTop: '50px', 
//     position: 'fixed', 
//     zIndex: 9999, 
//     top: 0, 
//     right: 0, 
//     left: 0
//   }} 
//   onClose={() => setDeleteAlert({...alert, show: false})} 
//   dismissible
// >
//   {deletealert.message}
// </Alert>}
//     <div>
//       <Card style={{marginTop:'10px'}}>
//         <Card.Body>
//           <div style={{ display: 'flex', alignItems: 'center' }}>
//         <div style={{ marginRight: '15px' }}>
//       <Card.Img
//         variant="top"
//         src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQYPxHTOtUvx8GB1mR1XfLov8CmiqxxDBW1d8p78A6Hg&s"
//         style={{
//           borderRadius: '50%', // Makes the image round
//           width: '50px', // Sets the width of the image
//           height: '50px', // Sets the height of the image
//           objectFit: 'cover', // Maintains the aspect ratio
//         }}
//       />
//     </div>
//     <div>
//       <div style={{display:'flex'}}>
//     <div dangerouslySetInnerHTML={{ __html: post.title }} />
//       {userData && userData.pk === post.author && (
//     <div style={{display:'flex', alignItems: 'center'}}>
//       <Button onClick={() => handleEdit(post.id)} style={{marginLeft:'3%', backgroundColor:'white', borderColor:'white', height: '40px', width: '40px' }} title="Edit Post"><i style={{color:'black'}} className="fas fa-edit"></i></Button>
//       <Button onClick={() => handleDelete(post.id)} style={{marginLeft:'3%', backgroundColor:'white', borderColor:'white', height: '40px', width: '40px' }} title="Delete Post"><i style={{color:'red'}} className="fas fa-trash"></i></Button>
//     </div>
  
//   )}
//     </div>
//     </div>
//     </div>
//     <div dangerouslySetInnerHTML={{ __html: post.content }} />
//           <div style={{display:'flex', alignItems: 'center'}}>
//   <Button onClick={handleUpvotePost} class='' style={{ background: 'none', borderColor:'white', color: upvoted ? 'green' : 'black', height: '40px', width: '40px' }} title="Upvote Post">
//     {upvoted ? <i className="fas fa-thumbs-up"></i> : <i className="far fa-thumbs-up"></i>}
//     {post.is_upvoted && <div>{post.is_upvoted.length}</div>}
//   </Button>
//   <Button onClick={handleToggleComments} variant="primary" style={{marginLeft:'3%', background:'None', borderColor:'white', color:'black', height: '40px', width: '40px' }} title="Toggle Comments">
//     {commentsOpen ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
//   </Button>
//   <Button onClick={handleToggleComments1} variant="" style={{marginLeft:'3%', backgroundColor:'white', borderColor:'white', height: '40px', width: '40px' }} title="Toggle Comments">
//     {commentsOpen1 ? <i className="fas fa-comment-slash"></i> : <i className="fas fa-comment-dots"></i>}
//   </Button>
//   <Button onClick={handleShowModal} className="report-button" style={{marginLeft:'3%', backgroundColor:'white', borderColor:'white', color:'black', height: '40px', width: '40px' }} title="Report Post">
//     <i className="fas fa-flag"></i>
//   </Button>

// <Modal show={showModaleditpost} onHide={handleCloseModaleditpost}>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Post</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             {/* <Editor
//       apiKey='yqg8haven6yfg0wzb148c117srzd67tdpsft2yrk3rt8x6pw'
//       init={{
//         plugins: 'ai tinycomments mentions anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed permanentpen footnotes advtemplate advtable advcode editimage tableofcontents mergetags powerpaste tinymcespellchecker autocorrect a11ychecker typography inlinecss',
//         toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | align lineheight | tinycomments | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
//         tinycomments_mode: 'embedded',
//         tinycomments_author: 'Author name',
//         mergetags_list: [
//           { value: 'First.Name', title: 'First Name' },
//           { value: 'Email', title: 'Email' },
//         ],
//         ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
//       }}
//       initialValue={post.content}
//       onEditorChange={handleEditorChange}
//     /> */}
       
//             {/* <Form.Label>Reason for report</Form.Label> */}
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={editingPost}
//               defaultValue={post.content}
//               onChange={handleEditChange}
//             />
//           </Form.Group>
       
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModaleditpost}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSubmitEditPost}>
//             Update Post
//           </Button>
//         </Modal.Footer>
//       </Modal>




//     <div/>
//       <Modal show={showModal} onHide={handleCloseModal}>
//         <Modal.Header closeButton>
//           <Modal.Title>Report Post</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Reason for report</Form.Label>
//             <Form.Control
//               as="textarea"
//               rows={3}
//               value={reason}
//               onChange={handleReasonChange}
//             />
//           </Form.Group>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleSubmitReportPost}>
//             Submit Report
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </div>



//       {commentsOpen1  && (
//         <div>
//           <br/>
//           <Form>
//             <FormControl
//               type="text"
//               placeholder="Write your comment here..."
//               value={commentText}
//               onChange={handleInputChange}
//             />
//             <Button onClick={handleSubmitComment}>Submit</Button>
//           </Form>
//         </div>
//       )}
   
//         </Card.Body>
//       </Card>

//       <Collapse in={commentsOpen}>
//         <div>
//           <Comments post={post} comment={comments}/>
       
    
//           </div>
     
        
//       </Collapse>




//     </div>
//   </>
//   );
// };

// export default RedditPost;
