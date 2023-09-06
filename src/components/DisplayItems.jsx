import React, { useEffect, useState } from 'react'
import ModalComponent from './ModalComponent';

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

    const [editedTask, setEditedTask] = useState(items.name);
    const [isEdit, setIsEdit] = useState(false);

    const saveEdit = (event) => {
        event.preventDefault();
        if (editedTask.trim().length !== 0) {
            editTaskItem(items.id, editedTask);
            setIsEdit(false);   
        }
    }

    useEffect(()=>{
        if (editInputRef.current) {
            editInputRef.current.focus(); 
        }
    },[isEdit]);

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
                        /> {/* Modal */}                        
                    </span>
                }
                
                {isEdit ? 
                    <form onSubmit={saveEdit}>
                        <div className="input-group">
                            <button 
                                className="btn btn-outline-danger" 
                                type="button"
                                onClick={()=>{
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
                    </form>
                    : 
                    items.name
                }
            </li>
        </>
    )
}

export default DisplayItems