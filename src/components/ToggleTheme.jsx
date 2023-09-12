import React, { useState } from 'react';
import MainStyle from './css/App.module.css';

const ToggleTheme = () => {
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
        }else{
            setLightMode();            
            setBtnBg('');
        }
    };

    return (
        <>
            <div className="row justify-content-end mt-3">        
                <div className="col-4">
                    <div className="form-check form-switch form-check-reverse mx-5">
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