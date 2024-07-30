import './BoardStyle.css'; // 커뮤니티 스타일 설정

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'; // 게시판 목록 기능
import Pagination from 'react-js-pagination'; // 페이징 버튼 기능
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 기능
import { Modal } from 'react-bootstrap'; // 모달 팝업 기능
import WritePostModal from './WritePostModal'; // WritePost 모달 컴포넌트 import
import ViewPostModal from './ViewPostModal'; // ViewPost 모달 컴포넌트 import
import EditPostModal from './EditPostModal'; // EditPost 모달 컴포넌트 import
// import HttpClient from '../network/http';

function Board() {

    // const baseURL = process.env.REACT_APP_BASE_URL; 
    // const httpClient = new HttpClient(baseURL); // Axios 외 서버 통신법
    
    const [postList, setPostList] = useState([]); // 서버에서 받아올 게시글 데이터
    const [displayedPosts, setDisplayedPosts] = useState([]); // 게시판 목록에 보여줄 게시글
    const [page, setPage] = useState(1); // 현재 페이지
    const itemsPerPage = 8; // 한 페이지 당 8개 게시글 표시 제한

    const [showModal, setShowModal] = useState(false); // 글쓰기 모달 상태
    const [postIdForView, setPostIdForView] = useState(null); // 게시글 보기 모달 상태 및 ID
    const [postIdForEdit, setPostIdForEdit] = useState(null); // 게시글 수정 모달 상태 및 ID

    const paging = (pageNumber) => {  // 페이지 이동
        setPage(pageNumber);
    };

    const getPostList = async () => {
        try {
            console.log('게시판 목록 요청 시작');
            const response = await axios.get('http://localhost:8000/community');
            // console.log('게시글 목록 응답 수신:', response.data);
            const data = response.data // 서버가 변환한 데이터 가져오기

            // const data = await httpClient.fetch('/community', { // http://localhost:8000 생략가능
            //     method: 'GET'
            // });

            console.log('게시글 목록 수신:', data);
            setPostList(data); // 역순 정렬된 데이터를 postList 변수에 저장
        
        } catch (error) {
            console.error('게시글 요청 에러:', error);
            if (error.response) {
                // 요청이 전송되었고, 서버는 200 외의 상태 코드로 응답했습니다.
                const Data = error.response.data;
                const statusCode = error.response.status; // code 400
                const statusText = error.response.statusText; // Bad Request
                const headers = error.response.headers;
                console.log(`게시글 요청 전송 오류: ${Data} - ${statusCode} - ${statusText} - ${headers}`);
        
            } else if (error.request) {
                // 요청이 전송되었지만, 응답이 수신되지 않았습니다. 
                // 'error.request'는 브라우저에선 XMLHtpRequest 인스턴스,
                // node.js에서는 http.ClientRequest 인스턴스로 log에 나타납니다.
                console.log('게시글 응답 수신 오류:', error.request);
        
            } else {
                // 오류가 발생한 요청을 설정하는 동안 문제가 발생했습니다.
                console.log('오류 요청 설정 중 문제발생:', error.message);
            }
        
            console.log('config 파일 오류:', error.config);
            alert('서버와의 연결에 에러가 발생했습니다!');
        }
    }

    useEffect(() => {
        getPostList(); // 처음 랜더링 때 getPostLIst 호출해 데이터 가져옴
    }, []);
    
    useEffect(() => {
        if (Array.isArray(postList)) {
            setDisplayedPosts(postList.slice((page - 1) * itemsPerPage, page * itemsPerPage)); // 페이지 변경 시 갱신
        } else {
            setDisplayedPosts([]);
        }
    }, [postList, page]); // postList, page 변경될 때마다 displayPosts 업데이트


    // 글쓰기, 글보기, 글수정 모달 관리
    const handleOpenWriteModal = () => setShowModal(true);
    const handleCloseWriteModal = () => setShowModal(false);

    const handleOpenViewModal = (postId) => {
        setPostIdForView(postId);
        setPostIdForEdit(null); // 글수정 모달 상태 초기화
    };

    const handleCloseViewModal = () => setPostIdForView(null);

    const handleOpenEditModal = (postId) => {
        setPostIdForEdit(postId);
        setPostIdForView(null); // 글보기 모달 상태 초기화
    };
    const handleCloseEditModal = () => setPostIdForEdit(null);


    return (
        <div className="BoardContainer">
            <div className='communityTitle'>커뮤니티</div>
            <Table className="table" striped bordered hover>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>태그</th>
                        <th style={{ width: '55%' }}>제목</th>
                        <th>작성자</th>
                        <th>작성일</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedPosts && displayedPosts.length > 0 ? (
                        displayedPosts.map(post => (
                            <tr key={post.id}>
                                <td>{post.id.toString().padStart(4, '0')}</td>
                                <td>{post.tag}</td>
                                <td onClick={() =>  handleOpenViewModal(post.id)}>{post.title}</td>
                                <td>{post.nickname}</td>
                                <td>{post.createdAt}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center">게시글이 없습니다.</td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <div className="bottomSection">
                <Button className='writeButton' onClick={handleOpenWriteModal}>글쓰기</Button>
                <div className="paginationContainer">
                    <Pagination
                        activePage={page}
                        itemsCountPerPage={itemsPerPage}
                        totalItemsCount={postList.length || 0}
                        pageRangeDisplayed={5}
                        prevPageText={"‹"}
                        nextPageText={"›"}
                        onChange={paging}
                    />
                </div>
            </div>

            <Modal  // 게시글 입력 모달
                    show={showModal} 
                    onHide={handleCloseWriteModal}
                    size="lg" // Bootstrap 사이즈 옵션 사용
                    className="custom-modal" // 커스텀 CSS 클래스 추가
                >
                <Modal.Header closeButton>
                    <Modal.Title>글쓰기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WritePostModal handleCloseModal={handleCloseWriteModal} />
                </Modal.Body>
            </Modal>

            {postIdForView !== null && <Modal // 게시글 보기 모달
                show={postIdForView !== null}
                onHide={handleCloseViewModal}  
                    size="lg" // Bootstrap 사이즈 옵션 사용
                    className="custom-modal" // 커스텀 CSS 클래스 추가
                >
                <Modal.Header closeButton>
                    <Modal.Title>게시글</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ViewPostModal 
                        postId={postIdForView} 
                        handleCloseModal={handleCloseViewModal}
                        handelOpenEditModal={handleOpenEditModal} 
                    />
                </Modal.Body>
            </Modal>}

            {postIdForEdit !== null && <Modal // 게시물 수정 모달
                show={postIdForEdit !== null}
                onHide={handleCloseEditModal} 
                size="lg" // Bootstrap 사이즈 옵션 사용
                className="custom-modal" // 커스텀 CSS 클래스 추가
            >
                <Modal.Header closeButton>
                    <Modal.Title>게시글 수정</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <EditPostModal 
                        postId={postIdForEdit} 
                        handleCloseModal={handleCloseEditModal} 
                    />
                </Modal.Body>
            </Modal>}
        </div>
    );
}

export default Board;
