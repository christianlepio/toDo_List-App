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
                        {/* Button trigger modal */}
                        <button type="button" className="btn btn-light btn-sm" data-bs-toggle="modal" data-bs-target="#modalAction">
                            <i className="bi bi-three-dots-vertical"></i>
                        </button>

                        {/* Modal */}
                        <div className="modal fade" id="modalAction" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">{/*Modal title*/}
                                        <h1 className="modal-title fs-5" id="exampleModalLabel">Options</h1>
                                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    </div>
                                    <div className="modal-body">{/*Modal body*/}
                                        <ul className="list-group list-group-flush">
                                            <li className="list-group-item" data-bs-dismiss="modal" onClick={()=>{console.log(items.name); setIsEdit(true)}}>
                                                <i className="bi bi-pencil-square text-warning"></i> Edit
                                            </li>
                                            <li className="list-group-item bg-light" data-bs-dismiss="modal" onClick={()=>removeGroceryItem(items.id)}>
                                                <i className="bi bi-x-circle text-danger"></i> Delete
                                            </li>
                                            <li className="list-group-item" data-bs-dismiss="modal" onClick={()=>markAsDone(items.id, items.name)}>
                                                <i className="bi bi-check-circle text-success"></i> Mark as Done
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="modal-footer">{/*Modal footer*/}

                                    </div>
                                </div>
                            </div>
                        </div>




                        {/* <button className="btn btn-light btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" onClick={()=>setMiniHeight('25vh')} >
                            
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
                        </ul> */}
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