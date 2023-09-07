import React, { useRef, useEffect, useState } from 'react';
import GroceryContext from '../context/GroceryContext';
import { v4 as uuid } from "uuid";
import Swal from 'sweetalert2';

const GroceryContextProvider = ({children}) => {
    const groceryInput = useRef();
    const [groceryItem, setGroceryItem] = useState('');
    const [groceryList, setGroceryList] = useState([]);
    const [taskDone, setTaskDone] = useState([]); 
    const [taskExist1, setTaskExist1] = useState(false);
    const [taskExist2, setTaskExist2] = useState(false);
    const [errMsg, setErrMsg] = useState('');

    useEffect(()=>{
        groceryInput.current.focus();
    },[groceryItem]);

    useEffect(()=>{
        setErrMsg('');
        setTaskExist1(false);
        setTaskExist2(false);

        validateTaskName(groceryItem);
        if (taskExist1) {
            setErrMsg('Task has been accomplished!');            
        }else if(taskExist2){
            setErrMsg('Task already exist!');
        }
    },[taskExist1, taskExist2, groceryItem, taskDone, groceryList]); //dependencies

    const submitGroceryItem = (event)=>{
        event.preventDefault(); //to prevent webpage from loading
        if (groceryItem.trim().length !== 0) { //check if input groceryItem is not null or empty 
            if (!errMsg) {
                setGroceryList([{id: uuid(), name: groceryItem.trim()}, ...groceryList]);
                setGroceryItem('');
                setErrMsg('');
                setTaskExist1(false);
                setTaskExist2(false);
            }else{
                groceryInput.current.focus();
            }
        }else{
            groceryInput.current.focus();
        }
    };

    const removeGroceryItem = (groceryItemId, taskName) =>{ //delete specific item to an array
        const filteredItems = groceryList.filter((items) => items.id !== groceryItemId);
        setGroceryList(filteredItems);
        Swal.fire({
            icon: 'success',
            title: 'Task deleted!',
            text: `The task "${taskName}" was successfully deleted!`,
            showConfirmButton: false,
            timer: 2000
        });
    };

    const markAsDone = (taskId, taskName) => { //mark task item as done
        setTaskDone([{id: taskId, name: taskName.trim()}, ...taskDone]);
        removeGroceryItem(taskId);
        Swal.fire({
            icon: 'success',
            title: 'Good Job!',
            text: 'The task was successfully completed!',
            showConfirmButton: false,
            timer: 2000
        });
    };

    const editTaskItem = (taskId, taskName) => { //edit task item        
        const updateTaskItem = groceryList.map((item)=>{
            if (item.id === taskId) {
                return{...item, name: taskName.trim()};
            }

            return item;
        });

        setGroceryList(updateTaskItem);   
    };

    const validateTaskName = (taskName) => {
        taskName = taskName.trim();

        setTaskExist1(taskDone.some(doneData=>doneData.name === taskName));
        setTaskExist2(groceryList.some(itemData=>itemData.name === taskName));         
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
                    setTaskDone,
                    errMsg  
                }
            }
        >
            {children}
        </GroceryContext.Provider>
    )
}

export default GroceryContextProvider