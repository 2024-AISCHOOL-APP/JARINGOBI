// EditPostModal.js
import './WritePostStyle.css'; // 커스텀 스타일

import axios from 'axios';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS
import { Card, Form, Spinner } from 'react-bootstrap'; // 부트스트랩 컴포넌트
import Swal from 'sweetalert2'; // SweetAlert2로 더 나은 알림 제공


function EditPostModal({ postId, handleCloseModal }) {
  const [topic, setTopic] = useState(''); // 수정할 제목 상태
  const [section, setSection] = useState(''); // 수정할 본문 상태
  const [inputSubject, setInputSubject] = useState(''); // 태그 분류 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태 (Spinner)
  const [tagged, setTagged] = useState(false); // 태그 완료 여부 상태
  const [showTagButton, setShowTagButton] = useState(false); // 태그 버튼 가시성 상태

  const titleRef = useRef(); // 제목 입력 참조
  const contentRef = useRef(); // 본문 입력 참조

  const handleClear = () => {
    if (titleRef.current) titleRef.current.value = ''; // 제목 초기화
    if (contentRef.current) contentRef.current.value = ''; // 본문 초기화
    setSection('');
    setInputSubject('');
    setShowTagButton(false);
    setTagged(false);
  };

  const savePost = async () => {
    // 제목이 비어있을 경우 경고 메시지 출력
    if (topic.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '제목을 작성해 주세요.',
      });
      return;
    }

    // 본문이 비어있을 경우 경고 메시지 출력
    if (section.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '본문을 작성해 주세요.',
      });
      return;
    }

    // 태그가 완료되지 않았을 경우 알림
    if (!tagged) {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '태그분류 버튼을 눌러주세요.',
      });
      return;
    }

    try { // 서버로 수정한 게시글 전송해 갱신하기, 임시 테스트용 tag 및 userId 할당 
      await axios.put(`http://localhost:8000/community/${postId}`, {
        title: titleRef.current.value,
        text: contentRef.current.value,
        tag : 2,
        userId : 100
      });

      Swal.fire({
        icon: 'success',
        title: '성공',
        text: '게시글이 수정되었습니다.',
      });

      handleCloseModal(); // 수정 후 모달 닫기
    } catch (error) {
      console.error('게시글 수정 오류:', error);
      Swal.fire({
        icon: 'error',
        title: '오류',
        text: '게시글 수정 중 오류가 발생했습니다.',
      });
    }
  };

  const tagClassification = async (e) => {
    e.preventDefault();
    setInputSubject('');
    setLoading(true);

    const formData = {
      topic: topic,
      section: section,
    };

    try {
      const response = await fetch('http://127.0.0.1:5000/receive_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setInputSubject(data.subject);
      setTagged(true);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: '오류',
        text: '서버와의 연결에 문제가 발생했습니다. 다시 시도해 주세요.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleContentChange = (e) => {
    const content = e.target.value;
    setSection(content);
    setShowTagButton(content.length > 0);
    setTagged(false);
    setInputSubject('');
  };

  return (
    <div className="write-post-container">
      <Card className="p-4 shadow-sm">
        <Form>
          <Form.Group controlId="formTitle" className="mb-4">
            <Form.Label className="form-label">제목</Form.Label>
            <Form.Control
              type="text"
              ref={titleRef}
              placeholder="제목 입력"
              onChange={(e) => setTopic(e.target.value)}
              className="titleInput"
            />
          </Form.Group>
          <Form.Group controlId="formContent" className="mb-4">
            <div className="d-flex align-items-center mb-2">
              <Form.Label className="me-2 form-label">본문</Form.Label>
              {showTagButton && !inputSubject && (
                <div className="d-flex align-items-center">
                  <Button
                    onClick={tagClassification}
                    className="tagButton"
                    variant="outline-secondary"
                    style={{
                      width: '100px',
                      height: '35px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginLeft: '10px',
                    }}
                  >
                    태그분류
                  </Button>
                  <div className="ms-3 d-flex align-items-center">
                    {loading && (
                      <Spinner animation="border" role="status" className="me-2">
                        <span className="visually-hidden">Loading...</span>
                      </Spinner>
                    )}
                  </div>
                </div>
              )}
              {!loading && inputSubject && (
                <div className="ms-3">
                  <h5 className="me-2">{inputSubject}</h5> {/* 태그 결과 표시 */}
                </div>
              )}
            </div>
            <Form.Control
              as="textarea"
              rows={10}
              ref={contentRef}
              placeholder="본문 입력"
              onChange={handleContentChange}
              className="contentInput"
            />
          </Form.Group>
          <div className="d-flex justify-content-end align-items-center">
            <Button
              onClick={handleCloseModal}
              className="removeButton me-2"
              variant="outline-secondary"
            >
              취소
            </Button>
            <Button
              onClick={handleClear}
              className="resetButton me-2"
              variant="outline-danger"
            >
              초기화
            </Button>
            <Button
              onClick={savePost}
              className="saveButton"
              variant="primary"
            >
              갱신
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default EditPostModal;