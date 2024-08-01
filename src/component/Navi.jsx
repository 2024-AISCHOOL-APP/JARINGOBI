import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';
import './Navi.css';

const Navi = memo(({ userId, onLogout }) => {
  return (
    <nav className='navbar'>
      <div className='container'>
        <NavLink className='navlogo' to='/'>
          <img className='logo-image' src='img/pennywise.png' alt='logo' />
          PennyWise
          {userId && <span className='logo-user'>@{userId}</span>}
        </NavLink>

        <div className='nav-links'>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active-menulink' : 'nav-link')} to='/main'>
            가계부
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active-menulink' : 'nav-link')} to='/dashboard'>
            가계부 분석
          </NavLink>
          <NavLink className={({ isActive }) => (isActive ? 'nav-link active-menulink' : 'nav-link')} to='/community'>
            커뮤니티
          </NavLink>
          <button className='nav-link' onClick={onLogout}>
            로그아웃
          </button>
        </div>
      </div>
    </nav>
  );
});

export default Navi;
