export default function QuestionsPage({ questions, text, setPageNumber, handlePageChange, handleAnswerClick, paginationNum, checked, playGame, pageNumber, score, incomplete }) {
    return(
        <div className="lg:w-[900px] w-screen lg:h-[800px] min-h-screen md:px-20 px-10 py-5 lg:pt-10 bg-background-blue m-auto flex flex-col items-start justify-center md:gap-6 gap-3 start">
            {questions.map((item) => 
             <div key={item.id} className="border-b-2 border-border-blue w-full pb-3">
                <h2 className=" text-dark-blue font-semibold text-lg md:text-2xl mb-2">{item.question}</h2>
                <div className=" flex gap-2 flex-wrap">
                    {item.answer.map((answer, answerIndex) => (
                        <button disabled={checked} onClick={() => handleAnswerClick(item.id, answerIndex)} key={answerIndex}  className={`text-dark-blue text-[12px] lg:text-sm px-1 border-[1px] rounded-xl ${!checked && answer.isPicked ? "bg-selected-blue" : ""} ${checked && answer.isCorrect ? "bg-green" : ""} ${checked && !(answer.isCorrect) && answer.isPicked ? "bg-red" : ""} `}>{answer.answer}</button>
                    ))}
                </div>
            </div>
            )}
            <div className="flex gap-1 self-center">
                {paginationNum.map((num, index) => (
                    <button key={index} onClick={() => setPageNumber(num)} className={` px-2 self-center text-dark-blue py-1 rounded-xl hover:bg-blue/40 hover:text-background-blue ${num === pageNumber ? "bg-blue text-background-blue" : ""} `} >{num}</button>
                ))}
            </div>
            {checked ? 
            <button onClick={() => playGame()} className="bg-blue px-10 self-center text-background-blue py-3 rounded-xl">Play again</button> 
            : <button onClick={() => handlePageChange()} className="bg-blue px-10 self-center text-background-blue py-3 rounded-xl mb-3">{text}</button>
            }
            {checked && <p className='self-center text-dark-blue font-semibold text-lg'>You scored {score}/15 correct answers</p>}
            {incomplete && <p className='self-center text-red font-semibold text-lg'>Answer All Questions</p> }
        </div>
    )
}