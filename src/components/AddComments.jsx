import styled from "styled-components";
import data from "../data.json";

function AddComments({
  textAreaValue,
  setTextAreaValue,
  changeData,
  setChangeData,
  img,
}) {
  function getTextAreaValue(event) {
    setTextAreaValue(event.target.value);
  }

  function AddnewComment() {
    if (textAreaValue.length > 0) {
      setChangeData([
        ...changeData,
        {
          id: Math.random(),
          content: textAreaValue,
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
    }
    setTextAreaValue("");
  }
  console.log(img);
  return (
    <>
      <Container>
        <ImageResp src={process.env.PUBLIC_URL + img} alt="User Avatar" />
        <TextArea
          onChange={getTextAreaValue}
          value={textAreaValue}
          placeholder="Add a comment…"
        />
        <Info>
          <Image src={process.env.PUBLIC_URL + img} alt="User Avatar" />
          <Button onClick={AddnewComment}>Send</Button>
          <ButtonResp onClick={AddnewComment}>Send</ButtonResp>
        </Info>
      </Container>
    </>
  );
}

export default AddComments;

const Container = styled.div`
  padding: 0 16px;

  @media (min-width: 768px) {
    display: flex;
    column-gap: 16px;
  }
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

  @media (min-width: 768px) {
    display: none;
  }
`;

const ImageResp = styled.img`
  width: 32px;
  height: 32px;
  display: none;

  @media (min-width: 768px) {
    display: block;
  }
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
  transition: all ease 0.3s;
  &:hover {
    background: #c5c6ef;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

const ButtonResp = styled.button`
  width: 104px;
  height: 48px;
  border-radius: 8px;
  background: #5357b6;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  color: #ffffff;
  display: none;
  align-self: baseline;

  @media (min-width: 768px) {
    display: block;
  }
`;
