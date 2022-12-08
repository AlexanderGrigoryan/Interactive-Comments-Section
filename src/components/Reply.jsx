import styled from "styled-components";
import minusIcon from "../img/icon-minus.svg";
import plusIcon from "../img/icon-plus.svg";
import replyArrow from "../img/icon-reply.svg";
import data from "../data.json";

function Reply(props) {
  return (
    <>
      <Container>
        <UserInfo>
          <Avatar src={process.env.PUBLIC_URL + props.img} alt="User Avatar" />
          <Username>{props.nameReply}</Username>
          {data.currentUser.username === props.nameReply ? (
            <CurrentUser>you</CurrentUser>
          ) : null}
          <Date>{props.dateReply}</Date>
        </UserInfo>
        <Comment>{props.commentReply}</Comment>
        <CommonBlock>
          <Score>
            <ScoreButton>
              <Plus src={plusIcon} alt="plus" />
            </ScoreButton>
            <UserScore>{props.scoreReply}</UserScore>
            <ScoreButton>
              <Minus src={minusIcon} alt="minus" />
            </ScoreButton>
          </Score>
          <ReplyBlock>
            <ReplyIcon src={replyArrow} alt="reply arrow" />
            <ReplyLink>Reply</ReplyLink>
          </ReplyBlock>
        </CommonBlock>
      </Container>
    </>
  );
}

export default Reply;

const Container = styled.div`
  width: 343px;
  padding: 16px 16px 24px 32px;
`;

const UserInfo = styled.div`
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
