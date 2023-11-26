import { createContext, useState, useCallback } from "react";
import { XMLParser, XMLBuilder } from "fast-xml-parser";
import axios from "axios";
import { LocalDateTime } from "@js-joda/core";

const QuizContext = createContext();

function Provider({ children }) {
  const [quizzes, setQuizzes] = useState([]);
  let quizzesXml;
  const parser = new XMLParser({
    attributeNamePrefix: "",
    ignoreAttributes: false,
    tagValueProcessor: (tagName, value) => {
      return String(value);
    },
  });
  const builder = new XMLBuilder({
    attributeNamePrefix: "@",
    ignoreAttributes: false,
    textNodeName: "quiz",
  });

  const fetchQuizzesJson = useCallback(async () => {
    await axios
      .get("http://localhost:8080/api/quizzes")
      .then((response) => {
        setQuizzes(response.data.quiz);
        alert("Status: " + response.status + " " + response.statusText);
      })
      .catch((response) => {
        alert(
          "Status: " +
            response.response.status +
            " " +
            response.response.statusText +
            "\nInfo: " +
            response.response.data
        );
      });
  }, []);

  const fetchQuizzesXml = useCallback(async () => {
    await axios
      .get("http://localhost:8080/api/quizzes", {
        headers: {
          Accept: "application/xml",
        },
      })
      .then((response) => {
        alert("Status: " + response.status + " " + response.statusText);
        quizzesXml = parser.parse(response.data);
      })
      .then(() => {
        setQuizzes(quizzesXml.quizzes.quiz);
      })
      .catch((response) => {
        alert(
          "Status: " +
            response.response.status +
            " " +
            response.response.statusText +
            "\nInfo: " +
            response.response.data
        );
      });
  }, []);

  const fetchQuizById = async (id) => {
    await axios
      .get(`http://localhost:8080/api/quizzes/${id}`)
      .then((response) => {
        const newQuizzes = [response.data];
        setQuizzes(newQuizzes);
        alert("Status: " + response.status + " " + response.statusText);
      })
      .catch((response) => {
        alert(
          "Status: " +
            response.response.status +
            " " +
            response.response.statusText +
            "\nInfo: " +
            response.response.data
        );
      });
  };

  const fetchQuizByTitle = async (title) => {
    await axios
      .get(`http://localhost:8080/api/quizzes/search;title=${title}`)
      .then((response) => {
        setQuizzes(response.data.quiz);
        alert("Status: " + response.status + " " + response.statusText);
      })
      .catch((response) => {
        alert(
          "Status: " +
            response.response.status +
            " " +
            response.response.statusText +
            "\nInfo: " +
            response.response.data
        );
      });
  };

  const editDescription = async (id, description) => {
    await axios
      .put(`http://localhost:8080/api/quizzes/${id}`, null, {
        params: {
          description,
        },
      })
      .then((response) => {
        setQuizzes(
          quizzes.map((quiz) => {
            if (quiz.id === id) {
              quiz.shortDescription = description;
            }
            return quiz;
          })
        );
        alert("Status: " + response.status + " " + response.statusText);
      })
      .catch((response) => {
        alert(
          "Status: " +
            response.response.status +
            " " +
            response.response.statusText +
            "\nInfo: " +
            response.response.data
        );
      });
  };

  const deleteQuiz = async (id) => {
    await axios
      .delete(`http://localhost:8080/api/quizzes/${id}`)
      .then((response) => {
        setQuizzes(
          quizzes.filter((quiz) => {
            return quiz.id !== id;
          })
        );
        alert("Status: " + response.status + " " + response.statusText);
      })
      .catch((response) => {
        alert(
          "Status: " +
            response.response.status +
            " " +
            response.response.statusText +
            "\nInfo: " +
            response.response.data
        );
      });
  };

  const addQuizJson = async (quiz) => {
    let quizJson;
    if (quiz.type === "TOURNAMENT_VIDEO") {
      quizJson = {
        ...quiz,
        question: quiz.question.map((question) => {
          return {
            QYTLink: question.QLink,
            QInfo: question.QInfo,
            wonTimes: question.wonTimes,
          };
        }),
      };
    } else {
      quizJson = quiz;
    }
    quizJson = { ...quizJson, createdAt: LocalDateTime.now().toString() };

    await axios
      .post("http://localhost:8080/api/quizzes", quizJson)
      .then((response) => {
        alert("Status: " + response?.status + " " + response?.statusText + "\nInfo: " + response?.data);
        quiz = { ...quiz, id: response.data, createdAt: LocalDateTime.now.toString() };
      })
      .then(() => {
        setQuizzes([...quizzes, quiz]);
      })
      .catch((response) => {
        alert(
          "Status: " +
            response?.response?.status +
            " " +
            response?.response?.statusText +
            "\nInfo: " +
            response?.response?.data
        );
      });
  };

  const addQuizXml = async (quizForm) => {
    let quizXml;
    let quizForXml = { quiz: null };
    if (quizForm.type === "TOURNAMENT_VIDEO") {
      quizForm = {
        ...quizForm,
        question: quizForm.question.map((question) => {
          return {
            qYTLink: question.QLink,
            qInfo: { qTitle: question.QInfo.QTitle, qDescription: question.QInfo.QDescription },
            wonTimes: question.wonTimes,
          };
        }),
        type: "Tournament - Video",
      };
    } else {
      quizForm = {
        ...quizForm,
        question: quizForm.question.map((question) => {
          return {
            qLink: question.QLink,
            qInfo: { qTitle: question.QInfo.QTitle, qDescription: question.QInfo.QDescription },
            wonTimes: question.wonTimes,
          };
        }),
        type: "Tournament - Picture",
      };
    }
    quizForXml.quiz = {
      ...quizForm,
      creator: { "@id": quizForm.creator.id, nickname: quizForm.creator.nickname },
      createdAt: LocalDateTime.now().toString(),
      "@xmlns": "http://nure.ua/it/entity",
    };
    quizXml = builder.build(quizForXml);

    await axios
      .post("http://localhost:8080/api/quizzes", quizXml, {
        headers: {
          "Content-Type": "application/xml",
        },
      })
      .then((response) => {
        alert("Status: " + response?.status + " " + response?.statusText + "\nInfo: " + response?.data);
        quizForm = { ...quizForm, id: response.data, createdAt: LocalDateTime.now.toString() };
      })
      .then(() => {
        setQuizzes([...quizzes, quizForm]);
      })
      .catch((response) => {
        alert(
          "Status: " +
            response?.response?.status +
            " " +
            response?.response?.statusText +
            "\nInfo: " +
            response?.response?.data
        );
      });
  };

  const quizzesToShare = {
    quizzes,
    fetchQuizzesJson,
    fetchQuizzesXml,
    fetchQuizById,
    fetchQuizByTitle,
    editDescription,
    deleteQuiz,
    addQuizJson,
    addQuizXml,
  };

  return <QuizContext.Provider value={quizzesToShare}>{children}</QuizContext.Provider>;
}

export { Provider };
export default QuizContext;
