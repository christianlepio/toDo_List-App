import React, { useRef, useEffect, useState } from 'react';
import GroceryContext from '../context/GroceryContext';
import { v4 as uuid } from "uuid";

const GroceryContextProvider = ({children}) => {
    const groceryInput = useRef();
    const [groceryItem, setGroceryItem] = useState('');
    const [groceryList, setGroceryList] = useState([]);
    const [taskDone, setTaskDone] = useState([]);

    useEffect(()=>{
        groceryInput.current.focus();
    },[groceryItem]);

    const submitGroceryItem = (event)=>{
        event.preventDefault(); //to prevent webpage from loading
        if (groceryItem.trim().length !== 0) { //check if input groceryItem is not null or empty
            setGroceryList([{id: uuid(), name: groceryItem}, ...groceryList]);
            setGroceryItem('');
        }else{
            groceryInput.current.focus();
        }
    };

    const removeGroceryItem = (groceryItemId) =>{ //delete specific item to an array
        const filteredItems = groceryList.filter((items) => items.id !== groceryItemId);
        setGroceryList(filteredItems);
    };

    const markAsDone = (taskId, taskName) => { //mark task item as done
        setTaskDone([{id: taskId, name: taskName}, ...taskDone]);
        removeGroceryItem(taskId); 
    };

    const editTaskItem = (taskId, taskName) => { //edit task item
        const updateTaskItem = groceryList.map((item)=>{
            if (item.id === taskId) {
                return{...item, name: taskName};
            }

            return item;
        });

        setGroceryList(updateTaskItem);   
    };

    return (
        <GroceryContext.Provider
            value={
                {
                    groceryInput, 
                    groceryItem, 
                    setGroceryItem, 
                    groceryList, 
                    setGroceryList, 
                    submitGroceryItem, 
                    removeGroceryItem,
                    markAsDone, 
                    editTaskItem, 
                    taskDone, 
                    setTaskDone
                }
            }
        >
            {children}
        </GroceryContext.Provider>
    )
}

export default GroceryContextProvider