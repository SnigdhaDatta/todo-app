import { TodoCard } from "./TodoCard";

export function TodoList(props){
    // When a component receives props, destructuring can be used to extract specific values directly within the function parameters or component body.
    const {selectedTab,todos}=props //destructuring props
    
    // at first we are filtering out the list based on the tab chosen
    const filteredTodo= selectedTab==='All' ? //jkhn all tab e thke then sob todos display hobe
        todos :
        selectedTab==='Completed' ? //jodi complete tab e thke then only jeta completed setai show hbe
            todos.filter((val)=>val.complete===true) :
            todos.filter((val)=>val.complete===false) // ebar jokhon incomplete or remaining tab e thake tokhon amra show krbo just incompleted todo gulo
    
    return(
        <>
          {
            // now based on the filtered todo array we got we will represent that much no. of todos present in the filteredTodo array in card form
            // hence we will pass each of those todos in filtered array to todoCard component where it will get converted into card and then by using map function will be displayed (jotot gulo list e ache totoguloi represent hbe hence used concept of loop through map function)
            filteredTodo.map((todo,todoIndex)=>{
                return(
                    <TodoCard
                    // A special React prop (not passed to the component) used to identify each item in a list efficiently during re-rendering.
                    key={todoIndex}
                    // A prop passed to the TodoCard component, likely used inside it (maybe to delete or edit a todo by index).
                    /*  1. todos.findIndex(...): todos holo puro todos er array.findIndex() ekta method jeita first match paile oi element er index return kore.

                        2. val => val.input == todo.input
                        val mane todos array er ekekta todo object.
                        Se check korche: val.input (mane original todo input) == todo.input (current todo er input)
                        Mane:
                        👉 Jekhan theke ei code call kora hocche, oi todo.input er shathe original todos array er kon input match kore, ta check kore tar index ta return korche.

                        ✅ Use case:
                        Dhoro tumi ekta todo ke edit, delete, or toggle complete korte chaccho.

                        Tobe tumi age dekhbe: Ei todo ta todos array e koto number position e ache?

                        Tokhon eita dorkar hoy:
                        const index = todos.findIndex(val => val.input == todo.input)
                        Then sei index e operation korbo */
                    todoIndex={todos.findIndex(val=>val.input==todo.input)} //amader j current todo(jei todo tate point korche filtered todos er modde) or imput er sthe jdi actual todo er kono input mile jae tar index er upor ei implementation hbe todo card e
                    {...props} //the properties passed here should also be passed to the todo card i.e the selectedTab and todos
                    // Another prop passed to TodoCard, containing the current todo item text or object 
                    todo={todo}> 
                    </TodoCard>
                )
            })
          }  
        </>
    )
}