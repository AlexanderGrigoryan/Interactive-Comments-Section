import styled from "styled-components";
import minusIcon from "../img/icon-minus.svg";
import plusIcon from "../img/icon-plus.svg";
import replyArrow from "../img/icon-reply.svg";
import edit from "../img/icon-edit.svg";
import deleteIcon from "../img/icon-delete.svg";
import data from "../data.json";
import Modal from "./Modal";
import { useState } from "react";

function Comments(props) {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <Container>
        <Info>
          <Avatar src={process.env.PUBLIC_URL + props.img} alt="User Avatar" />
          <Username>{props.name}</Username>
          {data.currentUser.username === props.name ? (
            <CurrentUser>you</CurrentUser>
          ) : null}
          <Date>{props.date}</Date>
        </Info>
        <Comment>{props.comment}</Comment>
        <CommonBlock>
          <Score>
            <ScoreButton>
              <Plus src={plusIcon} alt="plus" />
            </ScoreButton>
            <UserScore>{props.score}</UserScore>
            <ScoreButton>
              <Minus src={minusIcon} alt="minus" />
            </ScoreButton>
          </Score>
          {data.currentUser.username === props.name ? (
            <UserFunctions>
              <DeleteBlock>
                <Delete src={deleteIcon} alt="reply arrow" />
                <DeleteLink onClick={openModal}>Delete</DeleteLink>
              </DeleteBlock>
              <EditBlock>
                <EditIcon src={edit} alt="reply arrow" />
                <EditLink>Edit</EditLink>
              </EditBlock>
            </UserFunctions>
          ) : (
            <ReplyBlock>
              <ReplyIcon src={replyArrow} alt="reply arrow" />
              <ReplyLink>Reply</ReplyLink>
            </ReplyBlock>
          )}
        </CommonBlock>
        {isOpen ? (
          <Modal
            currentId={props.currentId}
            changeData={props.changeData}
            setChangeData={props.setChangeData}
            setIsOpen={setIsOpen}
          />
        ) : null}
      </Container>
    </>
  );
}

export default Comments;

const Container = styled.div`
  width: 343px;
  padding: 16px 16px 24px 16px;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
  margin-bottom: 16px;
`;

const Avatar = styled.img`
  width: 32px;
  height: 32px;
`;

const Username = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  color: #334253;
`;

const CurrentUser = styled.div`
  width: 36px;
  height: 19px;
  border-radius: 2px;
  background: #5357b6;
  font-size: 13px;
  font-weight: 500;
  line-height: 15px;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: -8px;
`;

const Date = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #67727e;
`;

const Comment = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #67727e;
`;

const CommonBlock = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 16px;
`;

const Score = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const ScoreButton = styled.button`
  display: flex;
  cursor: pointer;
`;

const Plus = styled.img``;

const UserScore = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  color: #5357b6;
`;

const Minus = styled.img``;

const ReplyBlock = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 8px;
`;

const ReplyIcon = styled.img`
  width: 14px;
  height: 12.25px;
`;

const ReplyLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #5357b6;
  cursor: pointer;
  text-decoration: none;
`;

const UserFunctions = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

const EditBlock = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 8px;
`;

const EditIcon = styled.img`
  width: 14px;
  height: 12.25px;
`;

const EditLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #5357b6;
  cursor: pointer;
  text-decoration: none;
`;

const DeleteBlock = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 8px;
`;

const Delete = styled.img`
  width: 14px;
  height: 12.25px;
`;

const DeleteLink = styled.button`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #ed6368;
  cursor: pointer;
  text-decoration: none;
`;
