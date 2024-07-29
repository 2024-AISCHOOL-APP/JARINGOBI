import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import AccountModal from './AccountModal';

const AccountList = ({ isOpen, onClose, selectedDate }) => {
    const [accountModalOpen, setAccountModalOpen] = useState(false);
    const [items, setItems] = useState([]); // 리스트 항목을 관리할 상태 추가

    const handleModalOpen = () => {
        setAccountModalOpen(true);
    };

    const handleModalClose = () => {
        setAccountModalOpen(false);
    };

    const handleAppendEvent = (title, money) => {
        setItems([...items, { title, money }]);
        handleModalClose();
    };

    return (
        <>
            <Modal show={isOpen} onHide={onClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{selectedDate}</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <ul style={{ listStyleType: 'circle', marginLeft: '20px' }}>
                        {items.map((item, index) => (
                            <li key={index}>
                                {item.title} {item.money}
                            </li>
                        ))}
                    </ul>
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
                onAppendEvent={handleAppendEvent} // onAppendEvent 함수 전달
            />
        </>
    );
};

export default AccountList;

