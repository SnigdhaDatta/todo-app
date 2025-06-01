import { useState, useEffect } from "react" //importing use state from react hook and use effect react hook so that we can use them
import { Header } from "./components/Header"
import { Tabs } from "./components/Tabs"
import { TodoInput } from "./components/TodoInput"
import { TodoList } from "./components/TodoList"

//app component manages the whole app as a compact
//at first website load krbo then control app.jsx component ei thkabe karon tokhono onno kono button ba firld e amra hath lagai ni
//then amra jei component use krbo tar file e control jabe seta solve hoye app component eri handler function k call krle tkhn control will go to the app and changes will get reflected in the app(i.e the display)

function App() {
  // const todos = [
  //   { input: 'Hello! Add your first todo!', complete: true },
  //   { input: 'Get the groceries!', complete: true },
  //   { input: 'Learn how to web design', complete: false },
  //  { input: 'Say hi to gran gran', complete: true },
  //  ]
  //complete is here to check the status of the input whether its completed or not and the input is the task to do, hence we can see we an array of key value pairs and each array elemnt has 2 key value pair

  //Basically using use state means we can now allow user behaviour to manipulate the values of the todo list, mane user ja dbe use state diye chnge krte parbo list take
  // useState() returns an array of 2 values ehich is the current state(todos) and the function that will change/update the current value to the next value(setTodos)
  // todos is The current value of the state — in this case, the array of todos.
  // setTodos is	A function to update the todos state. You use this to add, remove, or change items. We just apply set before the inout variable for making it act as a set function like here setTodos is setting the todos(dynamic behaviour by the user)
  const[todos, setTodos]=useState([/*{input: 'Hello! Add your first todo!', complete: true }*/]) //the input part is optional cuz we can leave it empty if we dont want a default value alraedy present as a input on the screen when we open the website
  
  const [selectedTab, setSelectedTab] = useState('All')// setting a use stae variable for the tab
  //Now we will be creating handler functions which will handle certain functions involved with the todos
  
  // 1)a function that would handle the addition of a new todo inside the list, means oi plus icon click kre jkhn add kra hbe tkhn thakbe
  function handleAddTodo(newTodo) { //newTodo is the new todo input that we will add
    const newTodoList=[...todos, {input: newTodo, complete:false}]
    // as in react these stateful variables are immutable i.e they can't be moditified/changed hence amra akta newtodolist banabo where we will at first copy the previous todos present to the new list(as shown through spread operator) and send place e amra jei todo take notun add(append) korbo setake boshabo as here amra second e akta new todo boshiyechi jetar input and complete holo key
    //hence we are writing here a duplicate/cop(newTodoList) which will completely override the original todos, amra newTodo todo tei append krte prtm but ai karoner jnne akta newTodoList wala empty array baniye or mddhe add kr6i newTodo
  
    setTodos(newTodoList) //the setter function overrides the todo array with newTodoList array 
    handleSaveData(newTodoList) //invoking the save data function so that ei particular handler function e ja chnge hoye ota save function er through jate save hoye jae database e and its reflective
  }

  // 2)handler function to update/edit/modify any todo
  function handleCompleteTodo(index) {
    let newTodoList=[...todos] //newtodoList bole akta empty array te todos array ke copy korche
    let completeTodo=newTodoList[index] //then j index ta function e pass hyeche oi index er key value pair k akta variable e copy krlo
    completeTodo.complete=true //or completeTodo['complete']=true , this means object er complete property te j false chilo otake true korlo means status changed
    newTodoList[index]=completeTodo //then j change ta krlm seta to completeTodo er object tae krlm so newTodo er oi index er object k override kre boshalam 
    setTodos(newTodoList) //then setter function diye changedlist take replace kre dilm with current list
    handleSaveData(newTodoList) //invoking the save data function so that ei particular handler function e ja chnge hoye ota save function er through jate save hoye jae database e and its reflective
  }

  // 3)function to handle deleting of any todo
  function handleDeleteTodo(index) { //passing index of the todo that is to be deleted
    let newTodoList=todos.filter((val,valIndex)=>{
      return valIndex!==index //akta new filtered array banacchi jetate deleted todo bade sob gulo thkbe
    })
    setTodos(newTodoList)
    handleSaveData(newTodoList) //invoking the save data function so that ei particular handler function e ja chnge hoye ota save function er through jate save hoye jae database e and its reflective
  }

  /*useEffect ki?
  🧠 useEffect holo React-er ekta hook, ja diye amra side effect handle kori.

  🎯 Side Effect bolte ki bujhi?
  Side effect mane:

  "Ei component er main kaj chara je kichu extra kaj korte hoy — sei kaj gulo."

  🔧 Example side effects:

      API call kora
      Local storage e data rakha
      DOM modify kora
      Console log kora
      Timer set kora etc.

  */

  //we are making this save function so that any changes made to the new todo inputs or addition or deletion anything that gets saved/persisted indide the database so that it displays that way in the screen
  /*| Part                                      | Bujhiye bola                                                            |
    | ----------------------------------------- | ----------------------------------------------------------------------- |
    | `function handleSaveData(currentTodos)`   | Eta ekta function jeta `todos` naam er input nibe (todo list)           |
    | `currentTodos`                            | Eta hocche array/object – jeta amra save korte chai                     |
    | `localStorage.setItem()`                  | Browser e data store korar built-in method                              |
    | `"todo-app"`                              | Key – mane je nam e amra data save korbo                                |
    | `JSON.stringify(todos)`                   | Todos ke string e convert korchi (localStorage only strings store kore) |
 */
  function handleSaveData(currentTodos){
    localStorage.setItem('todo-app', JSON.stringify({todos:currentTodos}))
  }
  // Save function er kaaj holo data ke browser er memory te rekhe dewa, jate page reload holeo data na haray. Tar jonne amra use kori localStorage.setItem() method. Ar data object thakle JSON string kore rakhte hoy.

  //we use use effect react hook specifically for tracking events like when the page is loaded. Suppose running some code because the page is loaded like fetching data from the database
  // takes 2 arguments 1) arrow function 2) is an array(known as dependency array)
  //the dependency array may contain a value or maybe emtpty. jodi value thake means oi value ta jokhon change hobe tokhoni useeffect er moddhe j first arrow function ta ache seta call hobe
  useEffect(()=>{
    if(!localStorage || !localStorage.getItem('todo-app'))
      { 
        return // if we don't hava a local storage or there is no data in the todo app key in the local storage then dont execute further just return , hence we are going to create a save function above
      }
    // console.log('here')
    let db=[] // initializing database as an empty array
    // getItem is the method to be invoked to get the data, since we read our data in json format from any database hence itneeds a unique key/label to gets data from it(jeta first bracket e mention kra, here its todo-app) under which all our information is saved
    //local storage e check korche whether todo-app bole kono uniquee key present kina
    if(localStorage.getItem('todo-app')){
      db=JSON.parse(localStorage.getItem('todo-app'))//if yes then the json data that we got will at first be parsed(coverting back json string to javascript array/object) then stored in databse variable
      // Tumi jokhon kono data ke JSON.stringify() diye string baniao localStorage ba server e pathao, tarpor jokhon sei string ta abar use korte chao, tokhon JSON.parse() diye take abar normal object/array banate hoy. Ei conversion-ke bole parsing JSON.
      setTodos(db.todos) //now database e j todos object ta modify hoye save holo setai setter function er through actual todos object eo jeta app component e amra declare korechi setate set hoye jabe
    }

  },[])


  return (
     <> {/* <> sign is react fragments tag  and whnever we add any javascript variable here we always include it inside curly braces and below we are basically communicating the number of todos in the array to other components below through attributes so that we can calculate the value isdide those components*/}
      <Header todos={todos}> </Header>
      <Tabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} //here we are passing the setter funtion directly beacuse we just need the dynamic behaviour of tabs and its not a complex thing hence directly j set value setai pathiye di6i
       todos={todos}> </Tabs> 
      <TodoList handleCompleteTodo={handleCompleteTodo} handleDeleteTodo={handleDeleteTodo} selectedTab={selectedTab} todos={todos}> </TodoList>
      {/* below we are passing the handleAddTodo fucntion as property to the TodoInout component so that the component keeps on accesing the right input list(as addition and deletion might happen) */}
      <TodoInput handleAddTodo={handleAddTodo}> </TodoInput> 
    </>
  )
}

export default App
