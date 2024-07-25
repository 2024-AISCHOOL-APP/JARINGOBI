import './BoardStyle.css'; // 캘린더 스타일 설정

import React, { useState, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table'; // 게시판 목록 기능
import Pagination from 'react-js-pagination'; // 페징 버튼 기능
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 기능
import { Navbar, Nav, Container} from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능


function Board() {

    const [page, setPage] = useState(1); // 현재 페이지
    const paging = () => {
        console.log("ddd");
                setPage(page);
    }
   
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
            <Container style={{height: 'calc(100vh - 56px)', paddingLeft: '100px', paddingRight: '100px'}}>
                <div>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>번호</th>
                            <th>구분</th>
                            <th style={{width: '60%'}}>제목</th>
                            <th>작성자</th>
                            <th>작성일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>0010</td>
                            <td>수입</td>
                            <td>게시글10</td>
                            <td>man</td>
                            <td>24.07.18</td>
                        </tr>
                        <tr>
                            <td>0009</td>
                            <td>수입</td>
                            <td>게시글9</td>
                            <td>man</td>
                            <td>24.07.17</td>
                        </tr>
                        <tr>
                            <td>0008</td>
                            <td>수입</td>
                            <td>게시글8</td>
                            <td>man</td>
                            <td>24.07.16</td>
                        </tr>
                        <tr>
                            <td>0007</td>
                            <td>수입</td>
                            <td>게시글7</td>
                            <td>man</td>
                            <td>24.07.15</td>
                        </tr>
                        <tr>
                            <td>0006</td>
                            <td>수입</td>
                            <td>게시글6</td>
                            <td>man</td>
                            <td>24.07.14</td>
                        </tr>
                        <tr>
                            <td>0005</td>
                            <td>수입</td>
                            <td>게시글5</td>
                            <td>man</td>
                            <td>24.07.13</td>
                        </tr>
                        <tr>
                            <td>0004</td>
                            <td>지출</td>
                            <td>게시글4</td>
                            <td>man</td>
                            <td>24.07.12</td>
                        </tr>
                        <tr>
                            <td>0003</td>
                            <td>일반</td>
                            <td>게시글3</td>
                            <td>man</td>
                            <td>24.07.11</td>
                        </tr>
                        <tr>
                            <td>0002</td>
                            <td>지출</td>
                            <td>게시글2</td>
                            <td>man</td>
                            <td>24.07.10</td>
                        </tr>
                        <tr>
                            <td>0001</td>
                            <td>수입</td>
                            <td>게시글1</td>
                            <td>man</td>
                            <td>24.07.03</td>
                        </tr>
                    </tbody>
                    <br></br>
                    <tfoot>
                        <Button className='writeButton'>글쓰기</Button>
                    </tfoot>
                </Table>
                </div>
                <div>
                    <Pagination
                        activePage={page} // 현재 페이지
                        itemsCountPerPage={5} // 한 페이지 및 보여줄 아이템 갯수
                        totalItemsCount={450} // 총 아이템 갯수
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

export default Board