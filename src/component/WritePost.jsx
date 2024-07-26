import './WritePostStyle.css'; // 글쓰기창 스타일 설정

import React, { useState, useEffect, useRef } from 'react';
import Button from 'react-bootstrap/Button';
import { Link, useNavigate } from "react-router-dom"; // 게시글 입력/보기 이동
import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 기능
import { Navbar, Nav, Container } from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능
import Spinner from 'react-bootstrap/Spinner';

function WritePost() {
    const Navigate = useNavigate();

    const [topic, setTopic] = useState("");
    const [section, setSection] = useState("");
    const [inputSubject, setInputSubject] = useState("");
    const [loading, setLoading] = useState(false); // 로딩 상태를 저장할 상태

    // 취소 버튼 클릭 시 커뮤니티 페이지로 이동
    const goBackCommunity = () => {
        Navigate('/Community');
    }

    // 초기화 버튼 클릭 시 input, textarea 지워짐
    // useRef로 input 및 textarea 태그에 접근
    const titletRef = useRef();
    const contentRef = useRef();
    // 초기화 버튼 클릭 시 초기화
    const handleCelar = () => {
        if (titletRef.current) { titletRef.current.value = '' };
        if (contentRef.current) { contentRef.current.value = '' };
    }

    // 저장 버튼 클릭 시 입력하 제목과 본문이 서버로 저장되고
    // 사용자는 커뮤니티로 이동하여 게시글 목록에 추가된 걸 확인 가능
    const savePost = () => {

    }

    const tagClassification = async (e) => {
        e.preventDefault();
        setInputSubject(""); // 입력 링크 초기화
        setLoading(true); // 폼 제출 시 로딩 상태를 true로 설정
        const formData = {
            topic: topic,
            section: section,
        };
        try {
            const response = await fetch("http://127.0.0.1:8000/receive_post", {
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
            console.log('Success:', data);

            // 서버에서 받은 subject 값을 setInputSubject 상태로 설정
            setInputSubject(data.subject);
        } catch (error) {
            console.error('Error:', error);
        } finally {
            setLoading(false); // 로딩 상태를 false로 설정하여 로딩 아이콘을 숨김
        }
    };

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
                <div className='writePageTitle'>글쓰기</div>
            </Container>
            <Container style={{ height: 'calc(100vh - 56px)', paddingLeft: '100px', paddingRight: '100px' }}>
                <div>
                    <input className='titleInput' ref={titletRef} placeholder='제목 입력' onChange={(e) => setTopic(e.target.value)} />
                </div>
                <br></br>
                <div>
                    <textarea className='contentInput' ref={contentRef} placeholder='본문 입력' onChange={(e) => setSection(e.target.value)} />
                </div>
                <div style={{ float: 'right' }}>
                    <h3>
                        {loading ? (
                            <Spinner animation="border" role="status" className="ml-3">
                                <span className="sr-only"></span>
                            </Spinner>
                        ) : null}
                    </h3>
                    {/* <Spinner animation="border" /> */}
                    <h3>{inputSubject}</h3>
                    <Button onClick={tagClassification} className='removeButton'>태그분류</Button>&ensp;
                    <Button onClick={goBackCommunity} className='removeButton'>취소</Button>&ensp;
                    <Button onClick={handleCelar} className='resetButton'>초기화</Button>&ensp;
                    <Button className='saveButton'>저장</Button>


                </div>


            </Container>
        </div>
    );
}

export default WritePost;
