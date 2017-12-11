import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ReactDice from 'react-dice-complete'
import './react-dice-complete.css'
import renderHTML from 'react-render-html'

 

class Square extends React.Component {	 
  render() {	
	let status;	
	let divsToReturn = "";
	status = this.props.indexes;
	for (var k in status){
		if (!status.hasOwnProperty(k)) continue;
		var currentPlayerIndex = status[k];
		if(currentPlayerIndex === this.props.index){
			divsToReturn += "<div className='player" + k + "'></div>";
		}
	}
    return (
      <span className="square" onClick={() => this.props.onClick()}>
        {this.props.index}	
			{renderHTML(divsToReturn)}
      </span>
    );
  }
}

class EmptySquare extends React.Component {	 
  render() {
    return (
     <span className="emptySquare"></span>
    );
  }
}


class Board extends React.Component {
	constructor(props) {
    super(props);
	this.rollDoneCallback = this.rollDoneCallback.bind(this);
    this.state = {
	  playerIndices: {1: 0, 2: 0, 3: 0, 4: 0},
	  players: [1, 2, 3, 4],
	  currentPlayer: 1,
	  hasGameStarted: false,
	  player1Stocks: {'Amazon': 100,
						'AOL': 0,
						'Bank of America': 0,
						'Nike': 0,
						'Google': 0,
						'Microsoft': 0,
						'Disney': 0
					},
	  player2Stocks: {'Amazon': 100,
						'AOL': 0,
						'Bank of America': 0,
						'Nike': 0,
						'Google': 0,
						'Microsoft': 0,
						'Disney': 0
					},
	  player3Stocks: {'Amazon': 100,
						'AOL': 0,
						'Bank of America': 0,
						'Nike': 0,
						'Google': 0,
						'Microsoft': 0,
						'Disney': 0
					},
	  player4Stocks: {'Amazon': 100,
						'AOL': 0,
						'Bank of America': 0,
						'Nike': 0,
						'Google': 0,
						'Microsoft': 0,
						'Disney': 0
					},
    };
	//this.rollDoneCallback = this.rollDoneCallback.bind(this, this.state.playerIndices, this.state.currentPlayer);
  }
  
  handleClick(i){
  }
  
  
  renderSquare(playerIndices, index, nextIndex, squareType, visible) {
	if(visible){
		return <Square hasGameStarted={this.state.hasGameStarted} indexes={this.state.playerIndices} onClick={() => this.handleClick(index)} index={index} nextIndex={nextIndex} squareType={squareType}/>;
	} else {
		return <EmptySquare />;
	}
  }
  
   rollAll() {
    this.reactDice.rollAll();
	//alert("all rolled");
	if(!this.state.hasGameStarted)
		this.setState({
			hasGameStarted: true
		});
  }
 
  rollDoneCallback(num) {
   // alert(`You rolled a ${num}`)
	var that = this.state;
	if(that.hasGameStarted){
		//alert("game has started");
		/*
		for(var i = 0; i < num; i++){
			
			that.playerIndices[that.currentPlayer]++;
			if(that.playerIndices[that.currentPlayer] >= 40){
				that.playerIndices[that.currentPlayer] -= 40;
			}
			
			
			this.setState({
				playerIndices: that.playerIndices
			});
			
		}
		*/
		that.playerIndices[that.currentPlayer] += num;
		
		if(that.playerIndices[that.currentPlayer] >= 40){
			that.playerIndices[that.currentPlayer] -= 40;
		}
		
		
		//TODO: do the action of the card
		
		
		//next player's turn
		var currentPlayer = that.currentPlayer;
		currentPlayer++;
		if(currentPlayer > that.players.length){
			currentPlayer -= that.players.length;
		}
		
		//
		//update game state with new index
		//alert(that.playerIndices[that.currentPlayer]);
		this.setState({
			playerIndices: that.playerIndices,
			currentPlayer: currentPlayer
		}, () => {
	//	alert(this.state);
		});
		
		console.log(this.state.playerIndices);
		
	}
	
	this.setState({
		hasGameStarted: true
	});
	
  }

  render() {

	let status;	
	status = 'Current player: ' + this.state.currentPlayer;
	
	  

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 0, 1, "start", true)}
          {this.renderSquare(this.state.playerIndices, 1, 2, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 2, 3, "marketCard", true)}
          {this.renderSquare(this.state.playerIndices, 3, 4, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 4, 5, "marketCard", true)}
          {this.renderSquare(this.state.playerIndices, 5, 6, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 6, 7, "marketCard", true)}
          {this.renderSquare(this.state.playerIndices, 7, 8, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 8, 9, "marketCard", true)}
          {this.renderSquare(this.state.playerIndices, 9, 10, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 10, 11, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 39, 0, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 11, 12, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 38, 39, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 12, 13, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 37, 38, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 13, 14, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 36, 37, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 14, 15, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 35, 36, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 15, 16, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 34, 35, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 16, 17, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 33, 34, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 17, 18, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 32, 33, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 18, 19, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 31, 32, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 99, 99, "", false)}
          {this.renderSquare(this.state.playerIndices, 19, 20, "pay", true)}
        </div>
        <div className="board-row">
          {this.renderSquare(this.state.playerIndices, 30, 31, "marketCard", true)}
          {this.renderSquare(this.state.playerIndices, 29, 30, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 28, 29, "marketCard", true)}
          {this.renderSquare(this.state.playerIndices, 27, 28, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 26, 27, "marketCard", true)}
          {this.renderSquare(this.state.playerIndices, 25, 26, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 24, 25, "marketCard", true)}
          {this.renderSquare(this.state.playerIndices, 23, 24, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 22, 23, "marketCard", true)}
          {this.renderSquare(this.state.playerIndices, 21, 22, "pay", true)}
          {this.renderSquare(this.state.playerIndices, 20, 21, "pay", true)}
        </div>
	  <div>
        <ReactDice faceColor={'#0B6623'} numDice={2} rollTime={0.5} disableIndividual={true} rollDone={this.rollDoneCallback} ref={dice => this.reactDice = dice} />
      </div>
	  <button onClick={() => this.rollAll()}>Roll Dice</button>
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

