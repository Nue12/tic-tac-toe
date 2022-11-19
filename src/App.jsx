import {useState} from 'react'

function App() {

  const [turn, setTurn] = useState('X');
  const [block, setBlock] = useState(Array(9).fill(''));
  const [winner, setWinner] = useState();

  const handleRestart = () => {
    setWinner(null);
    setBlock(Array(9).fill(''));
  }

  const checkForWinner = (squares) => {
    let combos = {
      across: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8]
      ],
      down: [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8]
      ],
      diagonol: [
        [0, 4, 8],
        [2, 4, 6  ]
      ]
    };
    
    for (const combo in combos) {
      combos[combo].forEach((pattern) => {
        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === ''
        ) {
          // nothing do
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          setWinner(squares[pattern[0]]);
        }
      });
    }
  }

  const handleClick = (num) => {
    if (block[num] !== '') {
      alert('This block is already fill');
      return;
    }
    let squares = [...block];
    if (turn === 'X') {
      squares[num] = 'X';
      setTurn('O');
    } else {
      squares[num] = 'O';
      setTurn('X');
    }

    checkForWinner(squares);
    setBlock(squares);
  }

  const Block = ({num}) => {
    return(
      <td 
        className="border border-collapse border-white w-24 h-24 text-2xl text-center cursor-pointer"
        onClick={() => handleClick(num)}
      >
        {block[num]}
      </td>
    )
  }
  return (
    <div className='flex justify-center items-center h-screen flex-col'>
      <h1 className='text-2xl mb-7'>' {turn} ' <span className='text-xl'>user turn</span></h1>
      <table>
        <tbody>
          <tr>
            <Block num={0} />
            <Block num={1} />
            <Block num={2} />
          </tr>
          <tr>
            <Block num={3} />
            <Block num={4} />
            <Block num={5} />
          </tr>
          <tr>
            <Block num={6} />
            <Block num={7} />
            <Block num={8} />
          </tr>                    
        </tbody>
      </table>
      {winner && (
        <>
          <p className='m-5 text-xl'>winner is ' {winner} ' user</p>
          <button
            className='bg-gray-400 text-black text-xl font-extrabold px-6 py-2 mt-3' 
            onClick={()=> handleRestart()}
          >
            Play Again
          </button>
        </>
      )}
    </div>
  )
}

export default App
