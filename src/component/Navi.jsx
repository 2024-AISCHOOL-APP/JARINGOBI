import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import './Navi.css';

const Navi = memo(({ userId, onLogout }) => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <Link className='navlogo' to='/'>
          <img className='logo-image' src='img/pennywise.png' alt='logo' />
          PennyWise
          {userId && <span className='logo-user'>@{userId}</span>}
        </Link>

        <div className='nav-links'>
          <Link className='nav-link' to='/main'>
            가계부
          </Link>
          <Link className='nav-link' to='/dashboard'>
            가계부 분석
          </Link>
          <Link className='nav-link' to='/community'>
            커뮤니티
          </Link>
          <button className='nav-link' onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navi;
