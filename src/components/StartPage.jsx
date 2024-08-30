export default function StartPage({ playGame }) {
    return(
        <div className="lg:w-[800px] w-screen lg:aspect-square h-screen px-8 py-5 bg-background-blue m-auto flex flex-col items-center justify-center gap-3 start">
            <h1 className="text-dark-blue text-6xl font-bold">Quizzical</h1>
            <p className="text-dark-blue text-2xl">Unlock your curiosity</p>
                <button onClick={() => playGame()} className="bg-dark-blue text-background-blue px-12 py-3 rounded-xl">Start quiz</button>
        </div>
    )
}