import React, { useState, useEffect } from 'react';
import { Modal, Button, ListGroup, Table } from 'react-bootstrap';
import AccountModal from './AccountModal';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';

const AccountList = ({ isOpen, onClose, selectedDate, events, accountService }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [accountModalOpen, setAccountModalOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [currentEditItem, setCurrentEditItem] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [currentDay, setCurrentDay] = useState(selectedDate.split('-')[2]);
  const [accountsDay, setAccountsDay] = useState(null);
  // 안전하게 필터링 처리
  const [incomeItems, setIncomeItems] = useState([]);
  const [expenseItems, setExpenseItems] = useState([]);

  // accountsDay 포맷팅하여 items로 설정
  useEffect(() => {
    if (accountsDay) {
      const formattedEvents = accountsDay.map((item) => ({
        title: item.title || '제목 없음',
        start: item.createdAt.split('T')[0],
        textColor: item.first_category === 1 ? 'blue' : 'red',
        extendedProps: item,
      }));
      setItems(formattedEvents);
    } else {
      setItems(events || []);
    }
  }, [accountsDay, events]);

  const handleAddItem = () => {
    setCurrentEditItem(null);
    setAccountModalOpen(true);
  };

  const handleEnd = () => {
    onClose();
  };

  const handleModalClose = async () => {
    setAccountModalOpen(false);
    try {
      const accounts = await accountService.getAccounts(user.userId, currentYear, currentMonth, currentDay);
      setAccountsDay(accounts); // accountsDay를 업데이트
    } catch (error) {
      console.error('Failed to fetch accounts:', error);
    }
  };

  const handleAppendEvent = (title, money) => {
    setItems((prevItems) => [...prevItems, { title, money }]);
    handleModalClose();
  };

  const handleEdit = (index) => {
    setCurrentEditItem({ index, item: items[index] });
    setAccountModalOpen(true);
  };

  const handleDelete = (index) => {
    accountService
      .deleteAccount(items[index].extendedProps.id)
      .then(() => {
        Swal.fire({
          icon: 'success',
          title: '삭제되었습니다',
          text: '가계부 항목이 성공적으로 삭제되었습니다!',
        });
        setItems((prevItems) => prevItems.filter((_, i) => i !== index));
      })
      .catch((error) => console.error('Failed to delete account:', error));
  };

  const handleItemClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  // items가 변경될 때마다 수입/지출 항목을 업데이트
  useEffect(() => {
    setIncomeItems(items.filter((item) => item.extendedProps && item.extendedProps.first_category === 1));
    setExpenseItems(items.filter((item) => item.extendedProps && item.extendedProps.first_category === 2));
  }, [items]);

  return (
    <>
      <Modal show={isOpen} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>{selectedDate} 이벤트 목록</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {incomeItems.length > 0 && (
            <>
              <h5>수입</h5>
              <ListGroup variant='flush'>
                {incomeItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center justify-content-between' style={{ width: '100%' }}>
                        <span style={{ flex: 1, cursor: 'pointer', textDecoration: 'underline' }} onClick={() => handleItemClick(index)}>
                          {item.title} {item.money}
                        </span>
                        <div className='d-flex gap-2' style={{ marginLeft: 'auto' }}>
                          <Button variant='outline-primary' size='sm' onClick={() => handleEdit(index)}>
                            수정
                          </Button>
                          <Button variant='outline-danger' size='sm' onClick={() => handleDelete(index)}>
                            삭제
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                    {expandedIndex === index && (
                      <ListGroup.Item>
                        <Table striped bordered hover size='sm'>
                          <tbody>
                            <tr>
                              <td>
                                <strong>제목</strong>
                              </td>
                              <td>{item.title}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>금액</strong>
                              </td>
                              <td>{item.extendedProps.amount} 원</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>날짜</strong>
                              </td>
                              <td>{item.start}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>설명</strong>
                              </td>
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

          {expenseItems.length > 0 && (
            <>
              <h5 className='mt-4'>지출</h5>
              <ListGroup variant='flush'>
                {expenseItems.map((item, index) => (
                  <React.Fragment key={index}>
                    <ListGroup.Item className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex align-items-center justify-content-between' style={{ width: '100%' }}>
                        <span
                          style={{ flex: 1, cursor: 'pointer', textDecoration: 'underline' }}
                          onClick={() => handleItemClick(index + incomeItems.length)}
                        >
                          {item.title} {item.money}
                        </span>
                        <div className='d-flex gap-2' style={{ marginLeft: 'auto' }}>
                          <Button variant='outline-primary' size='sm' onClick={() => handleEdit(index + incomeItems.length)}>
                            수정
                          </Button>
                          <Button variant='outline-danger' size='sm' onClick={() => handleDelete(index + incomeItems.length)}>
                            삭제
                          </Button>
                        </div>
                      </div>
                    </ListGroup.Item>
                    {expandedIndex === index + incomeItems.length && (
                      <ListGroup.Item>
                        <Table striped bordered hover size='sm'>
                          <tbody>
                            <tr>
                              <td>
                                <strong>제목</strong>
                              </td>
                              <td>{item.title}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>금액</strong>
                              </td>
                              <td>{item.extendedProps.amount} 원</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>날짜</strong>
                              </td>
                              <td>{item.start}</td>
                            </tr>
                            <tr>
                              <td>
                                <strong>설명</strong>
                              </td>
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
          <Button onClick={handleAddItem}>추가</Button>
          <Button variant='secondary' onClick={handleEnd}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

      <AccountModal
        isOpen={accountModalOpen}
        onClose={handleModalClose}
        selectedDate={selectedDate}
        event={currentEditItem || null}
        accountService={accountService}
      />
    </>
  );
};

export default AccountList;
