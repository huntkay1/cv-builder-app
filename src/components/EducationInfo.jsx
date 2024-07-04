import { useState } from 'react'
import downIcon from '../assets/down.svg'
import upIcon from '../assets/up.svg'

function Education() {
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState([]);


    function toggleExpand() {
        setIsExpanded(!isExpanded);
    };


    function handleSubmit(e) {
        e.preventDefault();
        const newEntry = {
            school: school,
            degree: degree,
            startDate: startDate,
            endDate: endDate,
            location: location
        };
        saveFormData(newEntry)

        setDegree('');
        setSchool('');
        setEndDate('');
        setStartDate('');
        setLocation('');
    }

    function saveFormData(newEntry) {
        const originalFormData = [...formData]; //copy array 
        originalFormData.push(newEntry); //add new entry
        setFormData(originalFormData); //set new array as form data 
    }


    return(
        <div className='form-container' id='personal-details'>
            <div className='form-header'>
                <h2 className='form-title'>Education</h2>
                <img className='expand-toggle' onClick={toggleExpand} src={isExpanded ? downIcon : upIcon} alt='Expand Toggle'/>
            </div>
            <form className={isExpanded ? 'expanded' : 'collapsed'} onSubmit={handleSubmit}>
                <div className='input-container'>
                    <label htmlFor='school'>School</label>
                    <input type='text' id='school' name='school' value={school} onChange={(e)=>setSchool(e.target.value)}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='degree'>Degree</label>
                    <input type='text' id='degree' name='degree' value={degree} onChange={(e)=>setDegree(e.target.value)}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='start_date'>Start Date</label>
                    <input type='text' id='start_date' name='start_date' value={startDate} onChange={(e)=>setStartDate(e.target.value)}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='end_date'>End Date</label>
                    <input type='text' id='end_date' name='end_date' value={endDate} onChange={(e)=>setEndDate(e.target.value)}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' id='location' name='location' value={location} onChange={(e)=>setLocation(e.target.value)}></input>
                </div>


                <div className='button-container'>
                    <div>
                        <button>Cancel</button>
                        <button>Delete</button>
                    </div>
                    <button type='submit'>Save</button>
                </div>
            </form>
        </div>
    )
}

export default Education