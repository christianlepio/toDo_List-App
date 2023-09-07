import React, { useContext, useEffect, useState } from 'react'
import ModalComponent from './ModalComponent';
import GroceryContext from '../context/GroceryContext';

const DisplayItems = (
        {
            items, 
            index, 
            removeGroceryItem, 
            markAsDone, 
            editTaskItem, 
            editInputRef 
        }
    ) => {

    const {groceryList, taskDone} = useContext(GroceryContext);

    const [editedTask, setEditedTask] = useState(items.name);
    const [isEdit, setIsEdit] = useState(false);
    const [editErrMsg, setEditErrMsg] = useState('');
    const [taskExist3, setTaskExist3] = useState(false);
    const [taskExist4, setTaskExist4] = useState(false);

    const saveEdit = (event) => {
        event.preventDefault();
        if (editedTask.trim().length !== 0) {
            if (!editErrMsg) {
                setEditErrMsg(''); 
                editTaskItem(items.id, editedTask);
                setIsEdit(false);   
            }else{
                editInputRef.current.focus();
            }
        }else{
            setEditErrMsg('Input must not be empty!');
            editInputRef.current.focus();
        }
    }

    useEffect(()=>{
        if (editInputRef.current) {
            editInputRef.current.focus(); 
        }
    },[isEdit]); 

    useEffect(()=>{
        setEditErrMsg('');
        setTaskExist3(false);
        setTaskExist4(false);

        if (items.name !== editedTask.trim()) {   
            validateItemEdit(editedTask);
            
            if (taskExist3) {
                setEditErrMsg('Task has been accomplished!');            
            }else if(taskExist4){
                setEditErrMsg('Task already exist!');
            }else if(editedTask.trim().length === 0){
                setEditErrMsg('Input must not be empty!');
            }
        }
    },[taskExist3, taskExist4, editedTask, taskDone, groceryList]);

    const validateItemEdit = (taskName) => {
        taskName = taskName.trim();

        setTaskExist3(taskDone.some(doneData=>doneData.name === taskName));
        setTaskExist4(groceryList.some(itemData=>itemData.name === taskName));         
    };

    return (
        <>                    
            <li className={'list-group-item border-start-0 border-bottom-0 border-top-0 border-end-0 rounded text-break lh-lg ' + (index % 2 == 0 ? '' : 'bg-light')}>
                {!isEdit && 
                    <span className="dropdown">
                        {/* Button trigger modal */}
                        <button 
                            type="button" 
                            className="btn btn-light btn-sm" 
                            data-bs-toggle="modal" 
                            data-bs-target={"#modal"+items.id}
                        >
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>
                        
                        <ModalComponent                            
                            modalItems={items}
                            setIsEdit={setIsEdit} 
                            removeGroceryItem={removeGroceryItem} 
                            markAsDone={markAsDone} 
                        /> {/* Modal (this will show once the more options button has clicked)*/}                        
                    </span>
                }
                
                {isEdit ? 
                    <form onSubmit={saveEdit}>
                        <div className="input-group">
                            <button 
                                className="btn btn-outline-danger" 
                                type="button"
                                onClick={()=>{
                                    setEditErrMsg('');
                                    setEditedTask(items.name);
                                    setIsEdit(false);
                                }}
                            >
                                <i className="bi bi-x fw-bolder"></i>
                            </button>
                            <button 
                                className="btn btn-outline-success" 
                                type="submit" 
                            >
                                <i className="bi bi-check2 fw-bolder"></i>
                            </button>
                            <input 
                                type="text" 
                                className="form-control" 
                                placeholder="Enter an Item Here..." 
                                aria-label="Example text with button addon" 
                                aria-describedby="button-addon1" 
                                value={editedTask} 
                                onChange={(e)=>setEditedTask(e.target.value)} 
                                ref={editInputRef}
                            />
                        </div>
                        {editErrMsg ? <p className='text-sm text-danger fw-lighter text-center mb-1'>{editErrMsg}</p> : null}
                    </form>
                    : 
                    items.name
                }
            </li>
        </>
    )
}

export default DisplayItems