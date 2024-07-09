import React, { useState } from 'react';
import downIcon from '../assets/down.svg';
import upIcon from '../assets/up.svg'; 

function ExperienceForm({
    companyName,
    setCompanyName,
    position,
    setPosition,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    location,
    setLocation,
    description,
    setDescription,
    handleSubmit,
    cancelAddition,
    isExpanded,
    handleDeleteEntry
}) {
    return (
        <form className={isExpanded ? 'form' : 'collapsed form'} onSubmit={handleSubmit} >
            <div className='input-container'>
                <label htmlFor='companyName'>Company Name</label>
                <input type='text' id='companyName' name='companyName' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
            </div>
            <div className='input-container'>
                <label htmlFor='position'>Position</label>
                <input type='text' id='position' name='position' value={position} onChange={(e) => setPosition(e.target.value)} />
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
            <div className='input-container'>
                <label htmlFor='description'>Description</label>
                <input type='text' id='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
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

function ExperienceList({ formData, handleAddingEntry, handleEditingEntry, isExpanded }) {
    return (
        <div className={isExpanded ? 'entries-container' : 'collapsed entries-container'}>
            <ul>
                {formData.map((entry, index) => (
                    <li key={index}>
                        <button onClick={()=>handleEditingEntry(index)}>{entry.position}</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddingEntry}>Add</button>
        </div>
    );
}

function Experience( {formData, setFormData }) {

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
        e.preventDefault();
        const newEntry = {
            id: editingIndex === -1 ? crypto.randomUUID() : formData[editingIndex],
            companyName,
            position,
            startDate,
            endDate,
            location,
            description
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
        setCompanyName('');
        setPosition('');
        setStartDate('');
        setEndDate('');
        setLocation('');
        setDescription('');
    }

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
        <div className='form-container' id='education-details'>
            <div className='form-header'>
                <h2 className='form-title'>Experience</h2>
                <img className='expand-toggle' onClick={toggleExpand} src={isExpanded ? downIcon : upIcon} alt='Expand Toggle'/>
            </div>

            {displayForm || editingIndex !== -1 ? (
                <ExperienceForm
                    companyName={companyName}
                    setCompanyName={setCompanyName}
                    position={position}
                    setPosition={setPosition}
                    startDate={startDate}
                    setStartDate={setStartDate}
                    endDate={endDate}
                    setEndDate={setEndDate}
                    location={location}
                    setLocation={setLocation}
                    description={description}
                    setDescription={setDescription}
                    handleSubmit={handleSubmit}
                    cancelAddition={cancelAddition}
                    isExpanded={isExpanded}
                    handleDeleteEntry={handleDeleteEntry}
                />
            ) : (
                <ExperienceList 
                    formData={formData} 
                    handleAddingEntry={handleAddingEntry} 
                    handleEditingEntry={handleEditingEntry}
                    isExpanded={isExpanded}
                />
            )}

        </div>
    );
    
}

export default Experience