import './CalendarStyle.css'; // 캘린더 스타일 설정

import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // 날짜칸 클릭 기능
import Button from 'react-bootstrap/Button';
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일

import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 기능
import { Modal, Navbar, Nav, Container } from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능

function MyCalendar() {
    const [modalOpen, setModalOpen] = useState(false); // 모달 state 변수
    const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜 state 변수
    const [events, setEvents] = useState([ // 이벤트 state 변수
        { title: 'event 1', date: '2024-07-15' },
        { title: 'event 2', date: '2024-07-25' }
    ]);

    const titleRef = useRef();
    const moneyRef = useRef();
    const memoRef = useRef();

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr); // 날짜 설정
        setModalOpen(true); // 모달창 열기
    };

    const handleCloseModal = () => {
        setModalOpen(false); // 모달창 닫기
    };

    const handleAppendEvent = () => {
        const newEvent = {
            title: titleRef.current.value,
            date: selectedDate,
            money: moneyRef.current.value,
            memo: memoRef.current.value,
        };

        // Validate if title and date are provided
        if (!newEvent.title || !newEvent.date) {
            alert("제목과 날짜는 필수 항목입니다.");
            return;
        }

        setEvents([...events, newEvent]);
        handleCloseModal();
    };

    return (
        <div className="App">
            <Navbar bg="white" variant="dark" expand="lg" style={{ opacity: 0.5 }}>
                <Container style={{ background: 'linear-gradient(180deg, #E1BEE7 0%, #F8BBD0 50%, #ffffff 100%)'}}>
                    <Navbar.Brand href="#home" style={{ fontFamily: 'Ongleaf-Ryuryu', color: 'black' }}>PennyWise</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            {/* <Nav.Link href="#home" style={{ color: 'black' }}>Home</Nav.Link> */}
                        </Nav>
                        <Nav className="ml-auto">
                            <Nav.Link href="#link"><img src='./img/con0.png' alt="Link Icon" /></Nav.Link>
                            <Nav.Link href="#about"><img src='./img/con1.png' alt='Link Icon' /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid style={{ height: 'calc(100vh - 56px)', paddingLeft: '150px',paddingRight: '150px'}}>
                <FullCalendar
                    headerToolbar={{ // 달력 상단 설정
                        left: "prev next today", // 왼쪽에 이전/다음달 및 오늘 버튼
                        center: "title", // 중간에 타이틀 
                        right: "" // 오른쪽에 오늘 버튼
                    }}
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    events={events}
                    locale={koLocale} // 한국어로 설정
                    dateClick={handleDateClick} // 날짜 클릭 시 이벤트 발생
                    height="100%" // 캘린더 높이를 100%로 설정
                />
            </Container>

            <Modal
                show={modalOpen}
                onHide={handleCloseModal}
                backdrop="static"> {/* 모달 밖을 클릭해도 창이 닫히지 않는다 */}
                <Modal.Header closeButton>
                    <Modal.Title>{selectedDate} 오늘의 가계부</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <Button variant="primary">수입</Button>{' '}
                        <Button variant="danger">지출</Button>{' '}
                        <select>
                            <option name="지출" value="지출">지출</option>
                            <option name="수입" value="수입">수입</option>
                        </select>
                        <select>
                            <option name='버스비' value="버스비">버스비</option>
                        </select>
                        <br/>
                        <input name='money' type="number" min="0" placeholder="금액 입력" ref={moneyRef}></input>
                        <br></br>
                        <br></br>
                        <input name='title' type="text" placeholder="제목" ref={titleRef}></input>
                        <br></br>
                        <textarea name="memo" placeholder="메모 입력" className="eventTextInput" ref={memoRef}></textarea>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button onClick={handleCloseModal}> {/* 버튼 클릭 시 모달 창 닫기 */}
                        취소
                    </button>
                    <button onClick={handleAppendEvent}>
                        저장
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MyCalendar;




