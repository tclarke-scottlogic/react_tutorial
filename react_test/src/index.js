import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      value: props.value,
    };
  }

  render() {
    return (
      <button className="square" onClick={() => {
          this.setState({
            value: (this.state.value === "X") ? "O" : "X"
          })
        }
      }
      >
        {this.state.value}
      </button >
    );
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      player: "X",
    };
  
    for(let i = 0; i < this.state.squares.length; ++i){
      this.state.squares[i] = i;
    }
  }

  renderSquare(i) {
    return <Square value={this.state.squares[i]} />;
  }

  render() {
    const status = 'Next player: ' + this.state.player;

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
