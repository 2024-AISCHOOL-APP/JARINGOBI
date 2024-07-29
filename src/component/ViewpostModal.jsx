// 필요한 라이브러리 및 컴포넌트 가져오기
import './WritePostStyle.css'; // 커스텀 스타일

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS
import { Card, Form } from 'react-bootstrap'; // 부트스트랩 컴포넌트
import Swal from 'sweetalert2'; // SweetAlert2로 더 나은 알림 제공

import EditPostModal from './EditPostModal'; // EditPostModal 게시글 수정 컴포넌트 import

function ViewPostModal({ handleCloseModal }) { 
    // postId : 현재 모달에서 보여주는 게시글 ID
    // currentUserId : 현재 로그인한 사용자 ID, 사용자 ID로 삭제 및 수정 권한 확인

    const [post, setPost] = useState([]); // 서버로부터 게시글 정보 받기
    const [showEditModal, setShowEditModal] = useState(false); // 수정 모달 상태

    // 서버로부터 게시글 받아오기
    useEffect(() => {
        const getPost = async () => {
            try {
                console.log('게시판 목록 요청 시작');
                const response1 = await axios.get(`http://localhost:8000/${post.id}`); // API 엔드포인트 확인

                console.log('게시글 목록 응답 수신:', response1.data);
                setPost(response1.data); // 서버가 변환한 데이터를 post 변수에 저장

            } catch (error) {
                console.error('게시글 세부내용 요청 오류:', error);
                alert('게시글 세부 내용을 불러오는 과정에서 오류가 발생하였습니다.');
            }
        };
            getPost();
    }, [post]);


  // 게시글을 삭제하는 함수
  const deletePost = async () => {

    // 게시글을 쓴 사용자 본인이 아닐 경우 경고
    if (post.userId !== null) {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '작성자 본인만 삭제 가능합니다.'
      });
      return;
    }

    // 실제 삭제 로직 구현
    try {
        const response2 = await axios.delete(`http://localhost:8000/${post.id}`);
        console.log('게시글 삭제:', response2.data);
        handleCloseModal();
    } catch (error) {
        console.log('삭제 오류 발생:', error);
        alert('게시글 삭제 과정에서 오류가 발생했습니다.');
    };

  };

  // 게시글을 수정하는 함수
  const reWritePost = () => {

    // 게시글을 쓴 사용자 본인이 아닐 경우 경고
    if (post.userId !== null) {
        Swal.fire({
          icon: 'warning',
          title: '경고',
          text: '작성자 본인만 수정 가능합니다.', // 본문이 비어있을 경우 메시지
        });
        return;
      }


    // 수정 버튼 클릭 시 수정 모달 창 열림
      handleCloseModal()
      setShowEditModal(true);
  };

    // useEffect(() => {
    //     return () => {
    //       setPost(null); // 모달이 닫힐 때 상태 초기화
    //     };
    //   }, []);


  return (
    <div className="write-post-container">
      {/* 글쓰기 폼 */}
      <Card className="p-4 shadow-sm">
        <Form>
          {post && (
            <>
              <Form.Label className="form-label">
                    <small>작성자: {post.userId} &nbsp; 작성일: {post.editDate}</small>
              </Form.Label>
              <Form.Group controlId="formTitle" className="mb-4">
                  <div className="post-title">{post.title}</div>
              </Form.Group>
              <Form.Group controlId="formContent" className="mb-4">
                  <div className="post-content">{post.text}</div>
              </Form.Group>
              <div className="d-flex justify-content-end align-items-center">
                <Button
                  onClick={deletePost}
                  className="deleteButton"
                  variant="outline-danger"
                >
                  삭제
                </Button>

                <Button
                  onClick={reWritePost}
                  className="reWriteButton"
                  variant="primary"
                >
                  수정
                </Button>
              </div>
            </>
          )}
        </Form>
      </Card>
      {showEditModal && post && ( // 게시글 수정 모달 열기
          <EditPostModal
            handleCloseModal={() => setShowEditModal(false)}
            postData={post}
          />
      )}
    </div>

  );
}

export default ViewPostModal;
