import React, { useState } from 'react';
import downIcon from '../assets/down.svg';
import upIcon from '../assets/up.svg'; 


function ExperienceForm({
    handleSubmit,
    cancelAddition,
    isExpanded,
    handleDeleteEntry,
    handleFormUpdate, 
}) {
    return (
        <form className={isExpanded ? 'form' : 'collapsed form'} onSubmit={handleSubmit}>
            <div className='input-container'>
                <label htmlFor='companyName'>Company Name</label>
                <input type='text' id='companyName' name='companyName' onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='position'>Position</label>
                <input type='text' id='position' name='position' onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='startDate'>Start Date</label>
                <input type='text' id='startDate' name='startDate' onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='endDate'>End Date</label>
                <input type='text' id='endDate' name='endDate' onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='location'>Location</label>
                <input type='text' id='location' name='location' onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='description'>Description</label>
                <input type='text' id='description' name='description' onChange={handleFormUpdate} />
            </div>

            <div className='button-container'>
                <div>
                    <button type='button' onClick ={cancelAddition}>Cancel</button>
                    <button type='button' onClick={handleDeleteEntry}>Delete</button>
                </div>
                <button type='submit'>Save</button>
            </div>
        </form>
    );
}

function ExperienceList({ formData, handleEditingEntry, isExpanded, addEntry }) {
    return (
        <div className={isExpanded ? 'entries-container' : 'collapsed entries-container'}>
            <ul>
                {formData.map((entry, index) => (
                    <li key={index}>
                        <button onClick={()=>handleEditingEntry(index)}>{entry.position}</button>
                    </li>
                ))}
            </ul>
            
            <button onClick={addEntry}>Add</button>
        </div>
    );
}

function Experience( { handleFormUpdate, addEntry, formData, displayForm, onSubmit }) {
    // const [displayForm, setDisplayForm] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }



    return (
        <div className='form-container' id='experience'>
            <div className='form-header'>
                <h2 className='form-title'>Experience</h2>
                <img className='expand-toggle' onClick={toggleExpand} src={isExpanded ? downIcon : upIcon} alt='Expand Toggle'/>
            </div>

        {displayForm ? (
                <ExperienceForm
                    handleSubmit={onSubmit}
                    isExpanded={isExpanded}
                    handleFormUpdate={handleFormUpdate}
                />
            ) : (
                <ExperienceList 
                    formData={formData} 
                    isExpanded={isExpanded}
                    addEntry={addEntry}
                />
            )}

        </div>
    );
    
}

export default Experience