import './BoardStyle.css'; // 커뮤니티 스타일 설정

import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'; // 게시판 목록 기능
import { Link } from "react-router-dom"; // 게시글 입력/보기 이동
import Pagination from 'react-js-pagination'; // 페이징 버튼 기능
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 기능
import { Navbar, Nav, Container, Modal } from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능
import WritePostModal from './WritePostModal'; // WritePost 모달 컴포넌트 import
import ViewPostModal from './ViewpostModal';// ViewPost 모달 컴포넌트 import

function Board() {
    const [postList, setPostList] = useState([]); // 서버에서 받아올 게시글 데이터
    const [displayedPosts, setDisplayedPosts] = useState([]); // 게시판 목록에 보여줄 게시글

    const [page, setPage] = useState(1); // 현재 페이지
    const itemsPerPage = 8; // 한 페이지 당 8개 게시글 표시 제한

    const paging = (pageNumber) => {  // 페이지 이동
        setPage(pageNumber);
    };

    // 서버에서 게시글 데이터 받아와 테이블에 표시
    const getPostList = async () => {
        try {
            console.log('게시판 목록 요청 시작');
            const response = await axios.get('http://localhost:8000'); // API 엔드포인트 확인
        
            console.log('게시글 목록 응답 수신:', response.data);
            const data = response.data // 서버가 변환한 데이터 가져오기
        
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
        };
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


    // 글쓰기 모달 관리
    const [showModal, setShowModal] = useState(false);
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    // 게시글 보기 모달 관리
    const [showPostModal, setShowPostModal] = useState(false)
    const handleOpenPostModal = () => setShowPostModal(true);
    const handleClosePostModal = () => setShowPostModal(false);


    return (
        <div className="App">
            <Navbar className='Navbar'>
                <Container className='Container'>
                    <Navbar.Brand className='Navlogo' href="/">PennyWise</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="/Main"><img src='img/con0.png' alt="Link Icon" /></Nav.Link>
                            <Nav.Link href="#about"><img src='img/con3.png' alt='Link Icon' /></Nav.Link>
                            <Nav.Link href="/Community"><img src='img/con1.png' alt='Link Icon' /></Nav.Link>
                            <Nav.Link href="#about"><img src='img/con2.png' alt='Link Icon' /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container>
                <div className='communityTitle'>커뮤니티</div>
            </Container>
            <Container style={{ height: 'calc(100vh - 56px)', paddingLeft: '100px', paddingRight: '100px' }}>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>태그</th>
                                <th style={{ width: '60%' }}>제목</th>
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
                                        <td onClick={handleOpenPostModal}>{post.title}</td>
                                        <td>{post.id}</td>
                                        <td>{post.editDate}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">게시글이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button className='writeButton' onClick={handleOpenModal}>글쓰기</Button>
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={page} // 현재 페이지
                        itemsCountPerPage={itemsPerPage} // 한 페이지 및 보여줄 아이템 갯수
                        totalItemsCount={postList.length} // 총 아이템 수, 실제 서버 구동 시 postLIst 작성
                        pageRangeDisplayed={5} // paginator의 페이지 범위
                        prevPageText={"‹"} // "이전"을 나타낼 텍스트
                        nextPageText={"›"} // "다음"을 나타낼 텍스트
                        onChange={paging} // 페이지 변경을 핸들링하는 함수
                    />
                </div>
            </Container>

            <Modal  // 게시글 입력 모달
                    show={showModal} 
                    onHide={handleCloseModal} 
                    size="lg" // Bootstrap 사이즈 옵션 사용
                    className="custom-modal" // 커스텀 CSS 클래스 추가
                >
                <Modal.Header closeButton>
                    <Modal.Title>글쓰기</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <WritePostModal handleCloseModal={handleCloseModal} />
                </Modal.Body>
            </Modal>

            <Modal // 게시글 보기 모달
                    show={showPostModal} 
                    onHide={handleClosePostModal} 
                    size="lg" // Bootstrap 사이즈 옵션 사용
                    className="custom-modal" // 커스텀 CSS 클래스 추가
                >
                <Modal.Header closeButton>
                    <Modal.Title>게시글</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ViewPostModal handleCloseModal={handleClosePostModal} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Board;
