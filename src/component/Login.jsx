import React from 'react'
import { Modal, Navbar, Nav, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './LoginStyle.css'

const Login = () => {
    return (
        <div>
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
            <div className="Logincontainer">
                <div className="left-section">
                    <img className="pennybody" src='img/pennybody.jpg' alt="Pennywise" />
                    <p className="text">현명한 소비<br />pennywise</p>
                </div>
                <div className="right-section">
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>ID</Form.Label>
                            <Form.Control type="text" placeholder="아이디를 입력하세요" />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="비밀번호를 입력하세요" />
                        </Form.Group>
                        <Button variant="primary" href='/Main'>
                            시작하기
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}

export default Login