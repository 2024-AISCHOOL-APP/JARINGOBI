import React, { useState, useRef, useEffect } from 'react'
import { Modal } from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능
import Spinner from 'react-bootstrap/Spinner';
import Swal from 'sweetalert2'

const AccountModal = ({
    isOpen,
    onClose,
    onAppendEvent,
    selectedDate,
    titleRef,
    moneyRef,
    memoRef,
}) => {

    const selectRef = useRef();

    const [selectedType, setSelectedType] = useState('수입');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [inputTitle, setInputTitle] = useState('');
    const [inputMoney, setInputMoney] = useState('');
    const [inputMemo, setInputMemo] = useState('');
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 state 변수
    const [receiptData, setReceiptData] = useState("");
    const [selectedEvent, setSelectedEvent] = useState({ title: "", money: "", memo: "" });


    const [options, setOptions] = useState([
        { value: '배당금', label: '배당금' },
        { value: '예금', label: '예금' },
        { value: '기타수입', label: '기타수입' },
        { value: '고정수입', label: '고정수입' },
    ]); // select options 상태 변수

    const handleSelectChange = () => {
        const selectedType = selectRef.current.value;
        setSelectedType(selectedType);
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
    // console.log(inputTitle);
    useEffect(() => {
        if (isOpen) {
            // 모달이 열릴 때만 상태를 업데이트
            setInputTitle(titleRef || '');
            setInputMoney(moneyRef || '');
            setInputMemo(memoRef || '');
        }
    }, [isOpen, titleRef, moneyRef, memoRef]);

    useEffect(() => {
        if (selectRef.current) {
            selectRef.current.value = selectedType;
        }
    }, [selectedType]);


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

                                // 여기서 final_receipt_data 변수에 데이터를 담을 수 있음
                                const final_receipt_data = data;
                                console.log(final_receipt_data);
                                setReceiptData(data);
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


    const formatReceiptData = () => {
        if (!receiptData) return "";

        const formattedItems = receiptData.items.map(item => (
            `${item.itemName.padEnd(20)} ${item.itemCount.padEnd(10)} ${item.itemUnitPrice.padEnd(10)} ${item.itemTotalPrice}`
        )).join('\n');

        // 전체 포맷
        const formattedText = `매장 이름 : ${receiptData.storeName}\n
매장 주소 : ${receiptData.storeAddress}\n
매장 전화번호 : ${receiptData.storeTel}\n
항목                         수량             단가             금액\n${formattedItems}\n
총 결제 금액    ${receiptData.totalPrice}`;

        return formattedText;
    };

    useEffect(() => {
        if (receiptData) {
            setInputMoney(receiptData.totalPrice);
            setInputTitle(receiptData.storeName);
            setInputMemo(formatReceiptData());

            setSelectedEvent({
                title: receiptData.storeName,
                money: receiptData.totalPrice,
                memo: formatReceiptData()
            });
        }

    }, [receiptData]);

    const handleSave = async () => {
        const firstCategory = selectedType === '수입' ? 1 : 2; // 예시: 수입이면 1, 지출이면 2
        const secondCategory =
          options.findIndex((option) => option.value === selectedCategory) + 1;
    
        const data = {
          first: firstCategory,
          second: secondCategory,
          amount: parseInt(inputMoney, 10),
          description: inputMemo,
        };
    
        try {
          const response = await fetch('http://localhost:8000/account', {
            method: 'POST', // POST 메서드로 요청
            headers: {
              'Content-Type': 'application/json', // JSON 형식의 데이터 전송
              Authorization: `Bearer sds`, // 여기에 실제 인증 토큰을 삽입
            },
            body: JSON.stringify(data), // 데이터를 JSON 문자열로 변환하여 전송
          });
    
          if (!response.ok) {
            throw new Error('Failed to save account');
          }
    
          const result = await response.json();
          console.log('Account created:', result);
          Swal.fire({
            icon: 'success',
            title: '저장 성공!',
            text: '가계부 항목이 성공적으로 저장되었습니다.',
          });
    
          // 저장된 데이터를 부모 컴포넌트에 전달
          onAppendEvent(inputTitle, inputMoney, inputMemo, selectedType);
    
          // 모달 닫기
          onClose();
        } catch (error) {
          console.error('Error:', error);
          Swal.fire({
            icon: 'error',
            title: '저장 실패',
            text: '가계부 항목 저장 중 오류가 발생했습니다.',
          });
        }
      };


    return (
        <Modal
            show={isOpen}
            onHide={onClose}
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
                    {/* <select> */}
                    <select onChange={(e) => setSelectedCategory(e.target.value)}>
                        {options.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <br />
                    <input
                        name='money'
                        type="number"
                        min="0"
                        placeholder="금액 입력"
                        value={inputMoney}
                        onChange={(e) => setInputMoney(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <input
                        name='title'
                        type="text"
                        placeholder="제목"
                        value={inputTitle}
                        onChange={(e) => setInputTitle(e.target.value)}
                    />
                    <button onClick={file}>영수증 등록</button>
                    {isLoading && (
                        <Spinner animation="border" role="status" className="ml-3">
                            <span className="sr-only"></span>
                        </Spinner>
                    )}
                    <br></br>
                    <textarea
                        name="memo"
                        placeholder="메모 입력"
                        className="eventTextInput"
                        value={inputMemo}
                        onChange={(e) => setInputMemo(e.target.value)}
                        style={{ height: '400px' }}
                    ></textarea>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={onClose}> {/* 버튼 클릭 시 모달 창 닫기 */}
                    취소
                </button>
                {/* <button onClick={() => onAppendEvent(inputTitle, inputMoney, inputMemo, selectedType)}> */}
                <button onClick={handleSave}>
                    저장
                </button>
            </Modal.Footer>
        </Modal>
    )
}

export default AccountModal