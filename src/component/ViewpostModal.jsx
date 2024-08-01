import './ViewPostStyle.css';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Form } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useAuth } from '../context/AuthProvider';

function ViewPostModal({ postId, handleCloseModal, handleOpenEditModal, postService, handlePostDeleted }) {
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    postService.getPostById(postId).then((post) => {
      setPost(post);
    });
  }, [postId, postService]);

  const deletePost = async () => {
    try {
      await postService.deletePost(postId);
      Swal.fire('게시글 삭제 완료');
      handlePostDeleted(postId);
      handleCloseModal();
    } catch (error) {
      console.error('게시글 삭제 오류:', error);
      Swal.fire('게시글 삭제 중 오류가 발생했습니다.');
    }
  };

  const editPost = () => {
    handleCloseModal();
    handleOpenEditModal(postId);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  const canEditOrDelete = post && user.id === post.userId;

  const handleLike = async () => {
    try {
      setLiked(true);
    } catch (error) {
      console.error('좋아요 오류:', error);
      Swal.fire('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className='write-post-container'>
      <Card className='p-4 shadow-sm'>
        <Form>
          {post && (
            <>
              <Form.Label className='form-label'>
                <small>
                  작성자: {post.nickname} &nbsp; 작성일: {formatDate(post.createdAt)}
                </small>
              </Form.Label>
              <Form.Group controlId='formTitle' className='mb-4'>
                <div className='view-title'>{post.title}</div>
              </Form.Group>
              <Form.Group controlId='formContent' className='mb-4'>
                <div className='post-content'>{post.text}</div>
              </Form.Group>
              {canEditOrDelete && (
                <div className='d-flex justify-content-end align-items-center'>
                  <Button onClick={handleLike} className={`likeButton ${liked ? 'liked' : ''}`}>
                    {liked ? '좋아요 취소' : '♥️'}
                  </Button>
                  <Button onClick={deletePost} className='deleteButton' variant='outline-danger'>
                    삭제
                  </Button>
                  &ensp;
                  <Button onClick={editPost} className='reWriteButton' variant='primary'>
                    수정
                  </Button>
                </div>
              )}
            </>
          )}
        </Form>
      </Card>
    </div>
  );
}

export default ViewPostModal;
