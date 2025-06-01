export function Header(props){
    const {todos}=props
    const todolength=todos.length

    const tasksOrtask= todolength!=1 ? 'tasks':'task'
    return(
        <header>
            <h1 className="text-gradient">You have {todolength} open {tasksOrtask} </h1>
        </header>
    )
}