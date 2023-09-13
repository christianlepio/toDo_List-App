import React, { useContext, useState } from 'react';
import GroceryContext from '../context/GroceryContext';
import MainStyle from './css/App.module.css';

const ToggleTheme = () => {
    const {darkMode, setDarkModee} = useContext(GroceryContext);

    const [btnBg, setBtnBg] = useState('');

    const setDarkMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'dark');
    };
    
    const setLightMode = () => {
        document.querySelector("body").setAttribute('data-theme', 'light');
    };

    const toggleThemeBtn = (e) => {
        if (e.target.checked) {            
            setDarkMode();
            setBtnBg('bg-warning border-warning');
            setDarkModee(true);
        }else{
            setLightMode();            
            setBtnBg('');
            setDarkModee(false);
        }
    };

    return (
        <>
            <div className="row justify-content-center mt-3">        
                <div className={"col-10 rounded border-top border-info border-4 "+(darkMode ? 'shadow todoBox' : 'shadow-sm')}>
                    <div className="form-check form-switch form-check-reverse my-2">
                        {darkMode ? 
                            <i className="bi bi-moon-fill text-light lh-lg mx-3 fs-6"></i>
                        : 
                            <i className="bi bi-brightness-low-fill text-warning mx-3 fs-4"></i>
                        }
                        <input 
                            className={btnBg+" form-check-input "+MainStyle.toggleBtn} 
                            type="checkbox" 
                            role="switch" 
                            id="flexSwitchCheckChecked" 
                            onChange={toggleThemeBtn}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default ToggleTheme