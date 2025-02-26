import { useState } from 'react'

type Square = 'X' | 'O' | null
type Squares = Square[]
type HistoryItem = Squares
type History = HistoryItem[]

function Square({
    value,
    onSquareClick,
}: {
    value: Square
    onSquareClick: () => void
}) {
    return (
        <button className="square" onClick={onSquareClick}>
            {value}
        </button>
    )
}

function Board({
    xIsNext,
    squares,
    onPlay,
}: {
    xIsNext: boolean
    squares: Squares
    onPlay: (nextSquares: Squares) => void
}) {
    function handleClick(i: number) {
        if (calculateWinner(squares) || squares[i]) {
            return
        }
        const nextSquares = [...squares]
        if (xIsNext) {
            nextSquares[i] = 'X'
        } else {
            nextSquares[i] = 'O'
        }
        onPlay(nextSquares)
    }

    const winner = calculateWinner(squares)
    let status
    if (winner) {
        status = 'Winner: ' + winner
    } else {
        status = 'Next player: ' + (xIsNext ? 'X' : 'O')
    }

    return (
        <>
            <div className="dark:bg-slate-800 dark:text-white">
                <div className="status text-bold text-blue-300 text-xl underline">
                    {status}
                </div>
                <div className=" text-white">
                    <div className="board-row">
                        <Square
                            value={squares[0]}
                            onSquareClick={() => handleClick(0)}
                        />
                        <Square
                            value={squares[1]}
                            onSquareClick={() => handleClick(1)}
                        />
                        <Square
                            value={squares[2]}
                            onSquareClick={() => handleClick(2)}
                        />
                    </div>
                    <div className="board-row">
                        <Square
                            value={squares[3]}
                            onSquareClick={() => handleClick(3)}
                        />
                        <Square
                            value={squares[4]}
                            onSquareClick={() => handleClick(4)}
                        />
                        <Square
                            value={squares[5]}
                            onSquareClick={() => handleClick(5)}
                        />
                    </div>
                    <div className="board-row">
                        <Square
                            value={squares[6]}
                            onSquareClick={() => handleClick(6)}
                        />
                        <Square
                            value={squares[7]}
                            onSquareClick={() => handleClick(7)}
                        />
                        <Square
                            value={squares[8]}
                            onSquareClick={() => handleClick(8)}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default function Game() {
    const [history, setHistory] = useState<History>([Array(9).fill(null)])
    const [currentMove, setCurrentMove] = useState(0)
    const xIsNext = currentMove % 2 === 0
    const currentSquares = history[currentMove]

    function handlePlay(nextSquares: Squares) {
        const nextHistory: History = [
            ...history.slice(0, currentMove + 1),
            nextSquares,
        ]
        setHistory(nextHistory)
        setCurrentMove(nextHistory.length - 1)
    }

    function jumpTo(nextMove: number) {
        setCurrentMove(nextMove)
    }

    const moves = history.map((squares, move) => {
        let description
        if (move > 0) {
            description = 'Go to move #' + move
        } else {
            description = 'Go to game start'
        }
        return (
            <li key={move}>
                <button onClick={() => jumpTo(move)}>{description}</button>
            </li>
        )
    })

    return (
        <>
            <div className="container">
                <div className="flex flex-row justify-center gap-2">
                    <p className="title text-7xl text-[#1e40af]">
                        TIC-TAC-TOE GAME
                    </p>
                    <div className="animal w-[150px] h-[100px]"></div>
                </div>

                <div className=" game w-[100%] h-[100%] flex flex-row justify-center">
                    <div className="mt-10 w-[300px] h-[300px] border-blue-800 border-[4px] photo"></div>

                    <div className="game-board ml-20 ">
                        <Board
                            xIsNext={xIsNext}
                            squares={currentSquares}
                            onPlay={handlePlay}
                        />
                    </div>
                    <div className=" game-info text-gray-400 whitespace-nowrap">
                        <ol className="">{moves}</ol>
                    </div>
                </div>
            </div>
        </>
    )
}

function calculateWinner(squares: Squares): Square {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i]
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a]
        }
    }
    return null
}
