import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, Form, Table } from 'react-bootstrap';
import AccountModal from './AccountModal';

const AccountList = ({ isOpen, onClose, selectedDate, events }) => {
    const [accountModalOpen, setAccountModalOpen] = useState(false);
    const [items, setItems] = useState([]);
    const [expandedIndex, setExpandedIndex] = useState(null); // 클릭한 이벤트의 인덱스
    const [currentEditItem, setCurrentEditItem] = useState(null); // 현재 수정 중인 아이템

    useEffect(() => {
        // 컴포넌트가 열릴 때 events를 items 상태로 설정
        setItems(events || []);
    }, [events]);

    const handleModalOpen = () => {
        setAccountModalOpen(true);
    };

    const handleModalClose = () => {
        setAccountModalOpen(false);
    };

    const handleAppendEvent = (title, money) => {
        // 새로운 아이템을 추가하고 모달을 닫기
        setItems([...items, { title, money }]);
        handleModalClose();
    };

    const handleEdit = (index) => {
        setCurrentEditItem({ index, item: items[index] });
        handleModalOpen(); // AccountModal 열기
    };


    const handleDelete = (index) => {
        // 항목 삭제
        setItems(items.filter((_, i) => i !== index));
    };

    const handleItemClick = (index) => {
        // 클릭한 이벤트의 세부정보 토글
        setExpandedIndex(expandedIndex === index ? null : index);
    };

    // 수입과 지출을 구분하여 리스트 생성
    const incomeItems = items.filter(item => item.extendedProps.first_category === 1);
    const expenseItems = items.filter(item => item.extendedProps.first_category === 2);

    return (
        <>
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedDate} 이벤트 목록</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {/* 수입 항목이 있을 때만 수입 그룹 출력 */}
                    {incomeItems.length > 0 && (
                        <>
                            <h5>수입</h5>
                            <ListGroup variant="flush">
                                {incomeItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            
                                                <div className="d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
                                                    <span
                                                        style={{ flex: 1, cursor: 'pointer', textDecoration: 'underline' }}
                                                        onClick={() => handleItemClick(index)}
                                                    >
                                                        {item.title} {item.money}
                                                    </span>
                                                    <div className="d-flex gap-2" style={{ marginLeft: 'auto' }}>
                                                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(index)}>
                                                            수정
                                                        </Button>
                                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(index)}>
                                                            삭제
                                                        </Button>
                                                    </div>
                                                </div>
                                        </ListGroup.Item>
                                        {expandedIndex === index && (
                                            <ListGroup.Item>
                                                <Table striped bordered hover size="sm">
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>제목</strong></td>
                                                            <td>{item.title}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>금액</strong></td>
                                                            <td>{item.extendedProps.amount} 원</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>날짜</strong></td>
                                                            <td>{item.start}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>설명</strong></td>
                                                            <td>{item.extendedProps.description}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </ListGroup.Item>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ListGroup>
                        </>
                    )}

                    {/* 지출 항목이 있을 때만 지출 그룹 출력 */}
                    {expenseItems.length > 0 && (
                        <>
                            <h5 className="mt-4">지출</h5>
                            <ListGroup variant="flush">
                                {expenseItems.map((item, index) => (
                                    <React.Fragment key={index}>
                                        <ListGroup.Item className="d-flex justify-content-between align-items-center">
                                            
                                                <div className="d-flex align-items-center justify-content-between" style={{ width: '100%' }}>
                                                    <span
                                                        style={{ flex: 1, cursor: 'pointer', textDecoration: 'underline' }}
                                                        onClick={() => handleItemClick(index + incomeItems.length)}
                                                    >
                                                        {item.title} {item.money}
                                                    </span>
                                                    <div className="d-flex gap-2" style={{ marginLeft: 'auto' }}>
                                                        <Button variant="outline-primary" size="sm" onClick={() => handleEdit(index + incomeItems.length)}>
                                                            수정
                                                        </Button>
                                                        <Button variant="outline-danger" size="sm" onClick={() => handleDelete(index + incomeItems.length)}>
                                                            삭제
                                                        </Button>
                                                    </div>
                                                </div>
                                        </ListGroup.Item>
                                        {expandedIndex === index + incomeItems.length && (
                                            <ListGroup.Item>
                                                <Table striped bordered hover size="sm">
                                                    <tbody>
                                                        <tr>
                                                            <td><strong>제목</strong></td>
                                                            <td>{item.title}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>금액</strong></td>
                                                            <td>{item.extendedProps.amount} 원</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>날짜</strong></td>
                                                            <td>{item.start}</td>
                                                        </tr>
                                                        <tr>
                                                            <td><strong>설명</strong></td>
                                                            <td>{item.extendedProps.description}</td>
                                                        </tr>
                                                    </tbody>
                                                </Table>
                                            </ListGroup.Item>
                                        )}
                                    </React.Fragment>
                                ))}
                            </ListGroup>
                        </>
                    )}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={handleModalOpen}>
                        추가
                    </Button>
                    <Button variant="secondary" onClick={onClose}>
                        닫기
                    </Button>
                </Modal.Footer>
            </Modal>

            <AccountModal
                isOpen={accountModalOpen}
                onClose={handleModalClose}
                selectedDate={selectedDate}
                event={currentEditItem} // event 함수 전달
            />
        </>
    );
};

export default AccountList;
