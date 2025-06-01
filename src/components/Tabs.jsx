export function Tabs(props){
    const tabs=['All','Open','Completed']
    const {selectedTab, setSelectedTab,todos }=props
    return(
        <nav className="tab-container">
           {/* when we write javascript inside jsx we write that js code within curly braces   */
                tabs.map((tab,tabIndex)=>{
                    const noOfTasks = tab==='All' ? 
                    todos.length :
                    tab==='Open' ? 
                    (todos.filter((val)=>val.complete===false)).length :
                    (todos.filter((val)=>val.complete===true)).length
                    
                    return (
                        /*all the buttons need to be identified uniquely by react hence we gave index number which is unique as the key of each button*/ 
                        <button onClick={()=>{
                            setSelectedTab(tab) //j tab e click kora hoyeche seitakei set korchi tab variable e jate dynamically clicking ei tab er value change hote thake amader hardcode kore initialize na korte hoy tab variable e i.e we r setting the selected tab for every case. so the tab is set to the selected tab evrytime
                        }}
                        key={tabIndex}
                        className={"tab-button " + (tab===selectedTab ? ' tab-selected':' ') /*so now second bracket er bhitor jeta ache purotai akta tab button class er bhitor porche and jei tab e click kra hobe(when condition satisfies) ote tab selected class implement hoye jabe and extra styling dekha jbe to show that oi tab tate click kra hye6e */
                        }/*here in javascript or react when we want to implement dynamic class then we wrap up the class name inside curly braces and add stuff behind it(here i have added space). This dynamic class is added to implemnt different styling tge selected tab */
                        >
                            <h4>{tab}<span>({noOfTasks})</span></h4>
                        </button>
                    )
                  }
                )
           }
           <hr /> {/*ekhane akta horizontal line diye dbo , means tab gulor niche akta page break thakbe */}
        </nav>
    )
}