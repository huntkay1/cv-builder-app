import React, { useState } from 'react';
import downIcon from '../assets/down.svg';
import upIcon from '../assets/up.svg';


// EducationForm component for rendering the form
function EducationForm({
    handleSubmit,
    cancelAddition,
    isExpanded,
    handleDeleteEntry,
    handleFormUpdate
}) {
    return (
        <form className={isExpanded ? 'form' : 'collapsed form'} onSubmit={handleSubmit} >
            <div className='input-container'>
                <label htmlFor='school'>School</label>
                <input type='text' id='school' name='school' onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='degree'>Degree</label>
                <input type='text' id='degree' name='degree' onChange={handleFormUpdate} />
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

// EducationList component for rendering the list of education entries
function EducationList({ formData, handleAddingEntry, handleEditingEntry, isExpanded }) {
    return (
        <div className={isExpanded ? 'entries-container' : 'collapsed entries-container'}>
            <ul>
                {formData.map((entry, index) => (
                    <li key={index}>
                        <button onClick={()=>handleEditingEntry(index)}>{entry.school}</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddingEntry}>Add</button>
        </div>
    );
}


// Main Education component
function Education({ formData, setFormData, handleFormUpdate }) {
    const [school, setSchool] = useState('');
    const [degree, setDegree] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [location, setLocation] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [editingIndex, setEditingIndex] = useState(-1); //-1 means not in editing mode
    const [displayForm, setDisplayForm] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        const newEntry = {
            id: editingIndex === -1 ? crypto.randomUUID() : formData[editingIndex],
            school,
            degree,
            startDate,
            endDate,
            location
        };

        //if not in editing mode, just add the new entry. If in editing mode, update entry
        if (editingIndex === -1) {
            updateFormData(newEntry)
        } else {
            updateEntry(newEntry)
        }

        clearForm();
        setEditingIndex(-1);
        setDisplayForm(false)
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

    //after an entry is added, show entry list 
    function handleAddingEntry() {
        setDisplayForm(false);
    }

    function handleEditingEntry(index) {
        setEditingIndex(index);
        const editableEntry = formData[index];
        //populate the form fields and show form
        setSchool(editableEntry.school);
        setDegree(editableEntry.degree);
        setStartDate(editableEntry.startDate);
        setEndDate(editableEntry.endDate);
        setLocation(editableEntry.location);
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
        <div className='form-container' id='education'>
            <div className='form-header'>
                <h2 className='form-title'>Education</h2>
                <img className='expand-toggle' onClick={toggleExpand} src={isExpanded ? downIcon : upIcon} alt='Expand Toggle'/>
            </div>

            {displayForm || editingIndex !== -1 ? (
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
                    cancelAddition={cancelAddition}
                    isExpanded={isExpanded}
                    handleDeleteEntry={handleDeleteEntry}
                    handleFormUpdate={handleFormUpdate}
                />
            ) : (
                <EducationList 
                    formData={formData} 
                    handleAddingEntry={handleAddingEntry} 
                    handleEditingEntry={handleEditingEntry}
                    isExpanded={isExpanded}
                />
            )}

        </div>
    );
}

export default Education;
