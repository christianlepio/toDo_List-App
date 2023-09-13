import React from 'react'
import Style from './css/App.module.css';

const ModalComponent = (children) => {

    return (
        <>
            <div className="modal fade" id={"modal"+children.modalItems.id} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className={"modal-content border-top border-info border-4 border-start-0 border-bottom-0 border-end-0 "+(children.darkMode ? 'modalBg' : '')}>
                        <div className="modal-header">{/*Modal title*/}
                            <h1 className="modal-title fs-5" id="exampleModalLabel"><i className="bi bi-sliders"></i> Options</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">{/*Modal body*/}
                            <p className={'fs-6 fw-lighter mt-1 mb-1 '+ (children.darkMode ? 'text-body-light' : 'text-body-secondary')}>Task: {children.modalItems.name}</p>
                            <ul className={"list-group list-group-flush rounded"}>
                                <li className={"list-group-item "+(children.darkMode ? 'taskItems2 hoverMe' : Style.doneItems)} data-bs-dismiss="modal" onClick={()=>children.setIsEdit(true)}>
                                    <i className="bi bi-pencil-square text-warning"></i> Edit
                                </li>
                                <li className={"list-group-item "+(children.darkMode ? 'taskItems2 hoverMe' : Style.doneItems)} data-bs-dismiss="modal" onClick={()=>children.removeGroceryItem(children.modalItems.id, children.modalItems.name)}>
                                    <i className="bi bi-x-circle text-danger"></i> Delete
                                </li>
                                <li className={"list-group-item "+(children.darkMode ? 'taskItems2 hoverMe' : Style.doneItems)} data-bs-dismiss="modal" onClick={()=>children.markAsDone(children.modalItems.id, children.modalItems.name)}>
                                    <i className="bi bi-check-circle text-success"></i> Mark as Done
                                </li>
                            </ul>
                        </div>
                        <div className="modal-footer">{/*Modal footer*/}

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ModalComponent