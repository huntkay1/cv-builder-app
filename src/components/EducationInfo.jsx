import React, { useState } from 'react';
import downIcon from '../assets/down.svg';
import upIcon from '../assets/up.svg';


// EducationForm component for rendering the form
function EducationForm({
    handleSubmit,
    isExpanded,
    handleFormUpdate, 
    formData, 
    currentEntry, 
    handleCancel,
    handleDelete
}) {
    return (
        <form className={isExpanded ? 'form' : 'collapsed form'} onSubmit={(e)=>handleSubmit(e, 'education')} >
            <div className='input-container'>
                <label htmlFor='school'>School</label>
                <input type='text' id='school' name='school' value={formData[currentEntry].school} onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='degree'>Degree</label>
                <input type='text' id='degree' name='degree' value={formData[currentEntry].degree} onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='startDate'>Start Date</label>
                <input type='text' id='startDate' name='startDate' value={formData[currentEntry].startDate} onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='endDate'>End Date</label>
                <input type='text' id='endDate' name='endDate' value={formData[currentEntry].endDate} onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='location'>Location</label>
                <input type='text' id='location' name='location' value={formData[currentEntry].location} onChange={handleFormUpdate} />
            </div>

            <div className='button-container'>
                <div>
                    <button type='button' onClick ={()=>handleCancel('education')}>Cancel</button>
                    <button type='button' onClick={()=>handleDelete('education')}>Delete</button>
                </div>
                <button type='submit'>Save</button>
            </div>
        </form>
    );
}

// EducationList component for rendering the list of education entries
function EducationList({ formData, addEntry, handleEditingEntry, isExpanded }) {
    return (
        <div className={isExpanded ? 'entries-container' : 'collapsed entries-container'}>
            <ul>
                {formData.map((entry, index) => (
                    <li key={index}>
                        <button onClick={()=>handleEditingEntry(index, 'education')}>{entry.school}</button>
                    </li>
                ))}
            </ul>
            <button onClick={(e)=>addEntry(e, 'education')}>Add</button>
        </div>
    );
}


// Main Education component
function Education({     
    handleFormUpdate, 
    addEntry, 
    formData, 
    displayForm, 
    onSubmit, 
    handleEditingEntry, 
    currentEntry, 
    handleCancel, 
    handleDelete  }) {

    const [isExpanded, setIsExpanded] = useState(false);

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className='form-container' id='education'>
            <div className='form-header'>
                <h2 className='form-title'>Education</h2>
                <img className='expand-toggle' onClick={toggleExpand} src={isExpanded ? downIcon : upIcon} alt='Expand Toggle'/>
            </div>

            {displayForm ? (
                <EducationForm
                handleSubmit={onSubmit}
                isExpanded={isExpanded}
                handleFormUpdate={handleFormUpdate}
                formData={formData}
                currentEntry={currentEntry}
                handleCancel={handleCancel}
                handleDelete={handleDelete}
                />
            ) : (
                <EducationList 
                formData={formData} 
                isExpanded={isExpanded}
                addEntry={addEntry}
                handleEditingEntry={handleEditingEntry}
                />
            )}

        </div>
    );
}

export default Education;
