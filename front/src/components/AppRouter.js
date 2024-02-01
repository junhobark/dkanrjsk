// src/components/AppRouter2.js
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import base64 from 'base-64';
import React, { useState, useEffect } from 'react';

// import jwt from 'jsonwebtoken';

const AppRouter = (props) => {
  const [data, setData] = useState([]);
  // token 처리
  const decodingToken = (token) => {
    let payload = token.substring(token.indexOf('.')+1,token.lastIndexOf('.'));
    let dec = base64.decode(payload)
  }
 // const accessToken = localStorage.getItem('acessToken');
  
  // if (accessToken !== null) {
  //   const decodedToken = decodingToken(accessToken);
  // }
  // console.log(accessToken);

  useEffect(() => {
    fetchData(); // 초기 데이터 가져오기
  }, []);

  const fetchData = () => {
    fetch("http://localhost:3001/signin/")
      .then(res => res.json())
      .then(data => setData(data))
      .catch(error => console.error("Error fetching data:", error));
  };

  const navigate = useNavigate();

  const handleHomeClick = () => {
    // 홈 버튼 클릭 시 페이지 새로고침
    navigate('/');
    window.location.reload();
  };

  

  return (
    <div>
      <style>
        {`
          a {
            text-decoration: none;
            color: #333;
          }
          a:hover {
            font-weight: bold;
          }
        `}
      </style>

      <nav>
      {data.accessToken === true ? (
            <ul style={{ listStyleType: 'none', display: 'flex', marginRight: '20px', padding: 0 }}>
              <li style={{ marginRight: '10px' }}>
                <Link to="/" onClick={handleHomeClick}>Home</Link>
              </li>
              <li style={{ marginRight: '10px' }}> | </li>
              <li style={{ marginRight: '10px' }}>
                <Link to="/O_InterestPlace">마이페이지</Link>
              </li>
              <li style={{ marginRight: '10px' }}> | </li>
              <li>
                <Link to="/logout">로그아웃</Link>
              </li>
            </ul>
          ) : (
            <ul style={{ listStyleType: 'none', display: 'flex', marginRight: '20px', padding: 0 }}>
              <li style={{ marginRight: '10px' }}>
                <Link to="/" onClick={handleHomeClick}>Home</Link>
              </li>
              <li style={{ marginRight: '10px' }}> | </li>
              <li style={{ marginRight: '10px' }}>
                <Link to="/login">로그인</Link>
              </li>
              <li style={{ marginRight: '10px' }}> | </li>
              <li>
                <Link to="/signup">회원가입</Link>
              </li>
            </ul>
          )
        }
        
      </nav>
    </div>
  );
};


export default AppRouter;