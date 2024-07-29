import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginStyle.css';
import HttpClient from '../network/http.js';
const baseURL = process.env.REACT_APP_BASE_URL;
const httpClient = new HttpClient(baseURL);

const Login = () => {
  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const id = formData.get('id');
    const password = formData.get('pw');

    const data = httpClient.fetch('/auth/login', {
      method: 'POST',
      body: JSON.stringify({
        id,
        pw: password,
      }),
    });

    if (data) {
      window.location.href = '/Main';
    }
  };

  return (
    <div>
      <Navbar className='Navbar'>
        <Container className='Container'>
          <Navbar.Brand className='Navlogo' href='/'>
            PennyWise
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='me-auto'></Nav>
            <Nav className='ml-auto'>
              <Nav.Link href='/Main'>
                <img src='img/con0.png' alt='Link Icon' />
              </Nav.Link>
              <Nav.Link href='#about'>
                <img src='img/con3.png' alt='Link Icon' />
              </Nav.Link>
              <Nav.Link href='/Community'>
                <img src='img/con1.png' alt='Link Icon' />
              </Nav.Link>
              <Nav.Link href='#about'>
                <img src='img/con2.png' alt='Link Icon' />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='Logincontainer'>
        <div className='left-section'>
          <img className='pennybody' src='img/pennybody.jpg' alt='Pennywise' />
          <p className='text'>
            현명한 소비
            <br />
            pennywise
          </p>
        </div>
        <div className='right-section'>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className='mb-3' controlId='formBasicEmail'>
              <Form.Label>ID</Form.Label>
              <Form.Control name='id' type='text' placeholder='아이디를 입력하세요' />
            </Form.Group>
            <Form.Group className='mb-3' controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control name='pw' type='password' placeholder='비밀번호를 입력하세요' />
            </Form.Group>
            <Button className='login' variant='primary' type='submit'>
              시작하기
            </Button>{' '}
            <Button className='signup' href='/Signup' variant='primary'>
              회원가입
            </Button>
            <button className='kakao'>
              <img src='img/kakao_login.png' alt='' />
            </button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
