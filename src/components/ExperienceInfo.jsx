import React, { useState } from 'react';
import downIcon from '../assets/down.svg';
import upIcon from '../assets/up.svg'; 
import rightIcon from '../assets/right.svg';
import addIcon from '../assets/add.svg';
import experienceIcon from '../assets/work.svg';


function ExperienceForm({
    handleSubmit,
    isExpanded,
    handleFormUpdate, 
    formData, 
    currentEntry, 
    handleCancel,
    handleDelete
}) {
    return (
        <form className={isExpanded ? 'form' : 'collapsed form'} onSubmit={(e)=>handleSubmit(e, 'experience')}>
            <div className='input-container'>
                <label htmlFor='companyName'>Company Name</label>
                <input type='text' id='companyName' name='companyName'  value={formData[currentEntry].companyName} onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='position'>Position</label>
                <input type='text' id='position' name='position' value={formData[currentEntry].position} onChange={handleFormUpdate} />
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
            <div className='input-container'>
                <label htmlFor='description'>Description</label>
                <textarea id='description' name='description' value={formData[currentEntry].description} onChange={handleFormUpdate}></textarea>
            </div>

            <div className='button-container'>
                <div>
                    <button type='button' onClick={()=>handleDelete('experience')}>Delete</button>
                    <button type='button' onClick={()=>handleCancel('experience')}>Cancel</button>
                </div>
                <button type='submit'>Save</button>
            </div>
        </form>
    );
}

function ExperienceList({ formData, handleEditingEntry, isExpanded, addEntry }) {
    return (
        <div className={isExpanded ? 'entries-container' : 'collapsed entries-container'}>
            <div className='entry-list'>
                {formData.map((entry, index) => (
                    <button onClick={()=>handleEditingEntry(index, 'experience')}>{entry.companyName}<img src={rightIcon}></img></button> 
                ))}
            </div>
            
            
            <button className='add-button' onClick={(e)=>addEntry(e, 'experience')}><img src={addIcon}></img> Experience</button>
         
        </div>
    );
}

//this is the form container. It controls if the form or the entry list should be visible
function Experience ({ 
    handleFormUpdate, 
    addEntry, 
    formData, 
    displayForm, 
    onSubmit, 
    handleEditingEntry, 
    currentEntry, 
    handleCancel, 
    handleDelete,
    isExpanded, 
    toggleExpand }) {

    // const [isExpanded, setIsExpanded] = useState(false);

    // function toggleExpand() {
    //     setIsExpanded(!isExpanded);
    // }

    return (
        <div className='form-container' id='experience'>
            <div className='form-header'>
                <div className='form-header-title'>
                    <img src={experienceIcon}></img>
                    <h2 className='form-title'>Experience</h2>
                </div>
                <img className='expand-toggle' onClick={()=>toggleExpand('experience')} src={isExpanded ? downIcon : upIcon} alt='Expand Toggle'/>
            </div>

        {displayForm ? (
                <ExperienceForm
                    handleSubmit={onSubmit}
                    isExpanded={isExpanded}
                    handleFormUpdate={handleFormUpdate}
                    formData={formData}
                    currentEntry={currentEntry}
                    handleCancel={handleCancel}
                    handleDelete={handleDelete}
                />
            ) : (
                <ExperienceList 
                    formData={formData} 
                    isExpanded={isExpanded}
                    addEntry={addEntry}
                    handleEditingEntry={handleEditingEntry}
                />
            )}

        </div>
    );
    
}

export default Experience