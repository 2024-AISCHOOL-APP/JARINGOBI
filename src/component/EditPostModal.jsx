import './WritePostStyle.css';
import React, { useState, useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Card, Form, Spinner } from 'react-bootstrap';
import Swal from 'sweetalert2';

function EditPostModal({ postId, handleCloseModal, postService, onPostSaved }) {
  const [topic, setTopic] = useState('');
  const [section, setSection] = useState('');
  const [inputSubject, setInputSubject] = useState('');
  const [loading, setLoading] = useState(false);
  const [tagged, setTagged] = useState(false);
  const [showTagButton, setShowTagButton] = useState(false);

  const titleRef = useRef();
  const contentRef = useRef();

  useEffect(() => {
    const getPost = async () => {
      try {
        postService.getPostById(postId).then((post) => {
          setTopic(post.title);
          setSection(post.text);
        });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '오류',
          text: '게시글 세부 내용을 불러오는 과정에서 오류가 발생하였습니다.',
        });
      }
    };
    getPost();
  }, [postId, postService]);

  const handleClear = () => {
    setTopic('');
    setSection('');
    setInputSubject('');
    setShowTagButton(false);
    setTagged(false);
  };

  const savePost = async () => {
    if (topic.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '제목을 작성해 주세요.',
      });
      return;
    }

    if (section.trim() === '') {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '본문을 작성해 주세요.',
      });
      return;
    }

    if (!tagged) {
      Swal.fire({
        icon: 'warning',
        title: '경고',
        text: '태그분류 버튼을 눌러주세요.',
      });
      return;
    }
    try {
      let subject;
      switch (inputSubject) {
        case '광고':
          subject = 1;
          break;
        case '부정':
          subject = 2;
          break;
        case '소비':
          subject = 3;
          break;
        case '저축':
          subject = 4;
          break;
        case '수입':
          subject = 5;
          break;
        case '기타':
          subject = 6;
          break;
        default:
      }
      postService.updatePost(postId, section, topic, subject);
      Swal.fire({
        icon: 'success',
        title: '성공',
        text: '게시글이 수정되었습니다.',
      });
      onPostSaved();

      handleCloseModal();
    } catch (error) {
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
      topic,
      section,
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
    <div className='write-post-container'>
      <Card className='p-4 shadow-sm'>
        <Form>
          <Form.Group controlId='formTitle' className='mb-4'>
            <Form.Label className='form-label'>제목</Form.Label>
            <Form.Control
              type='text'
              ref={titleRef}
              placeholder='제목 입력'
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className='titleInput'
            />
          </Form.Group>
          <Form.Group controlId='formContent' className='mb-4'>
            <div className='d-flex align-items-center mb-2'>
              <Form.Label className='me-2 form-label'>본문</Form.Label>
              {showTagButton && !inputSubject && (
                <div className='d-flex align-items-center'>
                  <Button
                    onClick={tagClassification}
                    className='tagButton'
                    variant='outline-secondary'
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
                  <div className='ms-3 d-flex align-items-center'>
                    {loading && (
                      <Spinner animation='border' role='status' className='me-2'>
                        <span className='visually-hidden'>Loading...</span>
                      </Spinner>
                    )}
                  </div>
                </div>
              )}
              {!loading && inputSubject && (
                <div className='ms-3'>
                  <h5 className='me-2'>{inputSubject}</h5>
                </div>
              )}
            </div>
            <Form.Control
              as='textarea'
              rows={10}
              ref={contentRef}
              placeholder='본문 입력'
              value={section}
              onChange={handleContentChange}
              className='contentInput'
            />
          </Form.Group>
          <div className='d-flex justify-content-end align-items-center'>
            <Button onClick={handleCloseModal} className='removeButton me-2' variant='outline-secondary'>
              취소
            </Button>
            <Button onClick={handleClear} className='resetButton me-2' variant='outline-danger'>
              초기화
            </Button>
            <Button onClick={savePost} className='saveButton' variant='primary'>
              갱신
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default EditPostModal;
