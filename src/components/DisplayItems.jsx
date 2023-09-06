import React, { useEffect, useState } from 'react'

const DisplayItems = (
        {
            items, 
            index, 
            removeGroceryItem, 
            markAsDone, 
            editTaskItem, 
            editInputRef,
            setMiniHeight
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
                        <button className="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={()=>setMiniHeight('25vh')} >
                            
                        </button>
                        <ul className="dropdown-menu">
                            <li 
                                className="dropdown-item"
                                onClick={()=>{setIsEdit(true)}}
                            >
                                <i className="bi bi-pencil-square text-warning"></i> Edit</li>
                            <li 
                                className="dropdown-item" 
                                onClick={()=>removeGroceryItem(items.id)}
                            >
                                <i className="bi bi-x-circle text-danger"></i> Delete</li>
                            <li 
                                className="dropdown-item" 
                                onClick={()=>markAsDone(items.id, items.name)}
                            >
                                <i className="bi bi-check-circle text-success"></i> Mark as Done</li>
                        </ul>
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