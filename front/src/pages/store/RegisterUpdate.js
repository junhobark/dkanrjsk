// RegisterUpdate.js

import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, FormControl, FormLabel } from 'react-bootstrap';

function RegisterUpdate() {
  const [updateId, setUpdateId] = useState('');
  const [updateName, setUpdateName] = useState('');
  const [updateComment, setUpdateComment] = useState('');
  const [updatePhone, setUpdatePhone] = useState('');
  const [updateAddr, setUpdateAddr] = useState('');
  const [updateType, setUpdateType] = useState('');
  const [updateImg, setUpdateImg] = useState(null);

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('id', updateId); // 이거는 페이지 url에 나타나서 가져와야 함 실제로는
      formData.append('name', updateName);
      formData.append('comment', updateComment);
      formData.append('phone', updatePhone);
      formData.append('addr', updateAddr);
      formData.append('type', updateType);
      formData.append('memberId', 1); // 이거는 페이지 url에 나타나서 가져와야 함 실제로는
      formData.append('imgFile', updateImg);

      console.log('전송 데이터 :', Object.fromEntries(formData));
      
      const response = await axios.put(`http://localhost:8081/api/location/update/${updateId}`, formData, {
        withCredentials: false, // credentials 설정
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('수정 성공:', response.data);
    } catch (error) {
      console.error('에러 발생:', error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setUpdateImg(file);
  };

  return (
    <Container>
    <h2>매장(업소) 수정하기</h2>
    <Form>
    <Form.Group className="mb-3" controlId="updateId">
        <Form.Label>수정할 ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="수정할 ID값을 입력하세요"
          name="updateId"
          value={updateId}
          onChange={(e) => setUpdateId(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="updateName">
        <Form.Label>매장 이름</Form.Label>
        <Form.Control
          type="text"
          placeholder="매장 이름을 입력하세요"
          name="updateName"
          value={updateName}
          onChange={(e) => setUpdateName(e.target.value)} 
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="updateComment">
        <Form.Label>매장 코멘트</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          rows={3}
          cols={40}
          placeholder="ex. 월 11:30 - 22:00
          14:50 - 17:00 브레이크타임
          21:00 라스트오더"
          name="updateComment"
          value={updateComment}
          onChange={(e) => setUpdateComment(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="updatePhone">
        <Form.Label>매장 전화번호</Form.Label>
        <Form.Control
          type="text"
          placeholder="매장 전화번호를 입력하세요"
          name="updatePhone"
          value={updatePhone}
          onChange={(e) => setUpdatePhone(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="updateAddr">
        <Form.Label>매장 주소</Form.Label>
        <Form.Control
          type="text"
          placeholder="매장 주소를 입력하세요"
          name="updateAddr"
          value={updateAddr}
          onChange={(e) => setUpdateAddr(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="updateType">
        <Form.Label>매장 타입</Form.Label>
        <Form.Control
          type="text"
          name="updateType"
          placeholder="SIGHTS, CAFE, RESTAURANT, PLAYGROUND"
          value={updateType}
          onChange={(e) => setUpdateType(e.target.value)}
        />
      </Form.Group>

      {/* <Form.Group className="mb-3" controlId="formRegistrationNumber">
        <Form.Label>사업자 등록 번호</Form.Label>
        <Form.Control
          type="text"
          placeholder="사업자 등록 번호를 입력하세요"
          name="registrationNumber"
          value={formData.registrationNumber}
          onChange={handleChange}
        />
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="formImage">
        <FormLabel>매장 이미지</FormLabel>
        <FormControl
          input type="file" onChange={handleImageChange} />
      </Form.Group>

       <Button type="button" onClick={handleUpdate}>
        수정하기
      </Button> 
      
    </Form>
  </Container>
  );
}

export default RegisterUpdate;