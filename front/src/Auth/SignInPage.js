import { useState } from "react";
import { login } from "./AuthAPI";
// import Container from 'react-bootstrap/Container';
// import Form from 'react-bootstrap/Form';
// import '../Layout/LoginPage.css';
import { Form, Button, Container, FormControl, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
//로그인페이지 email, password
export default function SignInPage() {
    const navigate = useNavigate();
    const [values, setValues] = useState({
        email: "",
        password: "",
    });

    const handleChange = async (e) => {
        setValues({...values,
            [e.target.id]: e.target.value,
        });
    }

    const handleSubmit = async (e) => {
        onSignin()
        // login(values)
        // .then((response) => {
        //     localStorage.clear();
        //     localStorage.setItem('tokenType', response.tokenType);
        //     localStorage.setItem('accessToken', response.accessToken);
        //     localStorage.setItem('refreshToken', response.refreshToken);
        //     window.location.href = `/home`;
        // }).catch((error) => {
        //     console.log(error);
        // });
    }

    async function updateaccessToken() {
        const url = 'http://localhost:3001/signin'; // PUT 요청을 보낼 엔드포인트
        const data = {  accessToken : true  }; // 업데이트할 데이터
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
  
    // POST 요청 보내기
    
    const onSignin = () => {
        if (window.confirm("로그인 하시겠습니까??")) {
            updateaccessToken();
            alert("로그인되었습니다.");
            navigate('/');
            window.location.reload();
        } else {
    
            alert("취소합니다.");
        }
    };
    
    return (

        <Container>
            <h2>로그인</h2>
            <Form>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                        type="text"
                        id="email" 
                        placeholder="이메일을 입력하세요"
                        name="email"
                        value={values.email}
                        onChange={handleChange}
                    />
                    </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                    <Form.Label>비밀번호</Form.Label>
                    <Form.Control
                        type="password"
                        id="password" 
                        placeholder="비밀번호를 입력하세요"
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                    />
                    </Form.Group>

                    <Button type="submit" onClick={handleSubmit}>
                        로그인
                    </Button> 

            </Form>
        </Container>
    );
}