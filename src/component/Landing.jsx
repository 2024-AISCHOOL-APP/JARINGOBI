import React from 'react';
import './LandingStyle.css';
import { Button } from 'react-bootstrap';
import { Navbar, Nav, Container } from 'react-bootstrap'; // 모달 팝업 및 네비게이션 바 기능
import Carousel from 'react-bootstrap/Carousel';
// import "./App.css";

const Landing = () => {
  return (
    <div className='landing-page'>
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
      <div className='grid-container'>
        <div className='grid-item logo-section'>
          <img className='logo-image' src='img/pennywise.png' alt='logo' />
          <div className='logo-text'>penny wise</div>
        </div>
        <div className='grid-item main-text'>
          현명한 소비의 시작은
          <br />
          현명한 가계부로부터
          <br />
          PENNY WISE
        </div>
        <div className='grid-item description'>
          인공지능을 통한 손쉬운 가계부 작성
          <br />
          <br />
          현명한 소비를 공유하는 커뮤니티
          <br />
          <br />
          강력한 분석 능력을 통한 통계분석
        </div>
        <div className='grid-item'>
          <Button href='/auth' className='purple-button'>
            로그인하고 이용하기
          </Button>
        </div>
        <Carousel className='Carousel'>
          <Carousel.Item>
            <img src='img/slide01.jpg' alt='슬라이드 이미지 1번' />
            <Carousel.Caption>
              <h3>1. 편리한 가계부 작성</h3>
              <p>캘린더를 활용한 손쉬운 입력, ocr을 통한 빠른 영수증 등록</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src='img/slide02.jpg' alt='슬라이드 이미지 2번' />
            <Carousel.Caption>
              <h3>2. 강력한 소비 분석 통계 제공</h3>
              <p>가계부를 분석하여 일일 통계부터 연간 통계까지 한눈에 확인</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src='img/slide03.jpg' alt='슬라이드 이미지 3번' />
            <Carousel.Caption>
              <h3>3. 현명한 소비와 저축을 공유하는 커뮤니티</h3>
              <p>zero shot 모델을 활용한 커뮤니티 게시글 분류 기능을 제공</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
      <></>
    </div>
  );
};

export default Landing;
