import './CalendarStyle.css'; // 캘린더 스타일 설정

import React, { useState, useRef } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // 날짜칸 클릭 기능
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import Swal from 'sweetalert2'

import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 기능
import { Modal, Navbar, Nav, Container } from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능

function MyCalendar() {
    const [modalOpen, setModalOpen] = useState(false); // 모달 state 변수
    const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜 state 변수
    const [events, setEvents] = useState([ // 이벤트 state 변수
        { title: '12300', date: '2024-07-15', textColor: 'red' },
        { title: '49000', date: '2024-07-25', textColor: 'red' },
        { title: '33300', date: '2024-07-11', textColor: 'red' },
    ]);
    const [isIncome, setIsIncome] = useState(true); // 수입 여부 state 변수
    const [options, setOptions] = useState([
        { value: '배당금', label: '배당금' },
        { value: '예금', label: '예금' },
        { value: '기타수입', label: '기타수입' },
        { value: '고정수입', label: '고정수입' },
    ]); // select options 상태 변수

    const titleRef = useRef();
    const moneyRef = useRef();
    const memoRef = useRef();
    const selectRef = useRef();

    const handleDateClick = (arg) => {
        setSelectedDate(arg.dateStr); // 날짜 설정
        setModalOpen(true); // 모달창 열기
    };

    const handleCloseModal = () => {
        setModalOpen(false); // 모달창 닫기
    };

    const handleAppendEvent = () => {
        const selectedType = selectRef.current.value;
        const newEvent = {
            money: moneyRef.current.value,
            title: titleRef.current.value,
            date: selectedDate,
            memo: memoRef.current.value,
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

        // setIsIncome(selectedType === '수입');

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

    const handleSelectChange = () => {
        const selectedType = selectRef.current.value;
        if (selectedType === '수입') {
            setOptions([
                { value: '배당금', label: '배당금' },
                { value: '예금', label: '예금' },
                { value: '기타수입', label: '기타수입' },
                { value: '고정수입', label: '고정수입' },
            ]);
        } else if (selectedType === '지출') {
            setOptions([
                { value: '식비', label: '식비' },
                { value: '교통비', label: '교통비' },
                { value: '의류비', label: '의류비' },
                { value: '고정지출', label: '고정지출' },
            ]);
        }
    };

    const file = async () => {
        const { value: file } = await Swal.fire({
            title: "Select image",
            input: "file",
            inputAttributes: {
                "accept": "image/*",
                "aria-label": "Upload your profile picture"
            }
        });

        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                Swal.fire({
                    title: "영수증 등록이 완료되었습니다",
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture"
                });
            };
            reader.readAsDataURL(file);
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
                        <select ref={selectRef} onChange={handleSelectChange}>
                            <option value="수입">수입</option>
                            <option value="지출">지출</option>
                        </select>
                        <select>
                            {options.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                        <br/>
                        <input name='money' type="number" min="0" placeholder="금액 입력" ref={moneyRef}></input>
                        <br></br>
                        <br></br>
                        <input name='title' type="text" placeholder="제목" ref={titleRef}></input>
                        <button onClick={file}>영수증 등록</button>
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
