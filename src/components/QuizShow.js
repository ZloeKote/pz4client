import { useState, useContext } from "react";
import QuestionShow from "./QuestionShow";
import Button from "./Button";
import QuizEdit from "./QuizEdit";
import QuizContext from "../context/quizzes";

function QuizShow({ quiz }) {
  const { deleteQuiz } = useContext(QuizContext);

  const renderedQuestions = quiz.question.map((question, index) => {
    return <QuestionShow key={index} question={question} index={++index} type={quiz.type} />;
  });
  const [showQuestions, setShowQuestions] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleClickRevealQuestions = () => {
    setShowQuestions(!showQuestions);
  };

  const handleEditClick = () => {
    setShowEdit(!showEdit);
  };

  const handleSubmitEdit = () => {
    setShowEdit(false);
  };

  const handleDeleteClick = () => {
    deleteQuiz(quiz.id);
  };

  let description = <span onClick={handleEditClick}>{quiz.shortDescription}</span>;
  if (showEdit) {
    description = <QuizEdit quiz={quiz} onSubmit={handleSubmitEdit} />;
  }
  
  return (
    <div className="quiz-layout">
      <div className="quiz-title-en-creator" id={`quiz-${quiz.id}`}>
        <div className="quiz-title">{quiz.title}</div>
        <div className="quiz-lang-creator-delete">
          <div className="quiz-lang">{quiz.nativeLanguage}</div>
          <div className="quiz-creator">{quiz.creator.nickname}</div>
          <div className="quiz-delete">
            <Button danger onClick={handleDeleteClick}>
              Delete
            </Button>
          </div>
        </div>
      </div>
      <div className="quiz-description">
        Description:
        {description}
      </div>
      <div className="quiz-createdAt">
        Created:
        <span> {getFormattedTime(quiz.createdAt)}</span>
      </div>
      <div className="quiz-amountQuestions">
        Amount of questions:
        <span> {quiz.amountQuestions}</span>
      </div>
      <div className="quiz-questions-layout">
        <button className="revealing-button">
          <div className="revealing-button-name" onClick={handleClickRevealQuestions}>
            Show questions
          </div>
          <div className="revealing-button-switch">ᐸ</div>
        </button>
        {showQuestions && (
          <div className="quiz-questions">
            <table className="quiz-questions-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Question</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Won</th>
                </tr>
              </thead>
              <tbody>{renderedQuestions}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function getFormattedTime(time) {
  const indexToDelete = time.indexOf("[GMT+02:00]");
  if (indexToDelete !== -1) time = time.slice(0, indexToDelete);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const nonFormattedTime = new Date(time);
  return nonFormattedTime.toLocaleDateString("en-US", options);
}

export default QuizShow;
