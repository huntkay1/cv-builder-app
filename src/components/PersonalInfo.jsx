import { useState } from 'react'
import downIcon from '../assets/down.svg'
import upIcon from '../assets/up.svg'


function PersonalInfo({ handleFormDataUpdate }) {
    const [isExpanded, setIsExpanded] = useState(false);


    function toggleExpand() {
        setIsExpanded(!isExpanded);
    };

    return(
        <div className='form-container' id='personalInfo'>
            <div className='form-header'>
                <h2 className='form-title'>Personal Details</h2>
                <img className='expand-toggle' onClick={toggleExpand} src={isExpanded ? downIcon : upIcon}/>
            </div>
            <form className={isExpanded ? '' : 'collapsed'}>
                <div className='input-container'>
                    <label htmlFor='name'>Full Name</label>
                    <input type='text' name='name' id='name' onChange={handleFormDataUpdate}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' onChange={handleFormDataUpdate}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input type='text' name='phone' id='phone' onChange={handleFormDataUpdate}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' name='location' id='location' onChange={handleFormDataUpdate}></input>
                </div>
            </form>
        </div>
    );
}

export default PersonalInfo