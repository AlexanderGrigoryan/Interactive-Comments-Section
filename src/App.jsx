import AddComments from "./components/AddComments";
import Comments from "./components/Comments";
import Reply from "./components/Reply";
import Data from "./data.json";
import { useState } from "react";

function App() {
  const [changeData, setChangeData] = useState(Data.comments);
  const [textAreaValue, setTextAreaValue] = useState("");
  const [commentValue, setCommentValue] = useState("");

  return (
    <div className="App">
      <div className="container">
        {changeData.map((item) => {
          return (
            <div>
              <Comments
                textAreaValue={textAreaValue}
                setTextAreaValue={setTextAreaValue}
                commentValue={commentValue}
                setCommentValue={setCommentValue}
                currentId={item.id}
                changeData={changeData}
                setChangeData={setChangeData}
                img={item.user.image.png}
                name={item.user.username}
                date={item.createdAt}
                comment={item.content}
                score={item.score}
              />
              {item.replies.map((reply) => {
                return (
                  <Reply
                    img={reply.user.image.png}
                    nameReply={reply.user.username}
                    dateReply={reply.createdAt}
                    commentReply={reply.content}
                    scoreReply={reply.score}
                  />
                );
              })}
            </div>
          );
        })}

        <AddComments
          textAreaValue={textAreaValue}
          setTextAreaValue={setTextAreaValue}
          changeData={changeData}
          setChangeData={setChangeData}
          img={Data.currentUser.image.png}
        />
      </div>
    </div>
  );
}

export default App;
