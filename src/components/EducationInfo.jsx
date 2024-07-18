import downIcon from '../assets/down.svg';
import upIcon from '../assets/up.svg';
import rightIcon from '../assets/right.svg';
import addIcon from '../assets/add.svg';
import educationIcon from '../assets/education.svg'


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
                <label htmlFor='degree'>Degree</label>
                <input type='text' id='degree' name='degree' value={formData[currentEntry].degree} onChange={handleFormUpdate} />
            </div>
            <div className='input-container'>
                <label htmlFor='school'>School</label>
                <input type='text' id='school' name='school' value={formData[currentEntry].school} onChange={handleFormUpdate} />
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
                <button type='button' className='delete-button' onClick={()=>handleDelete('education')}>Delete</button>
                <div className='right-buttons'>
                    <button type='button' onClick ={()=>handleCancel('education')}>Cancel</button>
                    <button type='submit'>Save</button>
                </div>
            </div>
        </form>
    );
}

// EducationList component for rendering the list of education entries
function EducationList({ formData, addEntry, handleEditingEntry, isExpanded }) {
    return (
        <div className={isExpanded ? 'entries-container' : 'collapsed entries-container'}>
            <div className='entry-list'>
                {formData.map((entry, index) => (
                        <button onClick={()=>handleEditingEntry(index, 'education')}>{entry.school} <img src={rightIcon}></img></button>
                ))}
            </div>
            <button className='add-button' onClick={(e)=>addEntry(e, 'education')}><img src={addIcon}></img> Education</button>
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
    handleDelete, 
    isExpanded,
    toggleExpand  }) {


    return (
        <div className='form-container' id='education'>
            <div className='form-header'>
                <div className='form-header-title'>
                    <img src={educationIcon}></img>
                    <h2 className='form-title'>Education</h2>
                </div>
                <img className='expand-toggle' onClick={()=>toggleExpand('education')} src={isExpanded ? downIcon : upIcon} alt='Expand Toggle'/>
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
