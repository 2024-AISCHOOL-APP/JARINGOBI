import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { useAuth } from '../context/AuthProvider';
import { Pie, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import {
  calculateStatistics,
  formatStatistics,
  calculateMonthlyStatistics,
  formatMonthlyStatistics
} from '../additional/account.js';


const Dashboard = ({ accountService }) => {
  const userPhoto = './img/profile.jpg';
  const { user } = useAuth();

  const [accountsMonth, setAccountsMonth] = useState(null);
  const [accountsYear, setAccountsYear] = useState(null);
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const [isAnnual, setIsAnnual] = useState(false);
  let userCreAt = user.user.createdAt;
  userCreAt = userCreAt.split('T')[0]
  const userInfo = {
    id: user.user.id,
    name: user.user.name,
    nick: user.user.nick,
    addr: user.user.addr,
    gender: user.user.gender,
    email: user.user.email,
    classification: user.user.classification,
    createdAt: userCreAt,
    loginedAt: user.user.loginedAt,
  };
  const [monthCalVal, setMonthCalVal] = useState({
    expense: 0,
    income: 0,
    netIncome: 0
  });
  const [yearCalVal, setYearCalVal] = useState({
    expense: 0,
    income: 0,
    netIncome: 0
  });
  const [pieData, setPieData] = useState({
    labels: [],
    datasets: [
      {
        label: '지출 항목별',
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });
  const [lineChartData, setLineChartData] = useState({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    accountService
      .getAccounts(user.userId, currentYear, currentMonth, 0)
      .then((accounts) => {
        setAccountsMonth([...accounts]);
      })
  }, [currentMonth, currentYear]);

  useEffect(() => {
    if (accountsMonth) {
      const statistics = calculateStatistics(accountsMonth);
      const formattedStatistics = formatStatistics(statistics);

      const income = formattedStatistics['수입']?.total || 0;
      const expense = formattedStatistics['지출']?.total || 0;
      const profit = income - expense;

      setMonthCalVal({
        income: income,
        expense: expense,
        netIncome: profit
      });

      if (formattedStatistics['지출']?.items) {
        const expenseData = formattedStatistics['지출'].items;
        const labels = Object.keys(expenseData);
        const data = Object.values(expenseData);
        const backgroundColor = labels.map(
          () => `rgba(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.2)`
        );
        const borderColor = backgroundColor.map(color => color.replace('0.2', '1'));

        setPieData({
          labels: labels,
          datasets: [
            {
              label: '지출 항목별',
              data: data,
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              borderWidth: 1,
            },
          ],
        });
      } else {
        setPieData({
          labels: [],
          datasets: [
            {
              label: '지출 항목별',
              data: [],
              backgroundColor: [],
              borderColor: [],
              borderWidth: 1,
            },
          ],
        });
      }
    }
  }, [accountsMonth]);

  useEffect(() => {
    if (isAnnual && !accountsYear) {
      getAccountYearInfo();
    }
  }, [isAnnual, accountsYear]);

  const getAccountYearInfo = async () => {
    accountService
      .getAccounts(user.userId, currentYear, 0, 0)
      .then((accounts) => {
        setAccountsYear([...accounts]);
      })
  };

  useEffect(() => {
    if (accountsYear) {
      const yearData = formatMonthlyStatistics(calculateMonthlyStatistics(accountsYear));
      const months = ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'];
      const incomeData = months.map(month => yearData[month]?.수입?.total || 0);
      const expenseData = months.map(month => yearData[month]?.지출?.total || 0);

      const income = incomeData.reduce((acc, curr) => acc + curr, 0);
      const expense = expenseData.reduce((acc, curr) => acc + curr, 0);
      const profit = income - expense;

      setYearCalVal({
        income: income,
        expense: expense,
        netIncome: profit
      });

      const lineChartData = {
        labels: months,
        datasets: [
          {
            label: '수입',
            data: incomeData,
            borderColor: 'rgb(75, 192, 192)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true,
          },
          {
            label: '지출',
            data: expenseData,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
          },
        ],
      };
      setLineChartData(lineChartData);
    }
  }, [accountsYear]);

  const handleMonthChange = (increment) => {
    const newMonth = currentMonth + increment;
    if (newMonth < 1) {
      setCurrentMonth(12);
      setCurrentYear(currentYear - 1);
    } else if (newMonth > 12) {
      setCurrentMonth(1);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(newMonth);
    }
  };

  return (
    <div>
      <div className="dashboard">
        <div className="profile-section">
          <div className="profile-header">
            <h2>프로필 정보</h2>
          </div>
          <div className="profile-info">
            <img src={userPhoto} alt="Profile" className="profile-img" />
            <div className="profile-details">
              <p><strong>이름:</strong> {userInfo.name}</p>
              <p><strong>아이디:</strong> {userInfo.id}</p>
              <p><strong>닉네임:</strong> {userInfo.nick}</p>
              <p><strong>이메일:</strong> {userInfo.email}</p>
              <p><strong>가입일:</strong> {userInfo.createdAt}</p>
              <p><strong>구분:</strong> {userInfo.classification}</p>
            </div>
          </div>
        </div>

        <div className="stats-section">
          <div className="stats-header">
            <h2>가계부 통계</h2>
            <div className="stats-controls">
              <button
                className={`stats-btn ${!isAnnual ? 'active' : ''}`}
                onClick={() => setIsAnnual(false)}
              >
                월간 통계
              </button>
              <button
                className={`stats-btn ${isAnnual ? 'active' : ''}`}
                onClick={() => setIsAnnual(true)}
              >
                연간 통계
              </button>
            </div>
          </div>
          <div className="stats-content">
            {isAnnual ? (
              <div className="annual-stats">
                <h3>{currentYear}년</h3>
                <div className="chart-container chart-containerLine">
                  <Line
                    data={lineChartData}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        tooltip: {
                          callbacks: {
                            label: function (tooltipItem) {
                              return `${tooltipItem.dataset.label}: ${tooltipItem.raw} 원`;
                            },
                          },
                        },
                      },
                      scales: {
                        x: {
                          title: {
                            display: true,
                            text: '월',
                          },
                        },
                        y: {
                          title: {
                            display: true,
                            text: '금액',
                          },
                          beginAtZero: true,
                        },
                      },
                    }}
                  />
                </div>
                <div className="annual-stats-info">
                  <p><strong>연간 총 수입:</strong> {yearCalVal.income} 원</p>
                  <p><strong>연간 총 지출:</strong> {yearCalVal.expense} 원</p>
                  <p><strong>연간 순이익:</strong> {yearCalVal.netIncome} 원</p>
                </div>
              </div>
            ) : (
              <div className="monthly-stats">
                <div className="month-navigation">
                  <button onClick={() => handleMonthChange(-1)}>{'<'}</button>
                  <h3>{currentMonth}월</h3>
                  <button onClick={() => handleMonthChange(1)}>{'>'}</button>
                </div>
                <div className="monthly-stats-body">
                  <div className="chart-container chart-containerPie">
                    <Pie data={pieData} />
                  </div>
                  <div className="monthly-stats-info">
                    <p><strong>월간 총 수입:</strong> {monthCalVal.income} 원</p>
                    <p><strong>월간 총 지출:</strong> {monthCalVal.expense} 원</p>
                    <p><strong>월간 순이익:</strong> {monthCalVal.netIncome} 원</p>
                  </div>
                </div>
              </div>

            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
