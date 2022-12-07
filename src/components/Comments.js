import styled from "styled-components";
import MinusIcon from "../img/icon-minus.svg";
import PlusIcon from "../img/icon-plus.svg";
import ReplyArrow from "../img/icon-reply.svg";

function Comments(props) {
  return (
    <>
      <Container>
        <Info>
          <Avatar src={process.env.PUBLIC_URL + props.img} alt="User Avatar" />
          <Username>{props.name}</Username>
          <Date>{props.date}</Date>
        </Info>
        <Comment>{props.comment}</Comment>
        <CommonBlock>
          <Score>
            <ScoreButton>
              <Plus src={PlusIcon} alt="plus" />
            </ScoreButton>
            <UserScore>{props.score}</UserScore>
            <ScoreButton>
              <Minus src={MinusIcon} alt="minus" />
            </ScoreButton>
          </Score>
          <ReplyBlock>
            <ReplyIcon src={ReplyArrow} alt="reply arrow" />
            <ReplyLink>Reply</ReplyLink>
          </ReplyBlock>
        </CommonBlock>
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
