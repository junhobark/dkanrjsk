import styled from "styled-components";
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StoreItem = (props) => {
    const navigate = useNavigate();
    // 클릭 시 해당 상점의 상세 페이지로 이동합니다.(props설정해서 id값 전달하는 방향으로 나중에 코드 수정)
        //navigate(`/detail/${props.reg_id}`);
    const goToStoreDetail = () => {
        navigate('/detail', { state: { reg_id: props.reg_id } });
    }

    // const byteCharacters = atob(props.img);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //     byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);

    // let image = new Blob([byteArray], { type: 'image/jpeg' });
    // let imageUrl = URL.createObjectURL(image);
    // this.setState({image: imageUrl});

    return (
        <StoreContainer onClick={goToStoreDetail}>
            {/* <StoreImg src={this.state.image}/> */}
            <StoreImg src={`data:image/jpeg;base64,${props.img}`}/>
            <TextContainer>
                <StoreNameTxt>{props.name}</StoreNameTxt>
                <StoreRatingTxt>{props.rating}</StoreRatingTxt>
            </TextContainer>
        </StoreContainer>
    );
}


const StoreContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 260px;
    margin-right: 40px;
    margin-bottom: 13px;
`;

const StoreImg = styled.img`
    width: 260px;
    height: 200px;
`;

const TextContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 13px;
`;

const StoreNameTxt = styled.div`
    color: #61677A;
    font-size: 20px;
    margin-left: 10px;
    font-weight: 800;
`;

const StoreRatingTxt = styled.div`
    color: #61677A;
    margin-right: 10px;
    font-weight: 800;
`;

export default StoreItem;
