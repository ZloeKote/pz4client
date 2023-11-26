import { useContext } from "react";
import QuizContext from "../context/quizzes";
import QuizShow from "./QuizShow";

function QuizList() {
  const { quizzes } = useContext(QuizContext);
  const renderedVideoQuizzes = quizzes
    .filter((quiz) => {
      return quiz.type === "Tournament - Video" || quiz.type === "TOURNAMENT_VIDEO";
    })
    .map((quiz) => {
      return <QuizShow key={quiz.id} quiz={quiz} />;
    });
  const renderedPictureQuizzes = quizzes
    .filter((quiz) => {
      return quiz.type === "Tournament - Picture" || quiz.type === "TOURNAMENT_PICTURE";
    })
    .map((quiz) => {
      return <QuizShow key={quiz.id} quiz={quiz} />;
    });

  return (
    <>
      {renderedVideoQuizzes.length !== 0 && (
        <div className="quiz-video">
          <div className="quiz-type-title">
            <h2>Tournament - Video</h2>
          </div>
          <div className="quiz-layout">{renderedVideoQuizzes}</div>
        </div>
      )}
      {renderedPictureQuizzes.length !== 0 && (
        <div className="quiz-picture">
          <div className="quiz-type-title">
            <h2>Tournament - Picture</h2>
          </div>
          <div className="quiz-layout">{renderedPictureQuizzes}</div>
        </div>
      )}
    </>
  );
}

export default QuizList;
