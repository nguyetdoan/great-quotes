import { useState, useEffect } from 'react';
import useHttp from '../../hooks/useHttp';
import { addComment, getAllComments } from '../../lib/api';
import classes from './Comments.module.css';
import NewCommentForm from './NewCommentForm';
import { useParams } from 'react-router';
import LoadingSpinner from '../UI/LoadingSpinner';
import CommentsList from './CommentsList';

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const {sendRequest: onAddComment, status: addingStatus} = useHttp(addComment);
  const {data: comments, sendRequest: getComments, status: getStatus} = useHttp(getAllComments);
  const {quoteId} = useParams();
  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };
  useEffect(() => {
    getComments(quoteId)
  }, [getComments, quoteId]);

  const addCommentHandler = async (requestData) => {
    await onAddComment(requestData);
    getComments(quoteId);
  }
 
  let commentsList;

  if (addingStatus === 'pending' || getStatus === 'pending') {
    commentsList = <div className='centered'>
      <LoadingSpinner />
    </div>
  }
  if (getStatus === 'completed' && comments) { 
    commentsList = <CommentsList comments={comments}/>
  }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
      {!isAddingComment && (
        <button className='btn' onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && <NewCommentForm onAddComment={addCommentHandler} quoteId={quoteId}/>}
      {commentsList}
    </section>
  );
};

export default Comments;
