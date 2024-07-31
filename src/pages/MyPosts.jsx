import React from 'react';
import { useParams } from 'react-router-dom';
import Board from '../component/Board';

const MyPosts = ({ postService }) => {
  const { userId } = useParams();
  return <Board postService={postService} userId={userId} />;
};

export default MyPosts;
