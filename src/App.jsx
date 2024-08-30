import { useState, useCallback } from "react"
import { decode } from "html-entities"
import StartPage from "./components/StartPage"
import QuestionsPage from "./components/QuestionsPage";
import usePagination from "./hooks/usePagination";

export default function App() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [checked, setChecked] = useState(false)
    const [startGame, setStartGame] = useState(false)
    const [incomplete, setInComplete] = useState(false)
    const { setPageNumber, questions, pageNumber, totalPages, paginationNum } = usePagination(data)

    function handlePageChange() {
        if(pageNumber < totalPages){
            setPageNumber(prevPageNumber => prevPageNumber + 1)
        }else{
            checkAnswer(data)
        }
    }

    const text = pageNumber < totalPages ? "Next page" : "Check Answer"

        const fetchData = async() => {
            try{
                const response =  await fetch("https://opentdb.com/api.php?amount=15&difficulty=medium&type=multiple")
                if(!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`)
                }
                const data = await response.json();
                const decodedData = data.results.map((item, index) => {
                    const decodedCorrectAnswer = decode(item.correct_answer);
                    const decodedIncorrectAnswer = item.incorrect_answers.map((answer) => (decode(answer)));
                    const decodedQuestion =  decode(item.question);

                    const answers = 
                    [...decodedIncorrectAnswer.map((ans) =>
                        ({answer: ans, isCorrect: false, isPicked: false})),
                        {answer: decodedCorrectAnswer, isCorrect: true, isPicked: false}
                    ]

                    const shuffledAnswers = answers.sort(() => Math.random() - 0.5)

                    return{
                        id: index,
                        ...item,
                        question: decodedQuestion,
                        answer:  shuffledAnswers,
                    }
                })
                setData(decodedData)
            }catch {
                console.log("Error fetching data");
            }finally {
                setLoading(false)
            }
        }

    const handleAnswerClick = useCallback((questionIndex, answerIndex) => {
        setData(prevData =>
          prevData.map((item, qIndex) => {
            if (qIndex === questionIndex) {
              return {
                ...item,
                answer: item.answer.map((answer, aIndex) => ({
                  ...answer,
                  isPicked: aIndex === answerIndex
                }))
              };
            }
            return item;
          })
        );
      }, []);

      const checkAnswer = useCallback((data) => {
        const allQuestionsAnswered = data.every(question =>
          question.answer.some(answer => answer.isPicked)
        );
    
        if(allQuestionsAnswered){
          setChecked(true)
          calculateScore(data)
        }else{
          setChecked(false)
          setInComplete(true)
        }
      },[])

      const playGame = () => {
        fetchData()
        setLoading(true)
        setChecked(false)
        setPageNumber(1)
        setStartGame(prevGame => ! prevGame)
      }

      function calculateScore (data) {
        let score = 0;
        data.forEach(question => {
          question.answer.forEach(answer => {
            if(answer.isPicked && answer.isCorrect){
              score += 1;
            }
        })
        });
        return score;
      }

      const score = calculateScore(data)

    return (
        <div className="grid place-content-center h-screen overflow-x-clip">
        {!startGame ? (
          <StartPage playGame={playGame} />
        ) : loading ? ( 
          <h1 className="text-5xl text-border-blue">Loading...</h1>
        ) : (
          <QuestionsPage
            questions={questions}
            setPageNumber={setPageNumber}
            pageNumber={pageNumber}
            handlePageChange={handlePageChange}
            text={text}
            handleAnswerClick={handleAnswerClick}
            paginationNum={paginationNum}
            checked={checked}
            playGame={playGame}
            score={score}
            incomplete={incomplete}
          />
        )}
      </div>
    );
  }