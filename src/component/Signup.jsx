import React, { useState } from 'react';
import './SignupStyle.css';
import HttpClient from '../network/http.js';

const Signup = () => {
  const baseURL = process.env.REACT_APP_BASE_URL;
  const httpClient = new HttpClient(baseURL);

  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [name, setName] = useState('');
  const [nick, setNick] = useState('');
  const [email, setEmail] = useState('');
  const [addr, setAddr] = useState('');
  const [gender, setGender] = useState('여성');
  const [classification, setClassification] = useState('사용자');

  const onChange = (event) => {
    const {
      target: { name, value },
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
      default:
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const data = httpClient.fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({
        id,
        pw,
        name,
        nick,
        email,
        addr,
        gender,
        classification,
      }),
    });

    if (data) {
      window.location.href = '/login';
    }
  };

  return (
    <div className='container'>
      <img src='https://picsum.photos/500' alt='회원가입 이미지' />
      <form className='auth-form' onSubmit={onSubmit}>
        <h5>아이디 </h5>
        <input id='idform' type='text' name='id' placeholder='ID' value={id} onChange={onChange} className='form-input' required />
        <h5>비밀번호 </h5>
        <input type='password' name='pw' placeholder='Password' value={pw} className='form-input' onChange={onChange} required />
        <h5>이름 </h5>
        <input type='text' name='name' placeholder='Name' value={name} className='form-input' onChange={onChange} required />
        <h5>닉네임 </h5>
        <input type='text' name='nick' placeholder='Nickname' value={nick} className='form-input' onChange={onChange} required />
        <h5>이메일 </h5>
        <input type='email' name='email' placeholder='Email' value={email} className='form-input' onChange={onChange} required />
        <h5>주소 </h5>
        <input type='text' name='addr' placeholder='Address' value={addr} className='form-input' onChange={onChange} required />
        <h5>성별 </h5>
        <div className='radio'>
          <input type='radio' id='female' name='gender' value='여성' onChange={onChange} checked={gender === '여성'} />
          <label htmlFor='female'>여성</label>
          <input type='radio' id='male' name='gender' value='남성' onChange={onChange} checked={gender === '남성'} />
          <label htmlFor='male'>남성</label>
        </div>
        <input type='text' name='classfication' value={classification} className='classification' />

        <button type='submit' className='auth-btn'>
          가입하기
        </button>
      </form>
    </div>
  );
};

export default Signup;
