import PersonalInfo from './components/PersonalInfo.jsx';
import Education from './components/EducationInfo.jsx';
import Experience from './components/ExperienceInfo.jsx';
import Resume from './components/Resume.jsx'
import { useState } from 'react';

function App() {
  const [currentEducationIndex, setCurrentEducationIndex] = useState(0);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [displayEducationForm, setDisplayEducationForm] = useState(true);
  const [displayExperienceForm, setDisplayExperienceForm] = useState(true);
  const [editingMode, setEditingMode] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: ''
    },
    sections: {
      education: [
        {
          id: crypto.randomUUID(),
          school: '',
          degree: '',
          startDate: '',
          endDate: '',
          location: ''
        },
      ],
      experience: [
        {
          id: crypto.randomUUID(),
          companyName: '',
          position: '',
          startDate: '',
          endDate: '',
          location: '',
          description: ''
        },
      ]
    }  
  })

  function handlePersonalInfoChange(e) {
    const inputName = e.target.name;
    setFormData(prevData => ({
      ...prevData,
      personalInfo: {
        ...prevData.personalInfo,
        [inputName]: e.target.value
      }
    }));
  }

  //updates data for education and experience
  function handleSectionsUpdate(e) {
    const inputName = e.target.name;
    const formName = e.target.closest('.form-container').id;
    const entryIndex = formName === 'education' ? currentEducationIndex : currentExperienceIndex;
    const sectionArrayToUpdate = formData.sections[formName];

    //only update the value of the current entry (entryIndex)
    setFormData({...formData, [formName]: sectionArrayToUpdate.map((dataEntry, index) => {
      if(index === entryIndex) {
        dataEntry[inputName] = e.target.value;
      }
    })})
  }

  //Adds an empty entry to the formData
  function addEntry(e, formName) {
    const newEntry = newEmptyEntry(formName);

    //create copy of the data's current state, push entry to that state, set the state
    const prevState = {...formData};
    prevState.sections[formName].push(newEntry);
    setFormData(prevState);

    if (formName === 'education') {
      setCurrentEducationIndex(formData.sections[formName].length-1); //the index of the most recent entry
      setDisplayEducationForm(true);
    } else if (formName === 'experience') {
      setCurrentExperienceIndex(formData.sections[formName].length-1);
      setDisplayExperienceForm(true);
    }

  }

  function newEmptyEntry(formName) {

    if (formName === 'experience') {
      return {
        id: crypto.randomUUID(),
        companyName: '',
        postion: '',
        startData: '',
        endDate: '',
        location: '',
        descripton: ''
      }
    } else if (formName === 'education') {
      return {
        id: crypto.randomUUID(),
        school: '',
        degree: '',
        startDate: '',
        endDate: '',
        location: ''
      }
    }
  }

  function onFormSubmit(e, formName) {
    e.preventDefault();
    editingMode ? setEditingMode(false) : null;

    if(formName === 'education') {
      setDisplayEducationForm(false)
    } else if(formName === 'experience') {
      setDisplayExperienceForm(false);
    }
   
  }

  //displays the form with the data from the entry at this index 
  function handleEditingEntry(index, formName) {
    setEditingMode(true)
    
    if (formName === 'education') {
      setCurrentEducationIndex(index);
      setDisplayEducationForm(true);
    } else if (formName === 'experience') {
      setCurrentExperienceIndex(index);
      setDisplayExperienceForm(true);
    }

  }

  function handleCancel(formName) {
    if(formName === 'education') {
      setDisplayEducationForm(false);
      //if cancelling while not in editing mode, then delete the blank entry that was added. If you are in editing mode, don't delete the entry
      !editingMode ? handleDelete(formName, formData.sections[formName].length-1) : setEditingMode(false); 
    } else if(formName === 'experience') {
      setDisplayExperienceForm(false);
      !editingMode ? handleDelete(formName, formData.sections[formName].length-1) : setEditingMode(false)
    }
  }

  function handleDelete(formName, entryIndex = formName === 'education' ? currentEducationIndex : currentExperienceIndex) {
   console.log(entryIndex);
    
    //create copy of formData, remove entry selected, set state
    const prevState = {...formData};
    prevState.sections[formName].splice(entryIndex, 1);
    setFormData(prevState);

    if(formName === 'education') {
      setDisplayEducationForm(false);
    } else if(formName === 'experience') {
      setDisplayExperienceForm(false);
    }
    
  }

  return(
    <div id='main-container'>
      <div id='forms'>
        <PersonalInfo 
        handleFormDataUpdate={handlePersonalInfoChange}
        />
        <Education 
        handleFormUpdate={handleSectionsUpdate}
        addEntry={addEntry}
        formData={formData.sections.education}
        displayForm={displayEducationForm}
        onSubmit={onFormSubmit}
        handleEditingEntry={handleEditingEntry}
        currentEntry={currentEducationIndex}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        />
        <Experience 
        handleFormUpdate={handleSectionsUpdate}
        addEntry={addEntry}
        formData={formData.sections.experience}
        displayForm={displayExperienceForm}
        onSubmit={onFormSubmit}
        handleEditingEntry={handleEditingEntry}
        currentEntry={currentExperienceIndex}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        />
      </div>

      <div className='resume-container'>
        <Resume 
          formData={formData}
        />
      </div>
    </div>
  )
  
  
}
export default App
