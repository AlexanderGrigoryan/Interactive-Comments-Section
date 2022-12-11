import styled from "styled-components";
import data from "../data.json";

function AddComments(props) {
  function getTextAreaValue(event) {
    props.setTextAreaValue(event.target.value);
  }

  function AddnewComment() {
    props.setChangeData([
      ...props.changeData,
      {
        id: Math.random(),
        content: props.textAreaValue,
        createdAt: "Today",
        score: 0,
        user: {
          image: {
            png: data.currentUser.image.png,
            webp: data.currentUser.image.webp,
          },
          username: data.currentUser.username,
        },
        replies: [],
      },
    ]);
    props.setTextAreaValue("");
  }

  return (
    <>
      <Container>
        <TextArea
          onChange={getTextAreaValue}
          value={props.textAreaValue}
          placeholder="Add a comment…"
        />
        <Info>
          <Image src={props.img} alt="User Avatar" />
          <Button onClick={AddnewComment}>Send</Button>
        </Info>
      </Container>
    </>
  );
}

export default AddComments;

const Container = styled.div`
  padding: 0 16px;
`;

const TextArea = styled.textarea`
  width: 100%;
  max-width: 506px;
  min-height: 96px;
  border-radius: 8px;
  padding: 12px 24px;
  outline: 1px solid #e9ebf0;
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  resize: none;
  margin-bottom: 16px;
  color: #67727e;

  &:focus {
    outline: 1px solid #5357b6;
  }
`;

const Info = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Image = styled.img`
  width: 32px;
  height: 32px;
`;

const Button = styled.button`
  width: 104px;
  height: 48px;
  border-radius: 8px;
  background: #5357b6;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #ffffff;
`;
