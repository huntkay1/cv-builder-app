import PersonalInfo from './components/PersonalInfo.jsx';
import Education from './components/EducationInfo.jsx';
import Experience from './components/ExperienceInfo.jsx';
import Resume from './components/Resume.jsx'
import { useState } from 'react';

function App() {

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
  const [sectionData, setSectionData] = useState(formData.sections)
  const [displayForm, setDisplayForm] = useState(true);

  function handlePersonalInfoChange(e) {
    const inputName = e.target.name;
    setFormData({...formData.personalInfo, [inputName]: e.target.value})
  }

  function handleSectionsUpdate(e) {
    const inputName = e.target.name;
    const formName = e.target.closest('.form-container').id;
    const sectionArrayToUpdate = formData.sections[formName]

    //Update data for new entries
    setFormData({...formData, [formName]: sectionArrayToUpdate.map((dataset, index) => {
      if(index === sectionArrayToUpdate.length-1)
        dataset[inputName] = e.target.value;
    })})
  }

  //Adds a blanket entry to the formData
  function addEntry(e) {

    const formName = e.target.closest('.form-container').id;
    const newEntry = newEmptyExperienceEntry();
    
    const prevState = {...formData};
    prevState.sections[formName].push(newEntry);
    setFormData(prevState);
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
        formData={sectionData.experience}
        displayForm={displayForm}
        onSubmit={onFormSubmit}
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
