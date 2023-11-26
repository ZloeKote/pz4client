import { useState, useContext } from "react";
import QuizContext from "../context/quizzes";
import Dropdown from "./Dropdown";
import { MdClose } from "react-icons/md";
import Button from "./Button";
import QuestionShow from "./QuestionShow";

function QuizCreate({ onClose }) {
  const { addQuizJson, addQuizXml } = useContext(QuizContext);
  const [quiz, setQuiz] = useState({
    title: "",
    shortDescription: "",
    question: [],
    creator: {
      id: Math.round(Math.random() * 100),
      nickname: "",
    },
    type: "TOURNAMENT_VIDEO",
    nativeLanguage: "EN",
    amountQuestions: 0,
    createdAt: null,
  });
  const [questionForm, setQuestionForm] = useState({
    QLink: "",
    QInfo: {
      QTitle: "",
      QDescription: "",
    },
    wonTimes: 0,
  });
  const [selectionTypeLang, setSelectionTypeLang] = useState({
    type: { label: "Tournament - Video", value: "TOURNAMENT_VIDEO" },
    lang: { label: "English", value: "EN" },
  });

  const options = {
    type: [
      { label: "Tournament - Video", value: "TOURNAMENT_VIDEO" },
      { label: "Tournament - Picture", value: "TOURNAMENT_PICTURE" },
    ],
    language: [
      { label: "Ukraine", value: "UA" },
      { label: "English", value: "EN" },
    ],
  };
  const [showQuestions, setShowQuestions] = useState(true);
  const [isJSON, setIsJSON] = useState(true);

  const renderedQuestions = quiz.question.map((question, index) => {
    return <QuestionShow key={index} question={question} index={++index} type={quiz.type} />;
  });

  const handleChangeJSON = () => {
    setIsJSON(!isJSON);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(isJSON);
    if (isJSON) addQuizJson(quiz);
    else addQuizXml(quiz);
    onClose();
  };

  const handleClickAddQuestion = (event) => {
    event.preventDefault();
    setQuiz({ ...quiz, question: [...quiz.question, questionForm], amountQuestions: ++quiz.amountQuestions });
    setQuestionForm({
      QLink: "",
      QInfo: {
        QTitle: "",
        QDescription: "",
      },
      wonTimes: 0,
    });
  };

  const handleChangeTitle = (event) => {
    setQuiz({ ...quiz, title: event.target.value });
  };

  const handleChangeDescription = (event) => {
    setQuiz({ ...quiz, shortDescription: event.target.value });
  };

  const handleChangeQLink = (event) => {
    setQuestionForm({ ...questionForm, QLink: event.target.value });
  };

  const handleChangeQTitle = (event) => {
    setQuestionForm({
      ...questionForm,
      QInfo: { QTitle: event.target.value, QDescription: questionForm.QInfo.QDescription },
    });
  };

  const handleChangeQDescription = (event) => {
    setQuestionForm({
      ...questionForm,
      QInfo: { QTitle: questionForm.QInfo.QTitle, QDescription: event.target.value },
    });
  };

  const handleChangeCreatorNickname = (event) => {
    setQuiz({ ...quiz, creator: { id: quiz.creator.id, nickname: event.target.value } });
  };

  const handleSelectType = (option) => {
    setSelectionTypeLang({ ...selectionTypeLang, type: option });
    setQuiz({ ...quiz, type: option.value });
  };
  const handleSelectLang = (option) => {
    setSelectionTypeLang({ ...selectionTypeLang, lang: option });
    setQuiz({ ...quiz, nativeLanguage: option.value });
  };

  const handleClickRevealQuestions = () => {
    setShowQuestions(!showQuestions);
  };

  return (
    <div className="quiz-add-layout">
      <div className="quiz-add-title-close">
        <h2>Add a quiz</h2>
        <MdClose className="close-modal-button" onClick={onClose} />
      </div>
      <div className="quiz-add-form-questions">
        <form onSubmit={handleSubmit} className="quiz-add-form">
          <div>
            <div className="quiz-add-title">
              <label>Title</label>
              <input value={quiz.title} onChange={handleChangeTitle} />
            </div>
            <div className="quiz-add-desc">
              <label>Description</label>
              <textarea value={quiz.description} onChange={handleChangeDescription} />
            </div>
            <div className="quiz-add-type-lang">
              <div className="quiz-add-type">
                <label>Type</label>
                <Dropdown options={options.type} onChange={handleSelectType} value={selectionTypeLang.type} />
              </div>
              <div className="quiz-add-lang">
                <label>Language</label>
                <Dropdown
                  options={options.language}
                  onChange={handleSelectLang}
                  value={selectionTypeLang.lang}
                />
              </div>
            </div>
            <div className="quiz-add-creator">
              <label>Creator nickname</label>
              <input value={quiz.creator.nickname} onChange={handleChangeCreatorNickname} />
            </div>
            <div className="quiz-add-isJSON">
              <input type="checkbox" onChange={handleChangeJSON} checked={isJSON} />
              <label>Send as JSON</label>
            </div>
          </div>
          <div className="quiz-add-question">
            <h3>Question</h3>
            <label>Link</label>
            <input value={questionForm.QLink} onChange={handleChangeQLink} />
            <label>Title</label>
            <input value={questionForm.QInfo.QTitle} onChange={handleChangeQTitle} />
            <label>Description</label>
            <input value={questionForm.QInfo.QDescription} onChange={handleChangeQDescription} />
            <Button onClick={handleClickAddQuestion} secondary className="quiz-add-question-button">
              Add question
            </Button>
          </div>
          <Button className="add-quiz-submit-button" success>
            Add quiz
          </Button>
        </form>
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
    </div>
  );
}

export default QuizCreate;
