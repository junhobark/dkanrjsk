// src/pages/InterestPlace.js
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { Link } from "react-router-dom";

const listStyle = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    cursor: "pointer",
  },
  tableHead: {
    backgroundColor: "#D1E8C4",
  },
  tableCell: {
    padding: "12px 16px",
    borderBottom: "1px solid #ddd",
    cursor: "pointer",
    textAlign: "center",
  },
};

const navStyle = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
    textAlign: "center",
  },
  tableHead: {
    backgroundColor: "#D1E8C4",
  },
  tableCell: {
    paddingBottom: "10px",

    textAlign: "center",
  },

  link: {
    textDecoration: "none",
    color: "#000",
    display: "block",
    width: "100%",
    textAlign: "center",
    fontWeight: "normal",
    transition: "background-color 0.3s",
    "&:hover": {
      backgroundColor: "#fff",
      fontWeight: "bold",
    },
  },
};

const InterestPlace = () => {
  // 입력된 장소
  const [placeName, setPlaceName] = useState("");
  // 선택된 업종
  const [category, setCategory] = useState("");
  // 목록
  const [interestPlaces, setInterestPlaces] = useState([]);

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 테스트용 데이터 --------------------------------------------------------------------------------------------------------
        // const testData = [
        //   { id: 1, name: "장소 1", category: "카페", rating: 4.5 },
        //   { id: 2, name: "장소 2", category: "음식점", rating: 3.8 },
        //   { id: 3, name: "장소 3", category: "카페", rating: 3.8 },
        //   { id: 4, name: "place 4", category: "음식점", rating: 3.8 },
        // ];

        // const searchResults = testData;

        // setInterestPlaces(searchResults);

        // ---------------------------------------------------------------------------------------
        // 서버 엔드포인트 URL
        const apiUrl = 'https://jsonplaceholder.typicode.com/places';

        // 서버에서 초기 데이터 가져오기
        const response = await fetch(apiUrl);

        // 서버 응답 성공 여부 확인
        if (!response.ok) {
          throw new Error('서버 응답이 실패했습니다.');
        }

        // 서버에서 받아온 데이터 처리
        const initialData = await response.json();

        // 초기 데이터를 목록에 업데이트
        setInterestPlaces(initialData);
        // ---------------------------------------------------------------------------------------
      } catch (error) {
        console.error("데이터 로딩 중 오류가 발생했습니다:", error.message);
      }
    };

    // 페이지가 처음 호출되었을 때 초기 데이터 로딩 실행
    fetchInitialData();
  }, []);

  const handleSearch = async () => {
    try {
      // 테스트용 데이터 --------------------------------------------------------------------------------------------------------
      // const testData = [
      //   { id: 1, name: "장소 1", category: "카페", rating: 4.5 },
      //   { id: 2, name: "장소 2", category: "음식점", rating: 3.8 },
      //   { id: 3, name: "장소 3", category: "카페", rating: 3.8 },
      //   { id: 4, name: "place 4", category: "음식점", rating: 3.8 },
      // ];

      // const searchResults = testData;
      // ---------------------------------------------------------------------------------------

      // 서버 엔드포인트 URL
      const apiUrl = 'https://jsonplaceholder.typicode.com/places';

      // 서버로 전송할 데이터
      const requestData = {
        placeName,
        category,
      };

      // Fetch API를 사용하여 서버에 데이터 전송
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          //'Content-Type': 'application/json',

        },
        // 검색 결과 목록 전송
        body: JSON.stringify(requestData),
      });

      // 응답이 성공적인지 확인
      if (!response.ok) {
        throw new Error('서버 응답이 실패했습니다.');
      }

      // 서버에서 받아온 데이터 처리
      const searchResults = await response.json();

      // ---------------------------------------------------------------------------------------

      let filteredResults = searchResults;

      // 카테고리 필터링
      if (category) {
        filteredResults = filteredResults.filter(
          (place) => place.category === category
        );
      }

      // 장소 이름 필터링
      if (placeName) {
        filteredResults = filteredResults.filter(
          (place) => place.name.toLowerCase().indexOf(placeName) !== -1
        );
      }

      setInterestPlaces(filteredResults);
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다:", error.message);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      {/* 네비게이션 영역 */}
      <div style={{ width: "20%", padding: "2%", paddingTop: "5%" }}>
        {/* 네비게이션 바 */}
        <nav
          style={{
            backgroundColor: "#99D98C",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <table style={{ ...navStyle.table }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #fff" }}>
                <td style={{ paddingTop: "10px", ...navStyle.tableCell }}>
                  분류
                </td>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td style={{ ...navStyle.tableCell, paddingTop: "10px" }}>
                  <Link to="/C_InterestPlace" style={{ ...navStyle.link }}>
                    관심 장소
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ ...navStyle.tableCell }}>
                  <Link to="/C_WrittenReview" style={{ ...navStyle.link }}>
                    내가 작성한 리뷰
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ ...navStyle.tableCell }}>
                  <Link to="/C_ModifyInformation" style={{ ...navStyle.link }}>
                    내 정보 수정
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </nav>
      </div>
      <div style={{ padding: "5%", width: "80%" }}>
        {/* 검색 */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 0,
            marginLeft: "20%",
          }}
        >
          {/* 업종 */}
          <p style={{ width: "10%", marginLeft: "20px" }}>업종 : </p>
          <select
            style={{
              textAlign: "center",
              border: "1px solid #333",
              width: "20%",
              marginRight: "20px",
              height: "30px",
            }}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">전체</option>
            <option value="카페">카페</option>
            <option value="음식점">음식점</option>
            <option value="명소">명소</option>
            <option value="놀거리">놀거리</option>
          </select>
          {/* 장소이름 */}
          <input
            type="text"
            id="place_name_search"
            placeholder="장소 이름을 입력하세요."
            style={{ width: "40%", height: "30px" }}
            value={placeName}
            onChange={(e) => setPlaceName(e.target.value)}
          />
          <button
            style={{
              width: "40px",
              height: "40px",
              marginLeft: "10px",
              backgroundColor: "#99D98C",
              border: "0",
            }}
            onClick={handleSearch}
          >
            {" "}
            <IoSearch size={20} />{" "}
          </button>
        </div>

        {/* 목록 제목 및 개수 */}
        <p style={{ width: "20%", textAlign: "left" }}>
          관심 장소 ({interestPlaces.length}개)
        </p>

        {/* 목록 테이블 */}
        <div style={{ paddingTop: "5px" }}>
          <table style={listStyle.table}>
            <thead
              style={{ borderBottom: "1px solid #333", ...listStyle.tableHead }}
            >
              <tr>
                <th style={listStyle.tableCell}>목록</th>
                <th style={listStyle.tableCell}>장소</th>
                <th style={listStyle.tableCell}>업종</th>
                <th style={listStyle.tableCell}>평점</th>
              </tr>
            </thead>
            <tbody>
              {interestPlaces.map((place, index) => (
                <tr key={place.id}>
                  <td style={listStyle.tableCell}>{index + 1}</td>
                  <td style={listStyle.tableCell}>{place.name}</td>
                  <td style={listStyle.tableCell}>{place.category}</td>
                  <td style={listStyle.tableCell}>{place.rating}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default InterestPlace;
