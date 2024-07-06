import React, { useState } from 'react';
import downIcon from '../assets/down.svg';
import upIcon from '../assets/up.svg';

// EducationForm component for rendering the form
function EducationForm({
    school,
    setSchool,
    degree,
    setDegree,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    location,
    setLocation,
    handleSubmit,
    editData
}) {
    return (
        <form className='form' onSubmit={handleSubmit}>
            <div className='input-container'>
                <label htmlFor='school'>School</label>
                <input type='text' id='school' name='school' value={school} onChange={(e) => setSchool(e.target.value)} />
            </div>
            <div className='input-container'>
                <label htmlFor='degree'>Degree</label>
                <input type='text' id='degree' name='degree' value={degree} onChange={(e) => setDegree(e.target.value)} />
            </div>
            <div className='input-container'>
                <label htmlFor='start_date'>Start Date</label>
                <input type='text' id='start_date' name='start_date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            </div>
            <div className='input-container'>
                <label htmlFor='end_date'>End Date</label>
                <input type='text' id='end_date' name='end_date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            </div>
            <div className='input-container'>
                <label htmlFor='location'>Location</label>
                <input type='text' id='location' name='location' value={location} onChange={(e) => setLocation(e.target.value)} />
            </div>

            <div className='button-container'>
                <div>
                    <button type='button'>Cancel</button>
                    <button type='button'>Delete</button>
                </div>
                <button type='submit'>Save</button>
            </div>
        </form>
    );
}

// EducationList component for rendering the list of education entries
function EducationList({ formData, onAddEntryClick, handleEditingEntry }) {
    return (
        <div className='entries-container'>
            <ul>
                {formData.map((entry, index) => (
                    <li key={index}>
                        <button onClick={()=>handleEditingEntry(index)}>{entry.school}</button>
                    </li>
                ))}
            </ul>
            <button onClick={onAddEntryClick}>Add</button>
        </div>
    );
}


// Main Education component
function Education() {
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [formData, setFormData] = useState([]);
    const [isAddingEntry, setIsAddingEntry] = useState(false);
    const [isEditingEntry, setIsEditingEntry] = useState(false);


    function handleSubmit(e) {
        e.preventDefault();
        const newEntry = {
            id: crypto.randomUUID(),
            school: school,
            degree: degree,
            startDate: startDate,
            endDate: endDate,
            location: location
        };
        handleAddingEntry();
        saveFormData(newEntry);
        clearForm();
    }

    // Function to save form data to formData array
    function saveFormData(newEntry) {
        setFormData([...formData, newEntry]);
    }

    function clearForm() {
        setSchool('');
        setDegree('');
        setStartDate('');
        setEndDate('');
        setLocation('');
    }

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    //toggles adding entry state. Shows the form when on. 
    function handleAddingEntry() {
        setIsAddingEntry(!isAddingEntry);
    }

    function handleEditingEntry(index) {
        setIsEditingEntry(!isEditingEntry);
        console.log(formData[index])
    }


    return (
        <div className='form-container' id='education-details'>
            <div className='form-header'>
                <h2 className='form-title'>Education</h2>
                <img className='expand-toggle' onClick={toggleExpand} src={isExpanded ? downIcon : upIcon} alt='Expand Toggle'/>
            </div>

            {isAddingEntry ? (
                <EducationForm
                    school={school}
                    setSchool={setSchool}
                    degree={degree}
                    setDegree={setDegree}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    location={location}
                    setLocation={setLocation}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <EducationList formData={formData} onAddEntryClick={handleAddingEntry} handleEditingEntry={handleEditingEntry}/>
            )}
        </div>
    );
}

export default Education;
