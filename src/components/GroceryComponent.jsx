import React, { useContext } from 'react'
import GroceryContext from '../context/GroceryContext'

const GroceryComponent = () => {
    const {
        groceryInput, 
        groceryItem, 
        setGroceryItem, 
        submitGroceryItem, 
        errMsg 
    } = useContext(GroceryContext);

    return (
        <>
            <form 
                className='row justify-content-center mt-4'
                onSubmit={submitGroceryItem}
            >
                <div style={{width: '75vmin'}}>
                    <div className="input-group mb-2 shadow-sm rounded">
                        <input 
                            type="text" 
                            className="form-control inputItem" 
                            placeholder="Enter an Item Here..." 
                            aria-label="Enter an Item Here..." 
                            aria-describedby="button-addon2"
                            value={groceryItem}
                            onChange={(event)=>setGroceryItem(event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1))} //to uppercase first letter of the text
                            ref={groceryInput}
                        />
                        <button 
                            type='submit'
                            className="btn btn-primary" 
                            id="button-addon2"
                        >
                            <i className="bi bi-plus-circle"></i>
                        </button>
                    </div>
                    {errMsg ? <p className='text-sm text-danger fw-lighter text-center mb-1'>{errMsg}</p> : null}
                </div>
            </form>
        </>
    )
}

export default GroceryComponent