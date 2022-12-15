import styled from "styled-components";
import Minus from "../svg/Minus";
import Plus from "../svg/Plus";
import replyArrow from "../img/icon-reply.svg";
import edit from "../img/icon-edit.svg";
import deleteIcon from "../img/icon-delete.svg";
import data from "../data.json";
import Modal from "./Modal";
import { useState } from "react";

function Reply({
  img,
  nameReply,
  dateReply,
  commentReply,
  scoreReply,
  currentId,
  changeData,
  setChangeData,
  replyId,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hideCurrentComment, setHideCurrentComment] = useState(false);
  const [replyValue, setReplyValue] = useState("");
  const [disablePlus, setDisablePlus] = useState(false);
  const [disableMinus, setDisableMinus] = useState(false);
  const [minusCount, setMinusCount] = useState(0);
  const [plusCount, setPlusCount] = useState(0);
  const [isReply, setIsReply] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function AppearTextArea() {
    setHideCurrentComment(true);
  }

  function confirmDelete() {
    const replyData = [...changeData];
    const deleteReply = replyData.findIndex(
      (element) => element.id === currentId
    );
    replyData[deleteReply].replies = replyData[deleteReply].replies.filter(
      (item) => item.id !== replyId
    );
    setChangeData(replyData);
    setIsOpen(false);
  }

  function updateReplyValue(event) {
    setReplyValue(event.target.value);
  }

  function updateReply() {
    const updatedData = [...changeData];
    const dataIndex = updatedData.findIndex(
      (element) => element.id === currentId
    );
    const currentReply = updatedData[dataIndex].replies.findIndex(
      (element) => element.id === replyId
    );
    updatedData[dataIndex].replies[currentReply].content = replyValue;
    setChangeData(updatedData);
    setHideCurrentComment(false);
  }

  function addReply() {
    if (replyValue.length > 0) {
      const replyData = [...changeData];
      const newReply = replyData.findIndex(
        (element) => element.id === currentId
      );
      replyData[newReply].replies.push({
        id: Math.random(),
        content: replyValue,
        createdAt: "Today",
        score: 0,
        replyingTo: replyData[newReply].user.username,
        user: {
          image: {
            png: data.currentUser.image.png,
            webp: data.currentUser.image.webp,
          },
          username: data.currentUser.username,
        },
      });
      setChangeData(replyData);
      setIsReply(false);
    } else {
      setIsReply(true);
    }
  }

  function getReplyValue(event) {
    setReplyValue(event.target.value);
  }

  function minusRate() {
    const updateMinus = [...changeData];
    const minusIndex = updateMinus.findIndex(
      (element) => element.id === currentId
    );
    const currentMinus = updateMinus[minusIndex].replies.findIndex(
      (element) => element.id === replyId
    );
    updateMinus[minusIndex].replies[currentMinus].score -= 1;
    setChangeData(updateMinus);
    setMinusCount(minusCount + 1);
    if (minusCount + 1 === 2 || (minusCount === 0 && plusCount === 0)) {
      setDisablePlus(false);
      setDisableMinus(true);
      setPlusCount(0);
    }
  }

  function plusRate() {
    const updatePlus = [...changeData];
    const plusIndex = updatePlus.findIndex(
      (element) => element.id === currentId
    );
    const currentPlus = updatePlus[plusIndex].replies.findIndex(
      (element) => element.id === replyId
    );
    updatePlus[plusIndex].replies[currentPlus].score += 1;
    setChangeData(updatePlus);
    setPlusCount(plusCount + 1);
    if (plusCount + 1 === 2 || (plusCount === 0 && minusCount === 0)) {
      setDisablePlus(true);
      setDisableMinus(false);
      setMinusCount(0);
    }
  }

  function showReply() {
    setIsReply(!isReply);
  }

  return (
    <>
      <Container>
        <ScoreResp>
          <ScoreButton disabled={disablePlus} onClick={plusRate}>
            <Plus />
          </ScoreButton>
          <UserScore>{scoreReply}</UserScore>
          <ScoreButton disabled={disableMinus} onClick={minusRate}>
            <Minus />
          </ScoreButton>
        </ScoreResp>
        <ReplyContainer>
          <UserInfo>
            <InfoContainer>
              <Avatar src={process.env.PUBLIC_URL + img} alt="User Avatar" />
              <Username>{nameReply}</Username>
              {data.currentUser.username === nameReply ? (
                <CurrentUser>you</CurrentUser>
              ) : null}
              <Date>{dateReply}</Date>
            </InfoContainer>
            {data.currentUser.username === nameReply ? (
              <FunctionsContainerResp>
                <UserFunctionsResp>
                  <DeleteBlock>
                    <Delete src={deleteIcon} alt="reply arrow" />
                    <DeleteLink onClick={openModal}>Delete</DeleteLink>
                  </DeleteBlock>
                  <EditBlock>
                    <EditIcon src={edit} alt="reply arrow" />
                    <EditLink onClick={AppearTextArea}>Edit</EditLink>
                  </EditBlock>
                </UserFunctionsResp>
              </FunctionsContainerResp>
            ) : (
              <ReplyBlockResp>
                <ReplyIcon src={replyArrow} alt="reply arrow" />
                <ReplyLink onClick={showReply}>Reply</ReplyLink>
              </ReplyBlockResp>
            )}
          </UserInfo>
          {hideCurrentComment ? (
            <TextAreaContainer>
              <TextArea
                defaultValue={commentReply}
                onChange={updateReplyValue}
              />
              <UpdateButton onClick={updateReply}>UPDATE</UpdateButton>
            </TextAreaContainer>
          ) : (
            <Comment>{commentReply}</Comment>
          )}
          <CommonBlock>
            <Score>
              <ScoreButton disabled={disablePlus} onClick={plusRate}>
                <Plus />
              </ScoreButton>
              <UserScore>{scoreReply}</UserScore>
              <ScoreButton disabled={disableMinus} onClick={minusRate}>
                <Minus />
              </ScoreButton>
            </Score>
            {data.currentUser.username === nameReply ? (
              <FunctionsContainer>
                <UserFunctions>
                  <DeleteBlock>
                    <Delete src={deleteIcon} alt="reply arrow" />
                    <DeleteLink onClick={openModal}>Delete</DeleteLink>
                  </DeleteBlock>
                  <EditBlock>
                    <EditIcon src={edit} alt="reply arrow" />
                    <EditLink onClick={AppearTextArea}>Edit</EditLink>
                  </EditBlock>
                </UserFunctions>
              </FunctionsContainer>
            ) : (
              <ReplyBlock>
                <ReplyIcon src={replyArrow} alt="reply arrow" />
                <ReplyLink onClick={showReply}>Reply</ReplyLink>
              </ReplyBlock>
            )}
          </CommonBlock>
          {isReply ? (
            <ReplyTextContainer>
              <ReplyImageResp
                src={process.env.PUBLIC_URL + data.currentUser.image.png}
                alt="avatar"
              />
              <ReplyTextArea onChange={getReplyValue} />
              <ReplyInfo>
                <ReplyImage
                  src={process.env.PUBLIC_URL + data.currentUser.image.png}
                  alt="avatar"
                />
                <ReplyButton onClick={addReply}>REPLY</ReplyButton>
                <ReplyButtonResp onClick={addReply}>REPLY</ReplyButtonResp>
              </ReplyInfo>
            </ReplyTextContainer>
          ) : null}
          {isOpen ? (
            <Modal
              currentId={currentId}
              changeData={changeData}
              setChangeData={setChangeData}
              setIsOpen={setIsOpen}
              onClick={confirmDelete}
            />
          ) : null}
        </ReplyContainer>
      </Container>
    </>
  );
}

export default Reply;

const Container = styled.div`
  max-width: 730px;
  width: 100%;
  padding: 16px 16px 24px 34px;

  @media (min-width: 768px) {
    display: flex;
    padding: 16px 16px 24px 74px;
  }
`;

const ReplyContainer = styled.div`
  max-width: 730px;
  width: 100%;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
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

  @media (min-width: 768px) {
    display: none;
  }
`;

const ScoreResp = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 20px;
    background: #f5f6fa;
    border-radius: 10px;
    margin-right: 30px;
    padding-top: 10px;
  }
`;

const ScoreButton = styled.button`
  display: flex;
  cursor: pointer;
`;

const UserScore = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 19px;
  color: #5357b6;
`;

const ReplyBlock = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;
  column-gap: 8px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ReplyBlockResp = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: flex;
    justify-content: end;
    align-items: center;
    column-gap: 8px;
  }
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
  transition: all ease 0.3s;
  &:hover {
    color: #c5c6ef;
  }
`;

const FunctionsContainer = styled.div`
  display: block;

  @media (min-width: 768px) {
    display: none;
  }
`;

const FunctionsContainerResp = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
`;

const UserFunctions = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;
`;

const UserFunctionsResp = styled.div`
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
  transition: all ease 0.3s;
  &:hover {
    color: #c5c6ef;
  }
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

const DeleteLink = styled.a`
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #ed6368;
  cursor: pointer;
  text-decoration: none;
  transition: all ease 0.3s;
  &:hover {
    color: #ffb8bb;
  }
`;

const TextAreaContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const TextArea = styled.textarea`
  max-width: 730px;
  width: 100%;
  min-height: 96px;
  border-radius: 8px;
  padding: 12px 24px;
  outline: 1px solid #5357b6;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  resize: none;
  margin-bottom: 16px;
  color: #67727e;
`;

const UpdateButton = styled.button`
  width: 104px;
  height: 48px;
  border-radius: 8px;
  background: #5357b6;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #ffffff;
  cursor: pointer;
  align-self: flex-end;
  transition: all ease 0.3s;
  &:hover {
    background: #c5c6ef;
  }
`;

const ReplyTextContainer = styled.div`
  margin-top: 24px;

  @media (min-width: 768px) {
    display: flex;
    column-gap: 16px;
  }
`;

const ReplyTextArea = styled.textarea`
  max-width: 506px;
  width: 100%;
  min-height: 96px;
  border-radius: 8px;
  padding: 12px 24px;
  outline: 1px solid #5357b6;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  resize: none;
  margin-bottom: 16px;
  color: #67727e;
`;

const ReplyInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ReplyImage = styled.img`
  width: 32px;
  height: 32px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const ReplyImageResp = styled.img`
  display: none;

  @media (min-width: 768px) {
    display: block;
    width: 32px;
    height: 32px;
  }
`;

const ReplyButton = styled.button`
  width: 104px;
  height: 48px;
  border-radius: 8px;
  background: #5357b6;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #ffffff;
  transition: all ease 0.3s;
  &:hover {
    background: #c5c6ef;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const ReplyButtonResp = styled.button`
  display: none;
  transition: all ease 0.3s;
  &:hover {
    background: #c5c6ef;
  }

  @media (min-width: 768px) {
    display: block;
    width: 104px;
    height: 48px;
    border-radius: 8px;
    background: #5357b6;
    font-size: 16px;
    font-weight: 500;
    line-height: 24px;
    color: #ffffff;
    align-self: baseline;
  }
`;
