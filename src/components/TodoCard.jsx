export function TodoCard(props){
    const {todo,handleCompleteTodo, handleDeleteTodo, todoIndex}=props
    // console.log(todo)
    return(
        <div className="card todo-item">
            {/* the input of each todo will be displayed in one block using p tag */}
            <p>{todo.input}</p>
            <div className="todo-buttons">
                <button onClick={()=>{
                    //therefore whenever save button is clicked we will call the todosComplete handler function by passing the todo index
                    handleCompleteTodo(todoIndex)
                    }}
                    disabled={todo.complete===true}>
                    <h6>Save</h6>
                </button>
                <button onClick={()=>
                    handleDeleteTodo(todoIndex)
                }>
                    <h6>Delete</h6>
                </button> 
            </div>
        </div>
    )
}