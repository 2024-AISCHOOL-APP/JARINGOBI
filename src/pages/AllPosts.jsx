import React from 'react';
import Board from '../component/Board';

const AllPosts = ({ postService }) => {
  return <Board postService={postService} />;
};

export default AllPosts;
