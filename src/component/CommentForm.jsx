import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

function CommentForm() {
  const [text, setText] = useState('');
  const { postId } = useParams(); // URL에서 postId를 가져옴

  const handleSubmit = async (event) => {
    event.preventDefault();

    // JWT 토큰 가져오기 (예시로 localStorage에서 가져옴)
    const token = localStorage.getItem('token');

    try {
      // 백엔드로 댓글 생성 요청 보내기
      const response = await fetch(`http://localhost:8000/community/${postId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // 토큰 헤더 추가
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const newComment = await response.json();
        console.log('새로운 댓글 추가:', newComment);
        setText(''); // 입력 필드 초기화
        alert('댓글이 성공적으로 추가되었습니다.');
      } else {
        console.error('Failed to add comment');
        alert('댓글 추가에 실패했습니다.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('서버와의 통신 중 오류가 발생했습니다.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="댓글을 입력하세요"
      />
      <button type="submit">댓글 작성</button>
    </form>
  );
}

export default CommentForm;
