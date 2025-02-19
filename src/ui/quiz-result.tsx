import { useGlobalContext, Question } from "../utils/global-context";

export default function QuizResult() {
    const { questions } = useGlobalContext()

    return (
        <>
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800">RESULTS</h1>
            </div>
            <div className="mt-4">
                { questions.map((question: Question, index: number) => (
                    <div key={index} className='border border-gray-400 rounded-lg p-4 mb-4'>
                        <span dangerouslySetInnerHTML={{__html: question.question}}></span>
                        <Answers question={question} />
                    </div>
                ))}
                <div className='text-center'>
                    { questions.length > 0 && // Check if questions have been answered
                        <Score questions={questions} />
                    }
                    <button className='w-96 border border-gray-900 bg-gray-800 text-white rounded-lg p-2 m-2 hover:bg-gray-700 cursor-pointer'
                        onClick={() => { document.location.href = "/"; }}>
                        Create a new quiz
                    </button>
                </div>
            </div>
        </>
    );
}

/*
* Display answers in the following color:
* - Red color if wrong answer,
* - Green color if correct answer
*/
function Answers({question}: {question: Question}) {
    
    return (
        <div>
            { question.answers.map((answer: string, index: number) => {
                let color = 'text-green-600'
                if (answer === question.correct_answer) {
                  color = 'bg-green-600 text-white'
                } else if (answer === question.chosenAnswer && answer !== question.correct_answer) {
                  color = 'bg-red-600 text-white'
                }
                return (
                <button key={index} 
                    className={`border border-green-600 rounded-lg p-2 m-2 ${color}`}
                    disabled={true}
                    >
                    <span dangerouslySetInnerHTML={{__html: answer}}></span>
                </button>
              )})
            }
        </div>
    );
}

/*
* Display the score with the following color scale:
* - Red color if 0 or 1 correct answer,
* - Yellow color if 2 or 3 correct answers,
* - Green color if 4 or 5 correct answers
*/
function Score({questions}: {questions: Question[]}) {
    const correct = questions.filter(question => question.correct_answer === question.chosenAnswer).length;
    const total = questions.length;
    return (
        <div className='text-center'>
            <h1 className={`text-2xl font-bold text-white rounded-lg p-2 m-2
                ${correct < 2 ? 'bg-red-600' : (correct < 4 ? 'bg-yellow-500' : 'bg-green-600')}
                `}>
                You scored {correct} out of {total}
            </h1>
        </div>
    )
}