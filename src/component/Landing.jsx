import React from 'react';
import './LandingStyle.css';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const Landing = () => {
  return (
    <>
      <div className='landing-page'>
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
      </div>
    </>
  );
};

export default Landing;
