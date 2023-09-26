import React, { Children, useContext, useEffect, useRef, useState } from 'react'
import GroceryContext from '../context/GroceryContext';
import Swal from 'sweetalert2';
import Style from './css/App.module.css';
import DisplayItems from './DisplayItems';

const GroceryItemsComponent = () => {
    const {
            groceryList, 
            setGroceryList, 
            removeGroceryItem,
            markAsDone, 
            editTaskItem, 
            taskDone, 
            setTaskDone, 
            darkMode, 
            swalColor, 
            swalBg  
        } = useContext(GroceryContext);

    const editInputRef = useRef();

    const swalAlertFunc = (titles, texts) => {
        Swal.fire({
            title: titles, //'Tasks Cleared!',
            text: texts, //'All Tasks was successfully deleted!',
            color: swalColor,
            background: swalBg, 
            iconHtml: '<i class="bi bi-trash3"></i>',
            customClass:{
                icon: `${Style.iconBorder}`,
            },
            showConfirmButton: false,
            timer: 3000
        });
    };

    return (
        <>
            <div className="row justify-content-center p-3">
                <div className="table-responsive">
                    {groceryList.length > 0 && 
                        <ul className="list-group list-group-flush shadow-sm rounded border-top border-info border-4">
                            <div className="overflow-y-auto" style={{maxHeight: '50vh'}}>
                                {
                                    groceryList.map((itemData, index)=>
                                        <DisplayItems
                                            key={itemData.id}
                                            items = {itemData} 
                                            index={index} 
                                            removeGroceryItem={removeGroceryItem}
                                            markAsDone={markAsDone} 
                                            editTaskItem={editTaskItem} 
                                            editInputRef={editInputRef} 
                                        />
                                    )
                                }
                            </div>
                        </ul>
                    }
                    
                    <div className="row justify-content-center mb-2 mt-4">
                        <div className="col-12 text-center">
                            {groceryList.length > 0 && 
                                <button 
                                    className={'btn btn-light shadow-sm fs-6 mb-2 ' + Style.clrBtn + (darkMode ? ' clrDoneBtn' : '')} 
                                    onClick={()=>{
                                        Swal.fire({
                                            title: 'Delete all pending tasks?',
                                            text: "You won't be able to revert this!",
                                            icon: 'warning',
                                            color: swalColor,
                                            background: swalBg, 
                                            showCancelButton: true,
                                            confirmButtonColor: '#3085d6',
                                            cancelButtonColor: '#d33',
                                            confirmButtonText: 'Yes, delete all!'
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                setGroceryList([]);
                                                localStorage.setItem('localGroceryList', JSON.stringify([]));
                                                swalAlertFunc('Tasks Cleared!','All Tasks was successfully deleted!');
                                            }
                                        })
                                    }}
                                >
                                    Clear Tasks
                                </button>
                            }
                            {taskDone.length > 0 && 
                                <button 
                                    type="button" 
                                    className={'btn btn-light shadow-sm fs-6 mb-2 ' + Style.doneBtn + (darkMode ? ' clrDoneBtn' : '')} 
                                    data-bs-toggle="modal" 
                                    data-bs-target="#exampleModal" 
                                >
                                    Done Tasks
                                </button>
                            }
                        </div>
                    </div>

                    {/* this is modal dialog box */}
                    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
                            <div className={"modal-content border-top border-info border-4 border-start-0 border-bottom-0 border-end-0 "+(darkMode ? 'modalBg' : '')}>
                                <div className="modal-header">
                                    <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="bi bi-check-circle-fill text-success"></i> Accomplished Tasks</h1>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div className="modal-body">
                                    {taskDone.length > 0 ? 
                                    <>
                                        <ul className="list-group list-group-flush rounded shadow-sm">
                                            {taskDone.map((task, indx)=>{
                                                const listBg = indx % 2 == 0 ? '' : 'bgLight';
                                                return (<li key={task.id} className={'list-group-item rounded border-bottom-0 taskItems2 '+listBg}><i className="bi bi-check-circle text-success"></i> {task.name}</li>);
                                            })}
                                        </ul>
                                    </> 
                                    : 
                                    <>
                                        No Accomplished Tasks Here...
                                    </>}
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    {taskDone.length > 0 && 
                                        <button 
                                            type="button" 
                                            className="btn btn-danger" 
                                            onClick={()=>{
                                                Swal.fire({
                                                    title: 'Delete all accomplished tasks?',
                                                    text: "You won't be able to revert this!",
                                                    icon: 'warning',
                                                    color: swalColor,
                                                    background: swalBg, 
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Yes, delete all!'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        setTaskDone([]);
                                                        localStorage.setItem('localTaskDone1', JSON.stringify([]));
                                                        swalAlertFunc('Cleared!','Your accomplished tasks were cleared!');
                                                    }
                                                })
                                            }}
                                        >
                                            Clear Items
                                        </button>}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* this is modal dialog box */}
                </div>
            </div>
        
        </>
    )
}

export default GroceryItemsComponent