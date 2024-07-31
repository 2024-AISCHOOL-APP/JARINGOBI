import React, { useState, useEffect } from 'react';
import './LoginStyle.css';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLogin, onSignup, onKakao }) => {
  const navigate = useNavigate();

  const [signup, setSignup] = useState(false);
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [addr, setAddr] = useState('');
  const [gender, setGender] = useState('여성');
  const [classification, setClassification] = useState('사용자');

  const restApi = process.env.REACT_APP_KAKAO_RESTAPI_KEY;
  const redirectUrl = process.env.REACT_APP_KAKAO_REDIRECT_URL;

  const kakaoApi = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${restApi}&redirect_uri=${redirectUrl}&scope=profile_nickname,account_email`;

  const handleLogin = () => {
    window.location.href = kakaoApi;
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    if (code) {
      onKakao(code);
      navigate('/');
    }
  });

  const onSubmit = (event) => {
    event.preventDefault();
    if (signup) {
      onSignup(id, pw, name, nick, email, addr, gender, classification).catch(() => console.log('Signup Error!'));
    } else {
      onLogin(id, pw).catch(() => console.log('Login Error!'));
    }
  };

  const onChange = (event) => {
    const {
      target: { name, value, checked },
    } = event;
    switch (name) {
      case 'id':
        return setId(value);
      case 'pw':
        return setPw(value);
      case 'name':
        return setName(value);
      case 'nick':
        return setNick(value);
      case 'email':
        return setEmail(value);
      case 'addr':
        return setAddr(value);
      case 'gender':
        return setGender(value);
      case 'classification':
        return setClassification(value);
      case 'signup':
        return setSignup(checked);
      default:
    }
  };

  return (
    <div className='login_container'>
      <img src='https://picsum.photos/500' alt='회원가입 이미지' />
      <form className='auth-form' onSubmit={onSubmit}>
        <h5>아이디 </h5>
        <input id='idform' type='text' name='id' placeholder='ID' value={id} onChange={onChange} className='form-input' required />
        <h5>비밀번호 </h5>
        <input type='password' name='pw' placeholder='Password' value={pw} className='form-input' onChange={onChange} required />

        {signup && (
          <>
            <h5>이름 </h5>
            <input type='text' name='name' placeholder='Name' value={name} className='form-input' onChange={onChange} required />
          </>
        )}
        {signup && (
          <>
            <h5>닉네임 </h5>
            <input type='text' name='nick' placeholder='Nickname' value={nick} className='form-input' onChange={onChange} required />
          </>
        )}
        {signup && (
          <>
            <h5>이메일 </h5>
            <input type='email' name='email' placeholder='Email' value={email} className='form-input' onChange={onChange} required />
          </>
        )}
        {signup && (
          <>
            <h5>주소 </h5>
            <input type='text' name='addr' placeholder='Address' value={addr} className='form-input' onChange={onChange} required />
          </>
        )}
        {signup && (
          <>
            <h5>성별 </h5>
            <div className='radio'>
              <input type='radio' id='female' name='gender' value='여성' onChange={onChange} checked={gender === '여성'} />
              <label htmlFor='female'>여성</label>
              <input type='radio' id='male' name='gender' value='남성' onChange={onChange} checked={gender === '남성'} />
              <label htmlFor='male'>남성</label>
            </div>
          </>
        )}
        <input type='text' name='classfication' value={classification} className='classification' />
        <div className='form-signup'>
          <input name='signup' id='signup' type='checkbox' onChange={onChange} checked={signup} />
          <label htmlFor='signup'> 회원가입이 필요하신가요?</label>
        </div>
        <div className='sign'>
          <button type='submit' className='auth-btn'>
            {signup ? '가입하기' : '로그인하기'}
          </button>
          <button className='kakao' onClick={handleLogin}>
            <img src='img/kakao_login.png' alt='카카오로그인' />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
