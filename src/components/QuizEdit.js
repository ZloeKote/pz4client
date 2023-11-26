import { useState, useContext } from "react";
import { FaCheck } from "react-icons/fa";
import QuizContext from "../context/quizzes";

function QuizEdit({quiz, onSubmit}) {
  const [newDescription, setNewDescription] = useState(quiz.shortDescription);
  const { editDescription } = useContext(QuizContext);

  const handleChangeDescription = (event) => {
    setNewDescription(event.target.value);
  }

  const handleSubmitEdit = (event) => {
    event.preventDefault();
    editDescription(quiz.id, newDescription);
    onSubmit();
  }
  return (
  <form onSubmit={handleSubmitEdit} className="quiz-edit-form">
    <input value={newDescription} onChange={handleChangeDescription}/>
    <button><FaCheck /></button>
  </form>)
}

export default QuizEdit;