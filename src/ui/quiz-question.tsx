import { useEffect } from "react";
import { useGlobalContext, Question } from "../utils/global-context";
import { useNavigate  } from "react-router-dom";

export default function QuizQuestion({category, difficulty}: {category: number, difficulty: string}) {
    const { questions, setQuestions } = useGlobalContext()
    const navigate = useNavigate();

    // API call to get 5 questions from Open Trivia Database
    useEffect(() => {
        fetch(`https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`)
        .then(response => response.json())
        .then(data => {
            if (data.results) {
                // Prepare shuffled answers
                data.results.forEach((question: Question, idx: number, arr: Question[]) => {
                    const answers = [question.correct_answer, ...question.incorrect_answers];
                    answers.sort(() => Math.random() - 0.5);
                    arr[idx].answers = answers;
                });
                setQuestions(data.results);
            }
        })
        .catch(error => {
            console.log('Failed to retrieve questions: ' + error);
        });
    }
    , [category, difficulty, setQuestions]);

    const handleClickAnswer = (question: Question, answer: string) => {
        // Update the chosen answer in global context
        const newQuestions = questions.map((q: Question) => {
            if (q.question === question.question) {
                return {...q, chosenAnswer: answer};
            }
            return q;
        });
        setQuestions(newQuestions);
    }

    return (
        <div className="mt-4">
            { questions.map((question: Question, index: number) => (
                <div key={index} className='border border-gray-400 rounded-lg p-4 mb-4'>
                    <span dangerouslySetInnerHTML={{__html: question.question}}></span>
                    <Answers question={question} handleClick={handleClickAnswer} />
                </div>
            ))}
            { questions. length > 0 && questions.filter(question => question.chosenAnswer === undefined).length === 0 && // Check if all questions have been answered
                <div className='text-center'>
                    <button className='w-96 border border-gray-900 bg-gray-800 text-white rounded-lg p-2 m-2 hover:bg-gray-700 cursor-pointer'
                        type="submit"
                        onClick={() => { navigate("/results"); }}>
                        Submit
                    </button>
                </div>
            }
        </div>
    );
}

/*
* Display answers as a clickable button
*/
function Answers({question, handleClick}: {question: Question, handleClick: (question: Question, answer: string) => void}) {

    return (
        <div>
            { question.answers.map((answer: string, index: number) => (
                <button key={index} 
                    className={`border border-green-600 rounded-lg p-2 m-2 hover:bg-green-600 hover:text-white cursor-pointer
                        ${question.chosenAnswer === answer ? 'bg-green-600 text-white' : 'text-green-600'}
                    `}
                    disabled={question.chosenAnswer === answer}
                    onClick={() => handleClick(question, answer)}>
                    <span dangerouslySetInnerHTML={{__html: answer}}></span>
                </button>
            ))}
        </div>
    );
}