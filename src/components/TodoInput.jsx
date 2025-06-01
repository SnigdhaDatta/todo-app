// this component manages only the input field jetate new todo type krbo , so whenever we move to the input box control is shifted to this component

import { useState } from 'react'
export function TodoInput(props){
    const {handleAddTodo}=props //deserialization/extraction of properties or information communicated to the function
    const [inputValue, setInputValue]=useState('')  //initially input field empty thakbe so usestate oi field take empty bhabe initialize kre rakhar jonne then set krbe 
    // console.log(inputValue) 
    return(
        <div className="input-container">
            {/* nicher code e protita input value change jkhn hbe then setter function er through target value tao chnge hbe cuz jodi kono inut chnge hy then or unique key value o change hbe */}
            <input value={inputValue} onChange={(e)=>{
                setInputValue(e.target.value) //onChange kaj kore jokhon user kichu likhe, e.target.value holo user er lekha ta input box er and setter function diye ota set kr6i
            }} placeholder="Add Task"></input>
            <button onClick={()=>{
                    if(!inputValue){return} //and jodi kichui type na kra hy then add fucntion of app component will not even br called
                    handleAddTodo(inputValue) //jokhon + button click korbo tokhon jeta add kr6i seita app component er handleAddTodo function e value hisebe pass kra hbe by calling that fucntion here means control will go to the app.jsx
                    setInputValue('') //jei add kora hoye jabe then input field ta blank set kore dao
                    // console.log("cleared")
                }    
            }>
                <i className="fa-solid fa-plus"></i>
            </button>
        </div>
    )
}