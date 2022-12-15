import styled from "styled-components";

function Modal(props) {
  function cancelModal() {
    props.setIsOpen(false);
  }

  return (
    <Backdrop>
      <ModalWindow>
        <ModalTitle>Delete comment</ModalTitle>
        <ModalText>
          Are you sure you want to delete this comment? This will remove the
          comment and can’t be undone.
        </ModalText>
        <ModalButtons>
          <CancelButton onClick={cancelModal}>NO, CANCEL</CancelButton>
          <ConfirmButton onClick={props.onClick}>YES, DELETE</ConfirmButton>
        </ModalButtons>
      </ModalWindow>
    </Backdrop>
  );
}

export default Modal;

const Backdrop = styled.div`
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalWindow = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 16px;
  width: 343px;
  height: 224px;
  border-radius: 8px;
  padding: 24px 28px;
  background: #ffffff;
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 500;
  line-height: 24px;
  color: #334253;
`;

const ModalText = styled.p`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
  color: #67727e;
`;

const ModalButtons = styled.div`
  display: flex;
  column-gap: 12px;
`;

const CancelButton = styled.button`
  width: 138px;
  height: 48px;
  border-radius: 8px;
  background: #67727e;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
`;

const ConfirmButton = styled.button`
  width: 138px;
  height: 48px;
  border-radius: 8px;
  background: #ed6368;
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;
  text-align: center;
  cursor: pointer;
  color: #ffffff;
`;
