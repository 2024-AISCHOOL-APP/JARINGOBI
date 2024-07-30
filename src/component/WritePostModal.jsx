// 필요한 라이브러리 및 컴포넌트 가져오기
import './WritePostStyle.css'; // 커스텀 스타일

import axios from 'axios';
import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 CSS
import { Card, Form, Spinner } from 'react-bootstrap'; // 부트스트랩 컴포넌트
import Swal from 'sweetalert2'; // SweetAlert2로 더 나은 알림 제공


function WritePostModal({ handleCloseModal }) {
  const [topic, setTopic] = useState(''); // 제목 상태
  const [section, setSection] = useState(''); // 본문 상태
  const [inputSubject, setInputSubject] = useState(''); // 태그 분류 결과 상태
  const [loading, setLoading] = useState(false); // 로딩 상태 (Spinner)
  const [tagged, setTagged] = useState(false); // 태그 완료 여부 상태
  const [showTagButton, setShowTagButton] = useState(false); // 태그 버튼 가시성 상태

  // useRef를 사용하여 입력 및 텍스트 영역 요소에 접근
  const titleRef = useRef(); // 제목 입력 참조
  const contentRef = useRef(); // 본문 입력 참조
  const tagRef = useRef(); // 태그 입력 참조
  

  // 모든 필드를 초기화하고 상태를 리셋하는 함수
  const handleClear = () => {
    if (titleRef.current) {
      titleRef.current.value = ''; // 제목 초기화
    }
    if (contentRef.current) {
      contentRef.current.value = ''; // 본문 초기화
    }
    setSection(''); // 본문 상태 초기화
    setInputSubject(''); // 입력 주제 초기화
    setShowTagButton(false); // 태그 버튼 숨기기
    setTagged(false); // 태그 상태 초기화
  };

  // 게시글을 저장하는 함수
  const savePost = async () => {
    // 제목이 비어있을 경우 경고 메시지 출력
    if (topic.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '제목을 작성해 주세요.', // 제목이 비어있을 경우 메시지
      });
      return;
    }

    // 본문이 비어있을 경우 경고 메시지 출력
    if (section.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '본문을 작성해 주세요.', // 본문이 비어있을 경우 메시지
      });
      return;
    }

    // 태그가 완료되지 않았을 경우 알림
    if (!tagged) {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '태그분류 버튼을 눌러주세요.', // 태그 버튼을 먼저 눌러달라는 메시지
      });
      return;
    }

    // 실제 저장 로직 구현, 임시 테스트용 tag 및 userId 할당
    try {
          const response = await axios.post('http://localhost:8000/community', {
          title : titleRef.current.value,
          text : contentRef.current.value,
          tag : 1, 
          userId : 200
      });
          console.log('게시글이 저장 되었습니다:', response.data);
          handleCloseModal(); // 저장 후 모달 닫기
    } catch (error) {
          console.error('게시글 저장 오류:', error);
          alert('게시글 저장 과정에서 오류가 발생했습니다.');
      };
  };

  // 태그 분류를 수행하는 함수
  const tagClassification = async (e) => {
    e.preventDefault();
    setInputSubject(''); // 입력 주제 초기화
    setLoading(true); // 로딩 상태 활성화

    const formData = {
      topic: topic,
      section: section,
    };

    try {
      // 태그 분류 서버에 POST 요청
      const response = await fetch('http://127.0.0.1:5000/receive_post', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // 폼 데이터 전송
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json(); // 서버 응답 데이터
      console.log('Success:', data);

      // 서버에서 받은 subject 값을 inputSubject 상태로 설정
      setInputSubject(data.subject);
      setTagged(true); // 태그가 완료되면 저장 버튼 활성화
    } catch (error) {
      console.error('Error:', error);
      // 서버 오류 시 알림
      Swal.fire({
        icon: 'error',
        title: '오류',
        text: '서버와의 연결에 문제가 발생했습니다. 다시 시도해 주세요.', // 서버 문제로 인한 오류 메시지
      });
    } finally {
      setLoading(false); // 로딩 상태 해제
    }
  };

  // 본문 텍스트 영역의 변경을 처리하는 함수
  const handleContentChange = (e) => {
    const content = e.target.value;
    setSection(content); // 본문 상태 업데이트
    setShowTagButton(content.length > 0); // 본문에 내용이 있으면 태그 버튼 보이기
    setTagged(false); // 내용 변경 시 태그 상태 초기화
    setInputSubject(''); // 내용이 변경되면 태그 분류 결과 초기화
  };

  return (
    <div className="write-post-container">
      {/* 글쓰기 폼 */}
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
                  {/* 태그 버튼 */}
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
                  {/* 로딩 스피너 및 태그 결과 */}
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
                  <h5 className="me-2" ref={tagRef}>{inputSubject}</h5> {/* 태그 결과 표시 */}
                </div>
              )}
            </div>
            <Form.Control
              as="textarea"
              rows={10} // 텍스트 영역 높이 조절
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
              저장
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default WritePostModal;
