import './LandingStyle.css';

const Landing = () => {
  return (
    <div className='landing-container'>
      <div className='main one'>
        <p className='txt'>
          <img src='img/account.png' alt='노트이미지' /> 쉽고 간단하게 가계부를 작성하세요
        </p>
      </div>
      <div className='main two'>
        <p className='txt'>
          내 수입/지출 내역을 그래프로
          <br /> 확인해보세요
          <img src='img/graph.png' alt='그래프이미지' />
        </p>
      </div>
      <div className='main thr'>
        <p className='txt'>
          <img src='img/community.png' alt='노트이미지' /> 사람들과 금융 꿀팁을 공유해보세요
        </p>
      </div>
    </div>
  );
};

export default Landing;
