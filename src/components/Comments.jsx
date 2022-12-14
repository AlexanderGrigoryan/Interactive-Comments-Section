import styled from "styled-components";
import minusIcon from "../img/icon-minus.svg";
import plusIcon from "../img/icon-plus.svg";
import replyArrow from "../img/icon-reply.svg";
import edit from "../img/icon-edit.svg";
import deleteIcon from "../img/icon-delete.svg";
import data from "../data.json";
import Modal from "./Modal";
import { useState } from "react";

function Comments({
  commentValue,
  setCommentValue,
  currentId,
  changeData,
  setChangeData,
  img,
  name,
  date,
  comment,
  score,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [hideCurrentComment, setHideCurrentComment] = useState(false);
  const [disablePlus, setDisablePlus] = useState(false);
  const [disableMinus, setDisableMinus] = useState(false);
  const [minusCount, setMinusCount] = useState(0);
  const [plusCount, setPlusCount] = useState(0);
  const [isReply, setIsReply] = useState(false);
  const [replyValue, setReplyValue] = useState("");

  function openModal() {
    setIsOpen(true);
  }

  function updateCommentValue(event) {
    setCommentValue(event.target.value);
  }

  function AppearTextArea() {
    setHideCurrentComment(true);
  }

  function updateComment() {
    const updatedData = [...changeData];
    const dataIndex = updatedData.findIndex(
      (element) => element.id === currentId
    );
    updatedData[dataIndex].content = commentValue;
    setChangeData(updatedData);
    setHideCurrentComment(false);
  }

  function minusRate() {
    const updateMinus = [...changeData];
    const minusIndex = updateMinus.findIndex(
      (element) => element.id === currentId
    );
    updateMinus[minusIndex].score -= 1;
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
    updatePlus[plusIndex].score += 1;
    setChangeData(updatePlus);
    setPlusCount(plusCount + 1);
    if (plusCount + 1 === 2 || (plusCount === 0 && minusCount === 0)) {
      setDisablePlus(true);
      setDisableMinus(false);
      setMinusCount(0);
    }
  }

  function showReply() {
    setIsReply(true);
  }

  function getReplyValue(event) {
    setReplyValue(event.target.value);
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

  function confirmDelete() {
    setChangeData((current) => current.filter((item) => item.id !== currentId));
    setIsOpen(false);
  }

  return (
    <>
      <Container>
        <ScoreResp>
          <ScoreButton disabled={disablePlus} onClick={plusRate}>
            <Plus src={plusIcon} alt="plus" />
          </ScoreButton>
          <UserScore>{score}</UserScore>
          <ScoreButton disabled={disableMinus} onClick={minusRate}>
            <Minus src={minusIcon} alt="minus" />
          </ScoreButton>
        </ScoreResp>
        <CommentContainer>
          <Info>
            <InfoContainer>
              <Avatar src={process.env.PUBLIC_URL + img} alt="User Avatar" />
              <Username>{name}</Username>
              {data.currentUser.username === name ? (
                <CurrentUser>you</CurrentUser>
              ) : null}
              <Date>{date}</Date>
            </InfoContainer>
            {data.currentUser.username === name ? (
              <FunctionsContainer>
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
              </FunctionsContainer>
            ) : (
              <ReplyBlockResp>
                <ReplyIcon src={replyArrow} alt="reply arrow" />
                <ReplyLink onClick={showReply}>Reply</ReplyLink>
              </ReplyBlockResp>
            )}
          </Info>
          {hideCurrentComment ? (
            <TextAreaContainer>
              <TextArea defaultValue={comment} onChange={updateCommentValue} />
              <UpdateButton onClick={updateComment}>UPDATE</UpdateButton>
            </TextAreaContainer>
          ) : (
            <Comment>{comment}</Comment>
          )}
          <CommonBlock>
            <Score>
              <ScoreButton disabled={disablePlus} onClick={plusRate}>
                <Plus src={plusIcon} alt="plus" />
              </ScoreButton>
              <UserScore>{score}</UserScore>
              <ScoreButton disabled={disableMinus} onClick={minusRate}>
                <Minus src={minusIcon} alt="minus" />
              </ScoreButton>
            </Score>
            {data.currentUser.username === name ? (
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
        </CommentContainer>
      </Container>
    </>
  );
}

export default Comments;

const Container = styled.div`
  padding: 16px 16px 24px 16px;
  max-width: 730px;

  @media (min-width: 768px) {
    display: flex;
  }
`;

const CommentContainer = styled.div`
  max-width: 730px;
  width: 100%;
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
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
  background: #f5f6fa;
  border-radius: 10px;

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

  @media (min-width: 768px) {
    display: none;
  }
`;

const ReplyBlockResp = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
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
`;

const UserFunctions = styled.div`
  display: flex;
  align-items: center;
  column-gap: 16px;

  @media (min-width: 768px) {
    display: none;
  }
`;

const FunctionsContainer = styled.div`
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
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

  @media (min-width: 768px) {
    display: none;
  }
`;

const ReplyButtonResp = styled.button`
  display: none;

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
