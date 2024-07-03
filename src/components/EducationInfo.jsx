import { useState } from 'react'
import downIcon from '../assets/down.svg'
import upIcon from '../assets/up.svg'

function Education() {
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    };

    return(
        <div className='form-container' id='personal-details'>
            <div className='form-header'>
                <h2 className='form-title'>Education</h2>
                <img className='expand-toggle' onClick={toggleExpand} src={isExpanded ? downIcon : upIcon}/>
            </div>
            <form className={isExpanded ? 'expanded' : 'collapsed'}>
                <div className='input-container'>
                    <label htmlFor='school'>School</label>
                    <input type='text' name='school'></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='degree'>Degree</label>
                    <input type='text' name='degree'></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='start date'>Start Date</label>
                    <input type='text' name='start date'></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='end date'>End Date</label>
                    <input type='text' name='end date'></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' name='location'></input>
                </div>
            </form>

            <div className='button-container'>
                <div>
                    <button>Cancel</button>
                    <button>Delete</button>
                </div>
                <button>Save</button>
            </div>
        </div>
    )
}

export default Education