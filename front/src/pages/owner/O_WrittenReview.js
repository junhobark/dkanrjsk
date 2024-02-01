// src/pages/WrittenReview.js
import React, { useState, useEffect } from "react";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const listStyle = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  tableHead: {
    backgroundColor: "#D1E8C4",
  },
  tableCell: {
    padding: "12px 16px",
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

const WrittenReview = () => {
  // 입력된 장소

  const [placeName, setPlaceName] = useState("");

  // 목록
  const [writtenReviews, setWrittenReviews] = useState([]);

  const navigate = useNavigate();

  // 초기 데이터 가져오기
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        // 서버 엔드포인트 URL
        const apiUrl = "http://localhost:3001/detailpage";

        // 서버에서 초기 데이터 가져오기
        const response = await fetch(apiUrl);

        // 서버 응답 성공 여부 확인
        if (!response.ok) {
          throw new Error("서버 응답이 실패했습니다.");
        }

        // 서버에서 받아온 데이터 처리
        const initialData = await response.json();

        // 초기 데이터를 목록에 업데이트
        setWrittenReviews(initialData);
      } catch (error) {
        console.error("데이터 로딩 중 오류가 발생했습니다:", error.message);
      }
    };

    // 페이지가 처음 호출되었을 때 초기 데이터 로딩 실행
    fetchInitialData();
  }, []);

  const handleSearch = async () => {
    try {
      // 서버 엔드포인트 URL
      const apiUrl = "https://jsonplaceholder.typicode.com/places";
      const index=0;
      // 서버로 전송할 데이터
      const requestData = {
        placeName,
      };

      // Fetch API를 사용하여 서버에 데이터 전송
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          //'Content-Type': 'application/json',
        },
        // 검색 결과 목록 전송
        body: JSON.stringify(requestData),
      });

      // 응답이 성공적인지 확인
      if (!response.ok) {
        throw new Error("서버 응답이 실패했습니다.");
      }

      // 서버에서 받아온 데이터 처리
      const searchResults = await response.json();

      // 서버에서 받아온(처리된 데이터) 검색 결과 업데이트
      setWrittenReviews(searchResults);
    } catch (error) {
      console.error("검색 중 오류가 발생했습니다:", error.message);
    }
  };

  const handleModify = (place) => {
    // 수정 버튼 클릭 시 해당 장소의 이름을 ModifyPage 페이지로 전달
    navigate("/ModifyPage", { placeName: place.name });
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
                  <Link to="/O_RegisteredPlace" style={{ ...navStyle.link }}>
                    내가 등록한 장소
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ ...navStyle.tableCell }}>
                  <Link to="/O_InterestPlace" style={{ ...navStyle.link }}>
                    관심 장소
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ ...navStyle.tableCell }}>
                  <Link to="/O_WrittenReview" style={{ ...navStyle.link }}>
                    내가 작성한 리뷰
                  </Link>
                </td>
              </tr>
              <tr>
                <td style={{ ...navStyle.tableCell }}>
                  <Link to="/O_ModifyInformation" style={{ ...navStyle.link }}>
                    내 정보 수정
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </nav>
      </div>
      <div style={{ padding: "2%", width: "80%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            marginBottom: 0,
            marginLeft: "20%",
          }}
        >
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
        <div>
          
  {writtenReviews.map((item) => (
    <div key={item.id}>
     
        <p style={{ width: "20%", textAlign: "left" }}>
        내가 작성한 리뷰 ({item.review.filter(review => review.email === "wnsh66@naver.com").length}개)
      </p>
      

      {/* 목록 테이블 */}
      <div style={{ paddingTop: "5px" }}>
        <table style={listStyle.table}>
          <thead style={{ ...listStyle.tableHead }}>
            <tr>
              <th style={{ ...listStyle.tableCell, width: "10%" }}>목록</th>
              <th style={{ ...listStyle.tableCell, width: "20%" }}>장소</th>
              <th style={{ ...listStyle.tableCell, width: "30%" }}>내용</th>
              <th style={{ ...listStyle.tableCell, width: "20%" }}>나의 평점</th>
              <th
                style={{
                  ...listStyle.tableCell,
                  width: "20%",
                  backgroundColor: "#fff",
                  borderBottom: "none",
                }}
              ></th>
            </tr>
          </thead>
          <tbody>
            {item.review.map((review, index) => (
              review.email === "wnsh66@naver.com" && (
                <tr key={review.id} onClick={() => navigate('/detail', { state: { reg_id: item.id } })}>
                  <td style={{ ...listStyle.tableCell, width: "10%" }}>1</td>
                  <td style={{ ...listStyle.tableCell, width: "20%" }}>{item.name}</td>
                  <td style={{ ...listStyle.tableCell, width: "30%" }}>{review.detail}</td>
                  <td style={{ ...listStyle.tableCell, width: "20%" }}>{review.grade}</td>
                </tr>
              )
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ))}
</div>
      </div>
    </div>
  );
};

export default WrittenReview;
