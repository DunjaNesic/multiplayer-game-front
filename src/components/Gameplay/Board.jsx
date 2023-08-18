import React from 'react';
import Field from './Field';
import './gameplay.css'

const Board = () => {

    return (
       <div className="board">
        <div className="gameplay--row">
            <Field fieldColumn={0} fieldRow={0}/>
            <Field fieldColumn={1} fieldRow={0}/>
            <Field fieldColumn={2} fieldRow={0}/>
            <Field fieldColumn={3} fieldRow={0}/>
            <Field fieldColumn={4} fieldRow={0}/>
            <Field fieldColumn={5} fieldRow={0}/>
        </div>
        <div className="gameplay--row">
            <Field fieldColumn={0} fieldRow={1}/>
            <Field fieldColumn={1} fieldRow={1}/>
            <Field fieldColumn={2} fieldRow={1}/>
            <Field fieldColumn={3} fieldRow={1}/>
            <Field fieldColumn={4} fieldRow={1}/>
            <Field fieldColumn={5} fieldRow={1}/>
        </div>
        <div className="gameplay--row">
            <Field fieldColumn={0} fieldRow={2}/>
            <Field fieldColumn={1} fieldRow={2}/>
            <Field fieldColumn={2} fieldRow={2}/>
            <Field fieldColumn={3} fieldRow={2}/>
            <Field fieldColumn={4} fieldRow={2}/>
            <Field fieldColumn={5} fieldRow={2}/>
        </div>
        <div className="gameplay--row">
            <Field fieldColumn={0} fieldRow={3}/>
            <Field fieldColumn={1} fieldRow={3}/>
            <Field fieldColumn={2} fieldRow={3}/>
            <Field fieldColumn={3} fieldRow={3}/>
            <Field fieldColumn={4} fieldRow={3}/>
            <Field fieldColumn={5} fieldRow={3}/>
        </div>
        <div className="gameplay--row">
            <Field fieldColumn={0} fieldRow={4}/>
            <Field fieldColumn={1} fieldRow={4}/>
            <Field fieldColumn={2} fieldRow={4}/>
            <Field fieldColumn={3} fieldRow={4}/>
            <Field fieldColumn={4} fieldRow={4}/>
            <Field fieldColumn={5} fieldRow={4}/>
        </div>
        <div className="gameplay--row">
            <Field fieldColumn={0} fieldRow={5}/>
            <Field fieldColumn={1} fieldRow={5}/>
            <Field fieldColumn={2} fieldRow={5}/>
            <Field fieldColumn={3} fieldRow={5}/>
            <Field fieldColumn={4} fieldRow={5}/>
            <Field fieldColumn={5} fieldRow={5}/>
        </div>
       </div>
    )
}


export default Board;