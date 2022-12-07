import "./App.css";
import AddComments from "./components/AddComments";
import Comments from "./components/Comments";
import Reply from "./components/Reply";
import Data from "./data.json";

function App() {
  return (
    <div className="App">
      <div className="container">
        {Data.comments.map((item) => {
          return (
            <div>
              <Comments
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

        <AddComments img={Data.currentUser.image.png} />
      </div>
    </div>
  );
}

export default App;
