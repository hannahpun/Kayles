import React from 'react';
import './Tournament.scss';



const Tournament = (props) => {
  return (
    <section className="Round">
      <h1>Round {props.round}</h1>
      { (props.players).map((value, key) => (
          <div key={key} className={"Player Player-status" + value[1]}>{ value[0] + 1}</div>
        )) 
      }
     </section>
  )
}

export default Tournament;
