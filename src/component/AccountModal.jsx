import React, { useState, useRef, useEffect } from "react";
import { Modal, Form, Button, Container, Row, Col } from "react-bootstrap"; // 모달 팝업 및 네비게이션 바 기능
import Spinner from "react-bootstrap/Spinner";
import Swal from "sweetalert2";
import { useAuth } from '../context/AuthProvider';
const AccountModal = ({
    isOpen,
    onClose,
    onAppendEvent,
    selectedDate,
    titleRef,
    moneyRef,
    memoRef,
    event,
    accountService,
}) => {
    const selectRef = useRef();
    const { user } = useAuth();
    const [selectedType, setSelectedType] = useState("수입");
    const [selectedCategory, setSelectedCategory] = useState("");
    const [inputTitle, setInputTitle] = useState("");
    const [inputMoney, setInputMoney] = useState("");
    const [inputMemo, setInputMemo] = useState("");
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 state 변수
    const [receiptData, setReceiptData] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState({
        title: "",
        money: "",
        memo: "",
    });

    const [options, setOptions] = useState([
        { value: "배당금", label: "배당금" },
        { value: "예금", label: "예금" },
        { value: "기타수입", label: "기타수입" },
        { value: "고정수입", label: "고정수입" },
    ]); // select options 상태 변수

    const handleSelectChange = () => {
        const selectedType = selectRef.current.value;
        setSelectedType(selectedType);
        setOptions(
            selectedType === "수입"
                ? [
                    { value: "배당금", label: "배당금" },
                    { value: "예금", label: "예금" },
                    { value: "기타수입", label: "기타수입" },
                    { value: "고정수입", label: "고정수입" },
                ]
                : [
                    { value: "식비", label: "식비" },
                    { value: "교통비", label: "교통비" },
                    { value: "의류비", label: "의류비" },
                    { value: "고정지출", label: "고정지출" },
                ]
        );
    };
    useEffect(() => {
        if (isOpen) {
            // 모달이 열릴 때만 상태를 업데이트
            if (event) {
                setInputTitle(event.item.title || "");
                setInputMoney(event.item.extendedProps.amount || "");
                setInputMemo(event.item.extendedProps.description || "");
            } else {
                setInputTitle("");
                setInputMoney("");
                setInputMemo("");
            }
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
                accept: "image/*",
                "aria-label": "Upload your profile picture",
            },
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

                        fetch("http://localhost:5000/receive_receipt", {
                            method: "POST",
                            body: formData,
                        })
                            .then((response) => response.json())
                            .then((data) => {
                                setIsLoading(false);
                                setReceiptData(data);
                            })
                            .catch((error) => {
                                setIsLoading(false);
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

        const itemNameWidth = 20;
        const itemCountWidth = 10;
        const itemUnitPriceWidth = 10;
        const itemTotalPriceWidth = 10;

        const hasItems =
            "items" in receiptData &&
            Array.isArray(receiptData.items) &&
            receiptData.items.length > 0;

        const formattedItems = hasItems
            ? receiptData.items
                .map((item) => {
                    const itemName = item.product_name || "";
                    const itemCount = item.count || "";
                    const itemUnitPrice = item.unit_price || "";
                    const itemTotalPrice = item.total_price || "";

                    return (
                        `${itemName.padEnd(itemNameWidth)}\t` +
                        `${itemCount.padEnd(itemCountWidth)}\t` +
                        `${itemUnitPrice.padEnd(itemUnitPriceWidth)}\t` +
                        `${itemTotalPrice}`
                    );
                })
                .join("\n")
            : "";

        const receiptEntries = [
            { key: "매장 이름", value: receiptData.storeName },
            { key: "매장 주소", value: receiptData.storeAddress?.[0] },
            { key: "매장 전화번호", value: receiptData.storeTel?.[0] },
            { key: "결제 날짜", value: receiptData.paymentDate },
            { key: "결제 시간", value: receiptData.paymentTime },
        ].filter((entry) => entry.value);

        const formattedEntries = receiptEntries
            .map((entry) => `${entry.key} : ${entry.value}`)
            .join("\n");

        const itemsHeader = hasItems
            ? `항목${" ".repeat(itemNameWidth - 3)}\t수량${" ".repeat(
                itemCountWidth - 2
            )}\t단가${" ".repeat(itemUnitPriceWidth - 2)}\t금액`
            : "";

        const totalPriceLine = receiptData.totalPrice
            ? `총 결제 금액 : ${receiptData.totalPrice}`
            : "";

        const formattedText = formattedEntries
            ? `${formattedEntries}\n\n${itemsHeader}\n${formattedItems}\n\n${totalPriceLine}`
            : `${itemsHeader}\n${formattedItems}\n\n${totalPriceLine}`;

        return formattedText;
    };

    useEffect(() => {
        if (receiptData) {
            const cleanedTotalPrice = receiptData.totalPrice.replace(/,/g, ""); // 쉼표 제거
            setInputMoney(cleanedTotalPrice);
            setInputTitle(receiptData.storeName || "");
            setInputMemo(formatReceiptData());

            setSelectedEvent({
                title: receiptData.storeName || "",
                money: cleanedTotalPrice,
                memo: formatReceiptData(),
            });
        }
    }, [receiptData]);

    const handleSave = async () => {
        const firstCategory = selectedType === "수입" ? 1 : 2; // 예시: 수입이면 1, 지출이면 2
        const secondCategory =
            options.findIndex((option) => option.value === selectedCategory) + 1;

        if (event) {
            accountService
                .updateAccount(
                    event.item.extendedProps.id,
                    firstCategory,
                    secondCategory,
                    parseInt(inputMoney, 10),
                    inputMemo,
                    inputTitle
                )
                .then((response) => {
                    if (response) {
                        Swal.fire({
                            icon: "success",
                            title: "수정되었습니다",
                            text: "가계부 항목이 성공적으로 저장되었습니다!",
                        }).then(() => {
                            onClose();
                        });
                    } else {
                        throw new Error("수정에 실패했습니다.");
                    }
                }
            )
        } else {
            accountService
                .createAccount(
                    user.userId,
                    firstCategory,
                    secondCategory,
                    parseInt(inputMoney, 10),
                    inputMemo,
                    inputTitle
                )
                .then((response) => {
                    if (response) {
                        Swal.fire({
                            icon: "success",
                            title: "저장되었습니다",
                            text: "가계부 항목이 성공적으로 저장되었습니다!",
                        }).then(() => {
                            onClose();
                        });
                    } else {
                        throw new Error("저장에 실패했습니다.");
                    }
                }
            )
        }
    };

    return (
        <Modal
            show={isOpen}
            onHide={onClose}
            backdrop="static" // 모달 밖을 클릭해도 창이 닫히지 않는다
            centered // 모달을 화면 중앙에 표시
        >
            <Modal.Header closeButton>
                <Modal.Title>
                    {selectedDate} 오늘의 가계부
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formSelectType">
                                <Form.Label>유형 선택</Form.Label>
                                <Form.Control
                                    as="select"
                                    ref={selectRef}
                                    onChange={handleSelectChange}
                                >
                                    <option value="수입">수입</option>
                                    <option value="지출">지출</option>
                                </Form.Control>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formSelectCategory">
                                <Form.Label>카테고리 선택</Form.Label>
                                <Form.Control
                                    as="select"
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {options.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </Form.Control>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formInputTitle">
                                <Form.Label>제목</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="제목 입력"
                                    value={inputTitle}
                                    onChange={(e) => setInputTitle(e.target.value)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group controlId="formInputMoney">
                                <Form.Label>금액</Form.Label>
                                <Form.Control
                                    type="number"
                                    min="0"
                                    placeholder="금액 입력"
                                    value={inputMoney}
                                    onChange={(e) => setInputMoney(e.target.value)}
                                />
                            </Form.Group>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            <Button variant="primary" onClick={file} className="mt-2 mb-2">
                                영수증 등록
                            </Button>
                            {isLoading && (
                                <Spinner
                                    animation="border"
                                    role="status"
                                    className="ml-3"
                                    style={{ marginLeft: "10px" }}
                                >
                                    {/* <span className="sr-only">Loading...</span> */}
                                </Spinner>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Form.Group controlId="formInputMemo">
                                <Form.Label>메모</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    placeholder="메모 입력"
                                    className="eventTextInput"
                                    value={inputMemo}
                                    onChange={(e) => setInputMemo(e.target.value)}
                                    style={{ height: "200px" }}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    취소
                </Button>
                <Button variant="success" onClick={handleSave}>
                    저장
                </Button>
            </Modal.Footer>
        </Modal>
    );
};



export default AccountModal;
