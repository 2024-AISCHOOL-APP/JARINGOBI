import { memo, useEffect, useState } from 'react';
import { useAuth } from '../context/AuthProvider';

import './BoardStyle.css';
// import axios from 'axios';
// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Table from 'react-bootstrap/Table'; // 게시판 목록 기능
// import Pagination from 'react-js-pagination'; // 페이징 버튼 기능
// import 'bootstrap/dist/css/bootstrap.min.css'; // 부트스트랩 기능
// import { Modal } from 'react-bootstrap'; // 모달 팝업 기능
// import WritePostModal from './WritePostModal'; // WritePost 모달 컴포넌트 import
// import ViewPostModal from './ViewPostModal'; // ViewPost 모달 컴포넌트 import
// import EditPostModal from './EditPostModal'; // EditPost 모달 컴포넌트 import

// function Board() {
//   const [postList, setPostList] = useState([]); // 서버에서 받아올 게시글 데이터
//   const [displayedPosts, setDisplayedPosts] = useState([]); // 게시판 목록에 보여줄 게시글
//   const [page, setPage] = useState(1); // 현재 페이지
//   const itemsPerPage = 8; // 한 페이지 당 8개 게시글 표시 제한

//   const [showModal, setShowModal] = useState(false); // 글쓰기 모달 상태
//   const [postIdForView, setPostIdForView] = useState(null); // 게시글 보기 모달 상태 및 ID
//   const [postIdForEdit, setPostIdForEdit] = useState(null); // 게시글 수정 모달 상태 및 ID

//   const paging = (pageNumber) => {
//     // 페이지 이동
//     setPage(pageNumber);
//   };

//   const getPostList = async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/community');
//       const data = response.data; // 서버가 변환한 데이터 가져오기
//       setPostList(data); // 역순 정렬된 데이터를 postList 변수에 저장
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     getPostList(); // 처음 랜더링 때 getPostLIst 호출해 데이터 가져옴
//   }, []);

//   useEffect(() => {
//     if (Array.isArray(postList)) {
//       setDisplayedPosts(postList.slice((page - 1) * itemsPerPage, page * itemsPerPage)); // 페이지 변경 시 갱신
//     } else {
//       setDisplayedPosts([]);
//     }
//   }, [postList, page]); // postList, page 변경될 때마다 displayPosts 업데이트

//   // 글쓰기, 글보기, 글수정 모달 관리
//   const handleOpenWriteModal = () => setShowModal(true);
//   const handleCloseWriteModal = () => setShowModal(false);

//   const handleOpenViewModal = (postId) => {
//     setPostIdForView(postId);
//     setPostIdForEdit(null); // 글수정 모달 상태 초기화
//   };

//   const handleCloseViewModal = () => setPostIdForView(null);

//   const handleOpenEditModal = (postId) => {
//     setPostIdForEdit(postId);
//     setPostIdForView(null); // 글보기 모달 상태 초기화
//   };
//   const handleCloseEditModal = () => setPostIdForEdit(null);

//   return (
//     <div className='BoardContainer'>
//       <div className='communityTitle'>커뮤니티</div>
//       <Table className='table' striped bordered hover>
//         <thead>
//           <tr>
//             <th>번호</th>
//             <th>태그</th>
//             <th style={{ width: '55%' }}>제목</th>
//             <th>작성자</th>
//             <th>작성일</th>
//           </tr>
//         </thead>
//         <tbody>
//           {displayedPosts && displayedPosts.length > 0 ? (
//             displayedPosts.map((post) => (
//               <tr key={post.id}>
//                 <td>{post.id.toString().padStart(4, '0')}</td>
//                 <td>{post.tag}</td>
//                 <td onClick={() => handleOpenViewModal(post.id)}>{post.title}</td>
//                 <td>{post.nickname}</td>
//                 <td>{post.createdAt}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan='6' className='text-center'>
//                 게시글이 없습니다.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </Table>
//       <div className='bottomSection'>
//         <Button className='writeButton' onClick={handleOpenWriteModal}>
//           글쓰기
//         </Button>
//         <div className='paginationContainer'>
//           <Pagination
//             activePage={page}
//             itemsCountPerPage={itemsPerPage}
//             totalItemsCount={postList.length || 0}
//             pageRangeDisplayed={5}
//             prevPageText={'‹'}
//             nextPageText={'›'}
//             onChange={paging}
//           />
//         </div>
//       </div>

//       <Modal // 게시글 입력 모달
//         show={showModal}
//         onHide={handleCloseWriteModal}
//         size='lg' // Bootstrap 사이즈 옵션 사용
//         className='custom-modal' // 커스텀 CSS 클래스 추가
//       >
//         <Modal.Header closeButton>
//           <Modal.Title>글쓰기</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <WritePostModal handleCloseModal={handleCloseWriteModal} />
//         </Modal.Body>
//       </Modal>

//       {postIdForView !== null && (
//         <Modal // 게시글 보기 모달
//           show={postIdForView !== null}
//           onHide={handleCloseViewModal}
//           size='lg' // Bootstrap 사이즈 옵션 사용
//           className='custom-modal' // 커스텀 CSS 클래스 추가
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>게시글</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <ViewPostModal postId={postIdForView} handleCloseModal={handleCloseViewModal} handelOpenEditModal={handleOpenEditModal} />
//           </Modal.Body>
//         </Modal>
//       )}

//       {postIdForEdit !== null && (
//         <Modal // 게시물 수정 모달
//           show={postIdForEdit !== null}
//           onHide={handleCloseEditModal}
//           size='lg' // Bootstrap 사이즈 옵션 사용
//           className='custom-modal' // 커스텀 CSS 클래스 추가
//         >
//           <Modal.Header closeButton>
//             <Modal.Title>게시글 수정</Modal.Title>
//           </Modal.Header>
//           <Modal.Body>
//             <EditPostModal postId={postIdForEdit} handleCloseModal={handleCloseEditModal} />
//           </Modal.Body>
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default Board;

const Board = memo(({ postService, userId }) => {
  const [posts, setPosts] = useState([]);
  const { user } = useAuth();

  console.log(user);

  useEffect(() => {
    postService
      .getPosts(userId)
      .then((posts) => {
        console.log(posts);
        setPosts([...posts]);
      })
      .catch(() => console.log('getPosts Error'));
  }, [postService, user, userId]);

  console.log(posts);

  return (
    <div className='board-container'>
      <p className='title'>커뮤니티</p>
      <ul>
        {posts.map((post) => (
          <>
            <li key={post.id}>
              제목 : {post.title} <br />
              태그 : {post.tag}
              <br />
              내용 : {post.text}
              <br />
              작성날짜 : {post.createdAt}
              <br />
              작성자 닉네임 : {post.nickname}
              <br />
              작성자 아이디 : {post.userId}
            </li>
            <hr />
          </>
        ))}
      </ul>
    </div>
  );
});

export default Board;
