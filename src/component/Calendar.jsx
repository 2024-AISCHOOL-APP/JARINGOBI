import './CalendarStyle.css'; // 캘린더 스타일 설정

import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // 날짜칸 클릭 기능
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import Swal from 'sweetalert2'

import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 기능
import { Navbar, Nav, Container } from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능
import AccountModal from './AccountModal';


function MyCalendar() {
    const [modalOpen, setModalOpen] = useState(false); // 모달 state 변수
    const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜 state 변수
    const [events, setEvents] = useState([ // 이벤트 state 변수
        { money: '12300', title : '자린고비', date: '2024-07-15', textColor: 'red' },
        { title: '49000', date: '2024-07-25', textColor: 'red' },
        { title: '33300', date: '2024-07-11', textColor: 'red' },
    ]);
    const [selectedEvent, setSelectedEvent] = useState({ title: "", money: "", memo: "" });

    const selectRef = useRef();

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr); // 날짜 설정
        setSelectedEvent({ title: "", money: "", memo: "" });
        setModalOpen(true); // 모달창 열기
    };

    const handleCloseModal = () => {
        setModalOpen(false); // 모달창 닫기
    };

    const handleAppendEvent = (inputTitle, inputMoney, inputMemo) => {
        const selectedType = selectRef.current.value;
        const newEvent = {
            money: inputMoney, // inputMoney를 사용해야 합니다
            title: inputTitle, // inputTitle을 사용해야 합니다
            date: selectedDate,
            memo: inputMemo, // inputMemo를 사용해야 합니다
            textColor: selectedType === '수입' ? 'blue' : 'red',
            backgroundColor: 'white',
        };

        // Validate if title and date are provided
        if (!newEvent.title || !newEvent.date) {
            Swal.fire({
                icon: "error",
                title: "등록 실패",
                text: "제목과 금액을 작성해주세요",
            });
            return;
        }

        setEvents([...events, newEvent]);
        handleCloseModal();
        Swal.fire({
            position: "center",
            icon: "success",
            title: "등록 성공!",
            showConfirmButton: false,
            timer: 1500
        });
    };

    function eventClick(info){
        setSelectedEvent({
            title: info.event.title,
            money: info.event.money,
            memo: info.event.extendedProps.memo || ""
        });
        setSelectedDate(info.event.startStr); // 선택된 날짜 업데이트
        setModalOpen(true); // 모달창 열기
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
            <Container  className='fullContainer' fluid style={{ height: 'calc(100vh - 56px)', paddingLeft: '150px', paddingRight: '150px'}}>
                <FullCalendar
                    headerToolbar={{ // 달력 상단 설정
                        left: "prev next", // 왼쪽에 이전/다음달 및 오늘 버튼
                        center: "title", // 중간에 타이틀 
                        right: "today" // 오른쪽에 오늘 버튼
                    }}
                    initialView="dayGridMonth"
                    plugins={[dayGridPlugin, interactionPlugin]}
                    events={events}
                    eventClick={eventClick}
                    locale={koLocale} // 한국어로 설정
                    dateClick={handleDateClick} // 날짜 클릭 시 이벤트 발생
                    height="100%" // 캘린더 높이를 100%로 설정
                />
            </Container>

            <AccountModal
                isOpen={modalOpen}
                onClose={handleCloseModal}
                onAppendEvent={handleAppendEvent}
                selectedDate={selectedDate}
                titleRef={selectedEvent.title}
                moneyRef={selectedEvent.money}
                memoRef={selectedEvent.memo}
                selectRef={selectRef}
                selectedEvent={selectedEvent} // 추가
            />

        </div>
    );
}

export default MyCalendar;
