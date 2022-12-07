import styled from "styled-components";

function AddComments(props) {
  return (
    <>
      <Container>
        <TextArea placeholder="Add a comment…" />
        <Info>
          <Image src={props.img} alt="User Avatar" />
          <Button>Send</Button>
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
  width: 311px;
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
