// LogoutPage.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

async function updateaccessToken() {
  const url = 'http://localhost:3001/signin'; // PUT 요청을 보낼 엔드포인트
  const data = {  accessToken : false  }; // 업데이트할 데이터
  try {
     const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    if (!response.ok) {
      alert('Network response was not ok');
      throw new Error('Network response was not ok');
    }
    console.log('successfully!');
  } catch (error) {
    console.error('Error updating interest:', error);
  }

}

function LogoutPage() {
  const navigate = useNavigate();
  updateaccessToken()
  useEffect(() => {
    // 로그아웃 로직 추가

    // 예시: 로그아웃 후 이동할 페이지
    navigate('/'); // '/'는 로그아웃 후 이동할 페이지 경로입니다.
    window.location.reload();
  }, [navigate]);

  return (
    <div>
      <h2>로그아웃 중...</h2>
      {/* 원하는 로그아웃 중인 메시지를 표시할 수 있습니다. */}
    </div>
  );
}

export default LogoutPage;
