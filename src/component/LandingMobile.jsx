import React from 'react';
import '../App.css';

const LandingMobile = () => {
    return (
        <div className="container">
            <div className="header">
                <img className="image" src="./img/pennywise.png" />
                <div className="title">penny wise</div>
            </div>
            <div className="description">
                현명한 소비의 시작은<br />
                현명한 가계부로부터<br />
                PENNY WISE
            </div>
            <div className='text'>
                <p>인공지능을 통한 손쉬운 가계부작성
                    <br/>
                    현명한 소비를 공유하는 커뮤니티
                    <br/>
                    강력한 분석 능력을 통한 통계분석</p>
            </div>
        </div>
    );
}

export default LandingMobile ;

