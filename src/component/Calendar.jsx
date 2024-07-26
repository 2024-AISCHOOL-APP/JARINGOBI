import './CalendarStyle.css'; // 캘린더 스타일 설정

import React, { useState, useRef, useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from "@fullcalendar/interaction"; // 날짜칸 클릭 기능
import koLocale from '@fullcalendar/core/locales/ko'; // 한국어 로케일
import Swal from 'sweetalert2'

import "bootstrap/dist/css/bootstrap.min.css"; // 부트스트랩 기능
import { Modal, Navbar, Nav, Container } from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능
import Spinner from 'react-bootstrap/Spinner';

function MyCalendar() {
    const [modalOpen, setModalOpen] = useState(false); // 모달 state 변수
    const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜 state 변수
    const [receiptData, setReceiptData] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 state 변수
    const [titles,setTitles] = useState('')
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
            reader.onload = async (e) => {
                Swal.fire({
                    title: "영수증 등록이 완료되었습니다",
                    imageUrl: e.target.result,
                    imageAlt: "The uploaded picture",
                    showCancelButton: true,
                    confirmButtonText: "OK",
                }).then((result) => {
                    if (result.isConfirmed) {
                        const formData = new FormData();
                        formData.append("file", file);

                        setIsLoading(true); // 파일 업로드 중 로딩 상태 설정

                        fetch("http://localhost:8000/receive_receipt", {
                            method: "POST",
                            body: formData,
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                setIsLoading(false); // 파일 업로드 완료 후 로딩 상태 해제
                                // Swal.fire({
                                //     title: "Receipt uploaded",
                                //     text: "Server response: " + JSON.stringify(data),
                                //     imageUrl: URL.createObjectURL(file),
                                //     imageAlt: "Uploaded receipt",
                                // });

                                // 여기서 final_receipt_data 변수에 데이터를 담을 수 있음
                                const final_receipt_data = data;
                                console.log(final_receipt_data);
                                setReceiptData(data);
                                // }
                            })
                            .catch((error) => {
                                setIsLoading(false); // 파일 업로드 실패 시 로딩 상태 해제
                                console.error("Error:", error);
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",
                                    text: "Something went wrong!",
                                });
                            });
                    }
                });
            };
            reader.readAsDataURL(file);
        }
    };
    

    // useEffect 사용 예시
    useEffect(() => {
        // 여기에 수행할 작업을 넣습니다.
        // 예를 들어, receiptData 상태가 변경될 때마다 입력 요소에 값을 설정하는 작업 등을 수행할 수 있습니다.
        if (receiptData) {
            if (moneyRef.current) moneyRef.current.value = receiptData.totalPrice;
            if (titleRef.current) titleRef.current.value = receiptData.storeName;
            if (memoRef.current) memoRef.current.value = formatReceiptData();
        }
    }, [receiptData]);


    // receiptData를 포맷하는 함수
    const formatReceiptData = () => {
        if (!receiptData) return "";

        // items 포맷
        const formattedItems = receiptData.items.map(item => (
            `${item.itemName.padEnd(20)} ${item.itemCount.padEnd(10)} ${item.itemUnitPrice.padEnd(10)} ${item.itemTotalPrice}`
        )).join('\n');

        // 전체 포맷
        const formattedText = `매장 이름 : ${receiptData.storeName}\n
매장 주소 : ${receiptData.storeAddress}\n
매장 전화번호 : ${receiptData.storeTel}\n
항목                   수량             단가             금액\n${formattedItems}\n
총 결제 금액    ${receiptData.totalPrice}`;

        return formattedText;
    };

    function eventClick(info){

        // moneyRef.current.value = receiptData.totalPrice;
        // const titless = info.event.title;
        // // memoRef.current.value = formatReceiptData();
        // // setModalOpen(true); // 모달창 열기
        console.log(info.event.title);
        // console.log(titless,"dddddddd");
  
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
                        <br />
                        <input name='money' type="number" min="0" placeholder="금액 입력" ref={moneyRef}></input>
                        <br></br>
                        <br></br>
                        <input name='title' type="text" placeholder="제목" ref={titleRef}></input>
                        <button onClick={file}>영수증 등록</button>
                        {isLoading && (
                            <Spinner animation="border" role="status" className="ml-3">
                                <span className="sr-only"></span>
                            </Spinner>
                        )}
                        <br></br>
                        <textarea name="memo" placeholder="메모 입력" className="eventTextInput" ref={memoRef} style={{ height: '400px' }}></textarea>
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
