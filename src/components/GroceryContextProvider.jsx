import React, { useRef, useEffect, useState } from 'react';
import GroceryContext from '../context/GroceryContext';
import { v4 as uuid } from "uuid";
import Swal from 'sweetalert2';
import Style from './css/App.module.css';

const GroceryContextProvider = ({children}) => {
    const groceryInput = useRef();
    const [groceryItem, setGroceryItem] = useState('');
    const [groceryList, setGroceryList] = useState([]);
    const [taskDone, setTaskDone] = useState([]); 
    const [taskExist1, setTaskExist1] = useState(false);
    const [taskExist2, setTaskExist2] = useState(false);
    const [errMsg, setErrMsg] = useState('');
    const [darkMode, setDarkModee] = useState(false);
    const [swalBg, setSwalBg] = useState('#f8f9fa');
    const [swalColor, setSwalColor] = useState('#212529');
    
    let localGroceryList = JSON.parse(localStorage.getItem('localGroceryList'));
    let localTaskDone = JSON.parse(localStorage.getItem('localTaskDone1'));

    useEffect(()=>{
        if (localGroceryList != null && localGroceryList.length > 0 && groceryList.length === 0) {
            setGroceryList(localGroceryList);
        }else{
            localStorage.setItem('localGroceryList', JSON.stringify(groceryList));
        }
    },[localGroceryList]); //save or get grocerylist from localStorage

    useEffect(()=>{
        if (localTaskDone != null && localTaskDone.length > 0 && taskDone.length === 0) {
            setTaskDone(localTaskDone);
        }else{
            localStorage.setItem('localTaskDone1', JSON.stringify(taskDone));
        }
    },[localTaskDone]); //save or get taskDone from localStorage

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

    useEffect(()=>{
        if (darkMode) {
            setSwalBg('#282c34');
            setSwalColor('#f8f9fa');
        }else{
            setSwalBg('#f8f9fa');
            setSwalColor('#212529');
        }
    },[darkMode]);   

    //show alert message if task was updated/MarkedAsDone.
    const displaySwalFire = (swalTitle, swalText) => { 
        Swal.fire({
            icon: 'success',
            title: `${swalTitle}`,
            text: `${swalText}`,
            color: swalColor,
            background: swalBg, 
            showConfirmButton: false,
            timer: 3000
        });
    }

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
        if (!taskName) {
            const filteredItems = groceryList.filter((items) => items.id !== groceryItemId);
            setGroceryList(filteredItems);
            localStorage.setItem('localGroceryList', JSON.stringify(filteredItems));
        }else{
            Swal.fire({
                title: `Delete task "${taskName}"?`,
                text: "You won't be able to revert this!",
                icon: 'warning',
                color: swalColor,
                background: swalBg, 
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const filteredItems = groceryList.filter((items) => items.id !== groceryItemId);
                    setGroceryList(filteredItems);
                    localStorage.setItem('localGroceryList', JSON.stringify(filteredItems));

                    Swal.fire({
                        title: 'Task deleted!',
                        text: `Task "${taskName}" was successfully deleted!`,
                        color: swalColor,
                        background: swalBg, 
                        iconHtml: '<i class="bi bi-trash3"></i>',
                        customClass:{
                            icon: `${Style.iconBorder}`,
                        },
                        showConfirmButton: false,
                        timer: 3000
                    });
                }
            })
        }
    };

    const markAsDone = (taskId, taskName) => { //mark task item as done
        setTaskDone([{id: taskId, name: taskName.trim()}, ...taskDone]);
        removeGroceryItem(taskId);

        let swalText = `Task "${taskName}" was successfully completed!`;

        displaySwalFire('Good Job!', swalText); //display alert message
    };

    const editTaskItem = (taskId, taskName) => { //edit task item   
        let updateIndicator = false;  
        let prevTaskName = '';   
        const updateTaskItem = groceryList.map((item)=>{
            if (item.id === taskId) {
                prevTaskName = item.name;
            }
            if (item.id === taskId && item.name !== taskName.trim()) {
                updateIndicator = true;
                return{...item, name: taskName.trim()};
            }
            
            return item;
        });
        
        if (updateIndicator) {
            Swal.fire({
                title: `Update task "${prevTaskName}"?`,
                text: `Task "${prevTaskName}" will update to "${taskName}".`,
                icon: 'info',
                color: swalColor,
                background: swalBg, 
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, update it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    setGroceryList(updateTaskItem);  

                    let swalText = `Task was updated to "${taskName}".`;

                    displaySwalFire('Task Updated!', swalText); //display alert message
                }
            })  
        }
    };

    const validateTaskName = (taskName) => {
        taskName = taskName.trim().toUpperCase();

        setTaskExist1(taskDone.some(doneData=>doneData.name.toUpperCase() === taskName));
        setTaskExist2(groceryList.some(itemData=>itemData.name.toUpperCase() === taskName));         
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
                    errMsg, 
                    darkMode, 
                    setDarkModee, 
                    swalColor, 
                    swalBg 
                }
            }
        >
            {children}
        </GroceryContext.Provider>
    )
}

export default GroceryContextProvider