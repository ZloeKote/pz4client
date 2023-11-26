import { useEffect, useContext, useState } from "react";
import QuizContext from "./context/quizzes";
import QuizList from "./components/QuizList";
import QuizCreate from "./components/QuizCreate";
import Modal from "./components/Modal";
import Button from "./components/Button";
import "./quizzes.css";
import { FaSearch } from "react-icons/fa";

function App() {
  const { fetchQuizzesJson, fetchQuizzesXml, fetchQuizById, fetchQuizByTitle } = useContext(QuizContext);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    fetchQuizzesXml();
  }, [fetchQuizzesXml]);

  const handleShowAddQuiz = () => {
    setShowAddForm(true);
  };

  const handleCloseAddQuiz = () => {
    setShowAddForm(false);
  };

  const [searchTitle, setSearchTitle] = useState("");
  const [searchId, setSearchId] = useState();

  const handleChangeSearchTitle = (event) => {
    setSearchTitle(event.target.value);
  };

  const handleChangeSearchId = (event) => {
    if (event.target.value <= 0) setSearchId(1);
    else setSearchId(event.target.value);
  };

  const handleSubmitSearchTitle = (event) => {
    event.preventDefault();
    setSearchTitle("");
    fetchQuizByTitle(searchTitle);
  };

  const handleSubmitSearchId = (event) => {
    event.preventDefault();
    setSearchId(0);
    fetchQuizById(searchId);
  };

  const modalAddQuiz = (
    <Modal onClose={handleCloseAddQuiz}>
      <QuizCreate onClose={handleCloseAddQuiz} />
    </Modal>
  );

  return (
    <div className="layout">
      <div className="title-layout">
        <div className="title-layout-search">
          <div className="search-title">
            <form onSubmit={handleSubmitSearchTitle}>
              <input value={searchTitle} onChange={handleChangeSearchTitle} placeholder="type title" />
              <button>
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="search-id">
            <form onSubmit={handleSubmitSearchId}>
              <input
                value={searchId}
                onChange={handleChangeSearchId}
                type="number"
                placeholder="type id"
                min={1}
              />
              <button>
                <FaSearch />
              </button>
            </form>
          </div>
        </div>
        <div>
          <h1>Quizzes</h1>
        </div>
        <div>
          <Button onClick={handleShowAddQuiz} className="add-quiz-button" primary>
            Add quiz
          </Button>
          {showAddForm && modalAddQuiz}
        </div>
      </div>
      <div className="main-layout">
        <QuizList />
      </div>
    </div>
  );
}

export default App;
