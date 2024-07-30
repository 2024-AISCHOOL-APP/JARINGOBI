import React, { useState } from "react";
import { Pie } from "react-chartjs-2";
import { ResponsiveLine } from '@nivo/line';
import "chart.js/auto";
import "./Dashboard.css";
// import { Navbar, Nav, Container } from "react-bootstrap";

// Line 차트 데이터 예시
const lineData = [
  {
    id: "japan",
    color: "hsl(251, 70%, 50%)",
    data: [
      { x: "01", y: 65 },
      { x: "02", y: 70 },
      { x: "03", y: 75 },
      { x: "04", y: 80 },
      { x: "05", y: 85 },
      { x: "06", y: 90 },
      { x: "07", y: 95 },
      { x: "08", y: 100 },
      { x: "09", y: 105 },
      { x: "10", y: 110 },
      { x: "11", y: 115 },
      { x: "12", y: 120 }
    ]
  }
];

// Pie 차트 데이터 예시
const pieData = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

// ResponsiveLine 컴포넌트
const MyResponsiveLine = ({ data }) => (
  <div style={{ height: '500px' }}>
    <ResponsiveLine
      data={data}
      margin={{ top: 5, right: 110, bottom: 50, left: 60 }}
      xScale={{ type: 'point' }}
      yScale={{
        type: 'linear',
        min: 'auto',
        max: 'auto',
        stacked: true,
        reverse: false
      }}
      yFormat=" >-.2f"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Month',
        legendOffset: 36,
        legendPosition: 'middle',
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: 'Value',
        legendOffset: -40,
        legendPosition: 'middle',
      }}
      pointSize={10}
      pointColor={{ theme: 'background' }}
      pointBorderWidth={2}
      pointBorderColor={{ from: 'serieColor' }}
      pointLabel="data.yFormatted"
      pointLabelYOffset={-12}
      enableTouchCrosshair={true}
      useMesh={true}
      legends={[
        {
          // anchor: 'bottom-right',
          anchor: 'top-left',
          direction: 'column',
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: 'left-to-right',
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: 'circle',
          symbolBorderColor: 'rgba(0, 0, 0, .5)',
          effects: [
            {
              on: 'hover',
              style: {
                itemBackground: 'rgba(0, 0, 0, .03)',
                itemOpacity: 1
              }
            }
          ]
        }
      ]}
    />
  </div>
);

const Dashboard = () => {
  const [isAnnual, setIsAnnual] = useState(false); // 연간 통계 여부를 상태로 관리합니다

  // 연간 통계와 월간 통계 버튼 클릭 시 상태를 변경합니다
  const handleAnnualClick = () => setIsAnnual(true);
  const handleMonthlyClick = () => setIsAnnual(false);

  const userPhoto = "./img/pennybody.jpg";
  return (
    <div>
      {/* <Navbar className="Navbar">
        <Container className="Container">
          <Navbar.Brand className="Navlogo" href="./img/pennybody.jpg">
            PennyWise
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav className="ml-auto">
              <Nav.Link href="/Main">
                <img src="img/con0.png" alt="Link Icon" />
              </Nav.Link>
              <Nav.Link href="#about">
                <img src="img/con3.png" alt="Link Icon" />
              </Nav.Link>
              <Nav.Link href="/Community">
                <img src="img/con1.png" alt="Link Icon" />
              </Nav.Link>
              <Nav.Link href="#about">
                <img src="img/con2.png" alt="Link Icon" />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <div className="dashboard">
        {/* 프로필 정보 섹션 */}
        <div className="profile-section">
          <div className="profile-header">
            <h2>프로필 정보</h2>
          </div>
          <div className="profile-info">
            <img src={userPhoto} alt="Profile" className="profile-img" />
            <div className="profile-details">
              <p>
                <strong>이름:</strong> 홍길동
              </p>
              <p>
                <strong>이메일:</strong> hong@example.com
              </p>
              <p>
                <strong>가입일:</strong> 2023-01-01
              </p>
            </div>
          </div>
        </div>

        {/* 통계 정보 섹션 */}
        <div className="stats-section">
          <div className="stats-header">
            <h2>가계부 통계</h2>
            <div className="stats-controls">
              <button
                className={`stats-btn ${!isAnnual ? "active" : ""}`}
                onClick={handleMonthlyClick}
              >
                월간 통계
              </button>
              <button
                className={`stats-btn ${isAnnual ? "active" : ""}`}
                onClick={handleAnnualClick}
              >
                연간 통계
              </button>
            </div>
          </div>
          <div className="stats-content">
            {isAnnual ? (
              <div className="annual-stats">
                <div className="chart-container chart-containerLine">
                  <MyResponsiveLine data={lineData} />
                </div>
                <div className="annual-stats-info">
                  <p>
                    <strong>연간 총 수입:</strong> 24,000,000 원
                  </p>
                  <p>
                    <strong>연간 총 지출:</strong> 18,000,000 원
                  </p>
                  <p>
                    <strong>연간 순이익:</strong> 6,000,000 원
                  </p>
                </div>
              </div>
            ) : (
              <div className="monthly-stats">
                <div className="chart-container chart-containerPie">
                  <Pie data={pieData} />
                </div>
                <div className="monthly-stats-info">
                  <p>
                    <strong>월간 총 수입:</strong> 2,000,000 원
                  </p>
                  <p>
                    <strong>월간 총 지출:</strong> 1,500,000 원
                  </p>
                  <p>
                    <strong>월간 순이익:</strong> 500,000 원
                  </p>
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
