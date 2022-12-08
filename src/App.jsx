import "./App.css";
import AddComments from "./components/AddComments";
import Comments from "./components/Comments";
import Reply from "./components/Reply";
import Data from "./data.json";
import { useState } from "react";

function App() {
  const [changeData, setChangeData] = useState(Data.comments);

  console.log(changeData)

  return (


    <div className="App">
      <div className="container">
        {changeData.map((item) => {
          return (
            <div>
              <Comments currentId={item.id} changeData={changeData} setChangeData={setChangeData}
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
          changeData={changeData}
          setChangeData={setChangeData}
          img={Data.currentUser.image.png}
        />
      </div>
    </div>
  );
}

export default App;
