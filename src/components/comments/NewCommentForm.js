import { useRef } from 'react';

import classes from './NewCommentForm.module.css';

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const submitFormHandler = (event) => {
    event.preventDefault();
    const commentData = commentTextRef.current.value.trim();
    if (commentData === '') return;
    // optional: Could validate here
    props.onAddComment({quoteId: props.quoteId,  commentData})
    commentTextRef.current.value='';
    // send comment to server
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor='comment'>Your Comment</label>
        <textarea id='comment' rows='5' ref={commentTextRef}></textarea>
      </div>
      <div className={classes.actions}>
        <button className='btn'>Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
