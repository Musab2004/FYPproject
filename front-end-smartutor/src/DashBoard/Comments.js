// RedditPost.js
import React, { useState ,useEffect,useContext} from 'react';
import { Card, Button, Collapse,Form, FormControl ,Modal} from 'react-bootstrap';
import { UserContext } from '../landing_page_component/UserContext';
import userService from '../landing_page_component/UserSerive';
import  { useLocation } from 'react-router-dom';
import { Editor } from '@tinymce/tinymce-react';
import Comment from './Comment';



const Comments = (props) => {

  var post=props.post
  var comment=props.comment
  const [comments, setComments] = useState([]);
//   const fetchComments = async (postId) => {
//     try {
//       const response = await userService.get(`/api/answersposts/?post_id=${postId}`);
//       setComments(response.data);
//       // setIsLoading(false);
//       console.log("Comments called")
//     } catch (error) {
//       console.error('Failed to fetch comments', error);
//       // setIsLoading(false);
//     }
//   };
// // console.log(props.post.id)
// fetchComments(props.post.id); // Fetch comments when props.post changes
 
 
  return (
    <>
        {comment.map(comment => <>
          <Comment key={comment.id} comment={comment} post={post} commentfunc={props.commentfunc}/>
           
          </>)}

    </>
  );
};

export default Comments;
