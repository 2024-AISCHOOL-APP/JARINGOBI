import './CalendarStyle.css';
import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction";
import koLocale from '@fullcalendar/core/locales/ko';
import Swal from 'sweetalert2';
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from 'react-bootstrap';
import AccountModal from './AccountModal';
import AccountList from './AccountList';
import { useAuth } from '../context/AuthProvider';


function Calendar({ accountService }) {
    const { user } = useAuth();
    const [modalState, setModalState] = useState({ isOpen: false, type: null }); 
    const [selectedDate, setSelectedDate] = useState(""); 
    const [events, setEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState({ title: "", money: "", memo: "" });
    const [accountsMonth, setAccountsMonth] = useState(null);
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
    const [filteredEvents, setFilteredEvents] = useState([]);
    const selectRef = useRef();

    useEffect(() => {
        accountService
            .getAccounts(user.userId, currentYear, currentMonth)
            .then((accounts) => {
                setAccountsMonth([...accounts]);
            })
    }, [currentMonth]);

    useEffect(() => {
        if (accountsMonth) {
            const formattedEvents = accountsMonth.map(item => ({
                title: item.title,
                start: item.createdAt.split('T')[0], 
                textColor: item.first_category === 1 ? 'blue' : 'red',
                extendedProps: item 
            }));
            setEvents(formattedEvents);
        }
    }, [accountsMonth]);

    let eventsForDate = null;
    // 날짜 클릭 핸들러
    const handleDateClick = (arg) => {
        const clickedDate = arg.dateStr;
        setSelectedDate(clickedDate);

        // 선택한 날짜에 이벤트가 있는지 확인
        const eventExists = events.some(event => event.start === clickedDate);
        if (eventExists) {
            // 이벤트가 있는 경우, AccountModal 열기
            setSelectedEvent({ title: "", money: "", memo: "" });
            setModalState({ isOpen: true, type: 'AccountList' });
        } else {
            // 이벤트가 없는 경우, AccountList 열기
            setModalState({ isOpen: true, type: 'AccountModal' });
        }

        // 선택한 날짜에 해당하는 이벤트 필터링
        eventsForDate = events.filter(event => event.start === clickedDate);
        setFilteredEvents(eventsForDate); // 필터링된 이벤트를 상태로 설정
        console.log(eventsForDate);
    };

    // 모달 닫기 핸들러
    const handleCloseModal = () => {
        setModalState({ isOpen: false, type: null }); // 모달창 닫기
    };

    // 이벤트 추가 핸들러
    const handleAppendEvent = (inputTitle, inputMoney, inputMemo) => {
        const selectedType = selectRef.current.value;
        const newEvent = {
            money: inputMoney,
            title: inputTitle,
            date: selectedDate,
            memo: inputMemo,
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

    // 이벤트 클릭 핸들러
    const eventClick = (info) => {
        const clickedDate = info.event.startStr;
        eventsForDate = events.filter(event => event.start === clickedDate);
        setFilteredEvents(eventsForDate); // 필터링된 이벤트를 상태로 설정
        console.log(eventsForDate);
        if (!info.event.title) {
            setSelectedEvent({
                title: info.event.title,
                money: info.event.money,
                memo: info.event.extendedProps.memo || ""
            });
            setSelectedDate(info.event.startStr); // 선택된 날짜 업데이트
            setModalState({ isOpen: true, type: 'AccountModal' }); // 모달창 열기
        } else {
            setModalState({ isOpen: true, type: 'AccountList' }); // 모달창 열기
            setSelectedDate(info.event.startStr); // 선택된 날짜 업데이트
        }

    };

    const handleMonthChange = (newYear, newMonth) => {
        setCurrentYear(newYear);
        setCurrentMonth(newMonth);
    };

    const handleDatesSet = (dateInfo) => {
        const { view } = dateInfo;
        const newMonth = view.currentStart.getMonth() + 1; // getMonth()는 0부터 시작
        const newYear = view.currentStart.getFullYear();
        handleMonthChange(newYear, newMonth);
    };

    return (
        <div className="App">
            <Container className='fullContainer' fluid style={{ height: 'calc(100vh - 56px)', paddingLeft: '150px', paddingRight: '150px' }}>
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
                    datesSet={handleDatesSet} // 달력의 날짜 범위가 설정될 때 호출되는 핸들러
                />
            </Container>

            {modalState.type === 'AccountModal' && (
                <AccountModal
                    isOpen={modalState.isOpen}
                    onClose={handleCloseModal}
                    onAppendEvent={handleAppendEvent}
                    selectedDate={selectedDate}
                    titleRef={selectedEvent.title}
                    moneyRef={selectedEvent.money}
                    memoRef={selectedEvent.memo}
                    selectRef={selectRef}
                    selectedEvent={selectedEvent} // 추가
                />
            )}

            {modalState.type === 'AccountList' && (
                <AccountList
                    isOpen={modalState.isOpen}
                    onClose={handleCloseModal}
                    selectedDate={selectedDate}
                    titleRef={selectedEvent.title}
                    moneyRef={selectedEvent.money}
                    events={filteredEvents} // 필터링된 이벤트 목록 전달
                />
            )}
        </div>
    );
}

export default Calendar;
