import './BoardStyle.css'; // 캘린더 스타일 설정

import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'; // 게시판 목록 기능
import Pagination from 'react-js-pagination'; // 페이징 버튼 기능
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 기능
import { Navbar, Nav, Container } from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능

function Board() {
    const initialPosts = [
        { id: 40, title: '게시글10', author: 'man', date: '24.07.18' },
        { id: 39, title: '게시글9', author: 'man', date: '24.07.17' },
        { id: 38, title: '게시글8', author: 'man', date: '24.07.16' },
        { id: 37, title: '게시글7', author: 'man', date: '24.07.15' },
        { id: 36, title: '게시글6', author: 'man', date: '24.07.14' },
        { id: 35, title: '게시글5', author: 'man', date: '24.07.13' },
        { id: 34, title: '게시글4', author: 'man', date: '24.07.12' },
        { id: 33, title: '게시글3', author: 'man', date: '24.07.11' },
        { id: 32, title: '게시글2', author: 'man', date: '24.07.10' },
        { id: 31, title: '게시글1', author: 'man', date: '24.07.03' },
        { id: 30, title: '게시글10', author: 'man', date: '24.07.18' },
        { id: 29, title: '게시글9', author: 'man', date: '24.07.17' },
        { id: 28, title: '게시글8', author: 'man', date: '24.07.16' },
        { id: 27, title: '게시글7', author: 'man', date: '24.07.15' },
        { id: 26, title: '게시글6', author: 'man', date: '24.07.14' },
        { id: 25, title: '게시글5', author: 'man', date: '24.07.13' },
        { id: 24, title: '게시글4', author: 'man', date: '24.07.12' },
        { id: 23, title: '게시글3', author: 'man', date: '24.07.11' },
        { id: 22, title: '게시글2', author: 'man', date: '24.07.10' },
        { id: 21, title: '게시글1', author: 'man', date: '24.07.03' },
        { id: 20, title: '게시글10', author: 'man', date: '24.07.18' },
        { id: 19, title: '게시글9', author: 'man', date: '24.07.17' },
        { id: 18, title: '게시글8', author: 'man', date: '24.07.16' },
        { id: 17, title: '게시글7', author: 'man', date: '24.07.15' },
        { id: 16, title: '게시글6', author: 'man', date: '24.07.14' },
        { id: 15, title: '게시글5', author: 'man', date: '24.07.13' },
        { id: 14, title: '게시글4', author: 'man', date: '24.07.12' },
        { id: 13, title: '게시글3', author: 'man', date: '24.07.11' },
        { id: 12, title: '게시글2', author: 'man', date: '24.07.10' },
        { id: 11, title: '게시글1', author: 'man', date: '24.07.03' },
        { id: 10, title: '게시글10', author: 'man', date: '24.07.18' },
        { id: 9, title: '게시글9', author: 'man', date: '24.07.17' },
        { id: 8, title: '게시글8', author: 'man', date: '24.07.16' },
        { id: 7, title: '게시글7', author: 'man', date: '24.07.15' },
        { id: 6, title: '게시글6', author: 'man', date: '24.07.14' },
        { id: 5, title: '게시글5', author: 'man', date: '24.07.13' },
        { id: 4, title: '게시글4', author: 'man', date: '24.07.12' },
        { id: 3, title: '게시글3', author: 'man', date: '24.07.11' },
        { id: 2, title: '게시글2', author: 'man', date: '24.07.10' },
        { id: 1, title: '게시글1', author: 'man', date: '24.07.03' },
    ];

    const [posts, setPosts] = useState(initialPosts);
    const [page, setPage] = useState(1); // 현재 페이지
    const itemsPerPage = 8;

    const paging = (pageNumber) => {
        setPage(pageNumber);
    };

    const handleDelete = (id) => {
        setPosts(posts.filter(post => post.id !== id));
    };

    const displayedPosts = posts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

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
            <Container style={{ height: 'calc(100vh - 56px)', paddingLeft: '100px', paddingRight: '100px' }}>
                <div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>구분</th>
                                <th style={{ width: '60%' }}>제목</th>
                                <th>작성자</th>
                                <th>작성일</th>
                                <th>액션</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayedPosts.length > 0 ? (
                                displayedPosts.map(post => (
                                    <tr key={post.id}>
                                        <td>{post.id.toString().padStart(4, '0')}</td>
                                        <td>{post.category}</td>
                                        <td>{post.title}</td>
                                        <td>{post.author}</td>
                                        <td>{post.date}</td>
                                        <td>
                                            <Button variant="danger" onClick={() => handleDelete(post.id)}>삭제</Button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="6" className="text-center">게시글이 없습니다.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                    <Button className='writeButton'>글쓰기</Button>
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination
                        activePage={page} // 현재 페이지
                        itemsCountPerPage={itemsPerPage} // 한 페이지 및 보여줄 아이템 갯수
                        totalItemsCount={posts.length} // 총 아이템 갯수
                        pageRangeDisplayed={5} // paginator의 페이지 범위
                        prevPageText={"‹"} // "이전"을 나타낼 텍스트
                        nextPageText={"›"} // "다음"을 나타낼 텍스트
                        onChange={paging} // 페이지 변경을 핸들링하는 함수
                    />
                </div>
            </Container>
        </div>
    );
}

export default Board;
