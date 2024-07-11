import PersonalInfo from './components/PersonalInfo.jsx';
import Education from './components/EducationInfo.jsx';
import Experience from './components/ExperienceInfo.jsx';
import Resume from './components/Resume.jsx'
import { useState } from 'react';

function App() {

  const [displayForm, setDisplayForm] = useState(true); //if false, displays list of entries
  const [currentEntryIndex, setCurrentEntryIndex] = useState(0); //keeps track of the current entry being edited

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
    const sectionArrayToUpdate = formData.sections[formName];

    //only update the value of the current entry
    setFormData({...formData, [formName]: sectionArrayToUpdate.map((dataEntry, index) => {
      if(index === currentEntryIndex) {
        dataEntry[inputName] = e.target.value;
      }
    })})
  }

  //Adds an empty entry to the formData
  function addEntry(e) {
    const formName = e.target.closest('.form-container').id;
    const newEntry = newEmptyExperienceEntry();

    //create copy of the data's current state, push entry to that state, set the state
    const prevState = {...formData};
    prevState.sections[formName].push(newEntry);
    setFormData(prevState);

    setCurrentEntryIndex(formData.sections[formName].length-1);
    setDisplayForm(true);

  }

  function newEmptyExperienceEntry() {
    const newEntry = {
      id: crypto.randomUUID(),
      companyName: '',
      postion: '',
      startData: '',
      endDate: '',
      location: ''
    }

    return newEntry
  }

  function onFormSubmit(e) {
    e.preventDefault();
    setDisplayForm(false)
  }

  function handleEditingEntry(e, index) {
    setCurrentEntryIndex(index);
    setDisplayForm(true);
  }

  function handleCancel() {
    setDisplayForm(false);
  }



  return(
    <div id='main-container'>
      <div id='forms'>
        <PersonalInfo 
        handleFormDataUpdate={handlePersonalInfoChange}
        />
        <Education 
        handleFormUpdate={handleSectionsUpdate}
        />
        <Experience 
        handleFormUpdate={handleSectionsUpdate}
        addEntry={addEntry}
        formData={formData.sections.experience}
        displayForm={displayForm}
        onSubmit={onFormSubmit}
        handleEditingEntry={handleEditingEntry}
        currentEntry={currentEntryIndex}
        handleCancel={handleCancel}
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
