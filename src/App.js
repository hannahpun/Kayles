import React, { Component } from 'react';
import './App.scss';

// components
import Tournament from './Components/Tournament';

const totalPlayers = 16;
const pins = 10;

const setPlayLists = () => {
  // @return  [[value, status], [value, status], ...]
  // status 0: waiting to play, 1: playing, 2: win, 3: lose
  let storePlayers = [];
  let tmpArr = [];
  for(let i = 0; i < totalPlayers; i++){
    tmpArr[i] =  i;
  }
  // Random
  var i = 4,
      j = 0,
      temp
  while(i--) {
      j = Math.floor(Math.random() * i);
      // swap randomly chosen element with current element
      temp = tmpArr[i];
      tmpArr[i] = tmpArr[j];
      tmpArr[j] = temp;
  }

  tmpArr.forEach((item, index) => {
    storePlayers.push([item, 0])
  })

  return storePlayers;
}
class Game extends Component {

  state = {
      round: 1,
      startIndex: 0,
      currentPlayer: 0,
      pinsRemoved: [],
      selectPlayers: [],
      playersLists: setPlayLists(),
      winLists: [],
      pinsSelectedForRemoval: []
    };
    
  componentWillMount(){
    this.startSelect(this.state.playersLists)
  }

  startSelect = (currentlists) => {
    const {startIndex} = this.state;
      // index [startIndex] and index [startIndex + 1] start game
      for(let i = 0; i< 2; i++){
        // change status from 0(waiting) to 1(current playing)
        currentlists[startIndex][1] = 1
        currentlists[startIndex + 1][1] = 1
      }
      this.setState({
        playersLists: currentlists,
        currentPlayer: currentlists[startIndex][0],
        selectPlayers: [currentlists[startIndex][0], currentlists[startIndex + 1][0]]
      })
    
    
  }
  pinWasSelected = (pinNumber) => {
    const {pinsRemoved, pinsSelectedForRemoval} = this.state;
    // Pin has already been removed
    if (pinsRemoved.includes(pinNumber)) return;
    // Pin has already been Selected for removal
    else if (pinsSelectedForRemoval.includes(pinNumber))
      this.setState({
        pinsSelectedForRemoval: pinsSelectedForRemoval.filter(pin => pin !== pinNumber)
      });
    // 2 pins are already Selected for removal
    else if (pinsSelectedForRemoval.length >= 2) return;
    else 
      // first choose and second choose are adjacent
      if (pinsSelectedForRemoval.length === 0 || Math.abs(pinsSelectedForRemoval[0] - pinNumber) < 2 ) 
        this.setState({
          pinsSelectedForRemoval: pinsSelectedForRemoval.concat(pinNumber)
        });
  };

  playTurn = () => {
    const {currentPlayer, selectPlayers, pinsRemoved, pinsSelectedForRemoval} = this.state;

    if (pinsSelectedForRemoval.length < 1) return;

    const nextPlayer = currentPlayer === selectPlayers[0] ? selectPlayers[1] : selectPlayers[0];
    this.setState({
      currentPlayer: nextPlayer,
      pinsRemoved: pinsRemoved.concat(pinsSelectedForRemoval),
      pinsSelectedForRemoval: []
    }, this.checkGameCompletion);
  };

  checkGameCompletion = () => {
    const {startIndex, currentPlayer, pinsRemoved, playersLists, winLists} = this.state;

    if (pinsRemoved.length === pins) {
      alert(`Player ${currentPlayer + 1} won!`);
      
      let tmpPlayLists = playersLists;

      let winTmp = winLists;
      if(tmpPlayLists[startIndex][0] === currentPlayer){
        tmpPlayLists[startIndex][1] = 2;
        tmpPlayLists[startIndex + 1][1] = 3;
        winTmp.push([currentPlayer, 0]);
      }else{
        tmpPlayLists[startIndex][1] = 3;
        tmpPlayLists[startIndex + 1][1] = 2;
        winTmp.push([tmpPlayLists[startIndex + 1][0], 0]);
      }
      
    
      this.setState((prevState, props) => ({
        currentPlayer: prevState.currentPlayer,
        // reset
        startIndex: prevState.startIndex + 2,
        pinsRemoved: [],
        pinsSelectedForRemoval: [],
        playersLists: tmpPlayLists,
        winLists: winTmp
      }), function(){
        // next round
        if(winLists.length*2 === playersLists.length){
          this.nextRound();
          return;
        }
         // next two players
        this.startSelect(this.state.playersLists)
      });
    }
  };

  nextRound(){
    this.setState((prevState) => ({
      currentPlayer: 0,
      startIndex: 0,
      round: prevState.round + 1,
      playersLists: prevState.winLists,
      winLists: []
    }), function(){

      if(this.state.playersLists.length < 2){
        // Final
        alert(`${this.state.playersLists[0][0] + 1} won the final round`)
        return;
      }
      this.startSelect(this.state.playersLists)
     
    })
  }
  render() {
    const {currentPlayer, selectPlayers, playersLists, pinsRemoved, pinsSelectedForRemoval} = this.state;
    return (
      <div className='Game'>
        <Tournament round={this.state.round} players={playersLists}></Tournament>
        { this.state.playersLists.length >= 2 ? ( <section>
          <h2 className='SubTitle'>
          {`Player ${selectPlayers[0] + 1}`} vs. {`Player ${selectPlayers[1] + 1}`}
          </h2>

          <h3>
            {`Player ${currentPlayer + 1}'s turn`}
          </h3>

          <div className='Board'>
            {
              Array(pins).fill().map((_, pinNumber) =>
                <div
                  className={`Pin ${
                    pinsSelectedForRemoval.includes(pinNumber)
                    ? 'SelectedForRemoval'
                    : pinsRemoved.includes(pinNumber)
                    ? 'Removed'
                    : ''
                  }`}
                  key={pinNumber}
                  onClick={() => this.pinWasSelected(pinNumber)}
                >
                  {/*pinNumber + 1*/}
                </div>
              )
            }
            <button disabled = {pinsSelectedForRemoval.length === 0 ? true: false} className="btn" onClick={this.playTurn}>
              Done
            </button>
          </div>

          
        </section> ): null}
       
      </div>
    );
  };
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className='Header'>Kayles</h1>
        <Game />
      </div>
    );
  }
}

export default App;
