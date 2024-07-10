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

function Experience( { handleFormUpdate, addEntry, formData }) {

    const [companyName, setCompanyName] = useState('');
    const [position, setPosition] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation]= useState('');
    const [description, setDescription] = useState('');
    const [displayForm, setDisplayForm] = useState(true);
    const [isExpanded, setIsExpanded] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1); //-1 means not in editing mode

    function handleSubmit(e) {
        // const newEntry = {
        //     id: editingIndex === -1 ? crypto.randomUUID() : formData[editingIndex],
        //     companyName,
        //     position,
        //     startDate,
        //     endDate,
        //     location,
        //     description
        // };

        // //if not in editing mode, just add the new entry. If in editing mode, update entry
        // if (editingIndex === -1) {
        //     updateFormData(newEntry)
        // } else {
        //     updateEntry(newEntry)
        // }

        // clearForm();
        // setEditingIndex(-1);
        setDisplayForm(false)
    }

    // function clearForm() {
    //     setCompanyName('');
    //     setPosition('');
    //     setStartDate('');
    //     setEndDate('');
    //     setLocation('');
    //     setDescription('');
    // }

    function toggleExpand() {
        setIsExpanded(!isExpanded);
    }

    //after an entry is added, show entry list 
    function handleAddingEntry() {
        setDisplayForm(true);
    }

    function handleEditingEntry(index) {
        setEditingIndex(index);
        const editableEntry = formData[index];
        //populate the form fields and show form
        setCompanyName(editableEntry.school);
        setPosition(editableEntry.degree);
        setStartDate(editableEntry.startDate);
        setEndDate(editableEntry.endDate);
        setLocation(editableEntry.location);
        setDescription(editableEntry.description);
        setDisplayForm(true)
    }

    //cancel adding a new entry, going back to list display
    function cancelAddition() {
        setEditingIndex(-1);
        setDisplayForm(false);
    }

    function handleDeleteEntry() {
        deleteEntry(editingIndex);
        setEditingIndex(-1);
        clearForm();
        setDisplayForm(false);
    }

    function deleteEntry(index) {
        const selectedEntry = formData[index];
        setFormData(formData.filter(entry => 
            entry.id !== selectedEntry.id
        ));
    }

    //Function to update entry's data
    function updateEntry(newEntry) {
        const updatedFormData = [...formData];
        updatedFormData[editingIndex] = newEntry;
        setFormData(updatedFormData);
    }

    // Function to save form data to formData array
    function updateFormData(newEntry) {
        setFormData([...formData, newEntry]);
    }


    return (
        <div className='form-container' id='experience'>
            <div className='form-header'>
                <h2 className='form-title'>Experience</h2>
                <img className='expand-toggle' onClick={toggleExpand} src={isExpanded ? downIcon : upIcon} alt='Expand Toggle'/>
            </div>

            {displayForm || editingIndex !== -1 ? (
                <ExperienceForm
                    handleSubmit={handleSubmit}
                    cancelAddition={cancelAddition}
                    isExpanded={isExpanded}
                    handleDeleteEntry={handleDeleteEntry}
                    handleFormUpdate={handleFormUpdate}
                />
            ) : (
                <ExperienceList 
                    formData={formData} 
                    handleAddingEntry={handleAddingEntry} 
                    handleEditingEntry={handleEditingEntry}
                    isExpanded={isExpanded}
                    addEntry={addEntry}
                />
            )}

        </div>
    );
    
}

export default Experience