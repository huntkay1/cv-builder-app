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
          school: '',
          degree: '',
          startDate: '',
          endDate: '',
          location: ''
        },
      ],
      experience: [
        {
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

  function handlePersonalInfoChange(e) {
    const inputName = e.target.name;
    setFormData({...formData.personalInfo, [inputName]: e.target.value})
  }

  function handleSectionsUpdate(e) {
    const inputName = e.target.name;
    const formName = e.target.closest('.form-container').id;
    const dataToUpdate = formData.sections[formName]

    setFormData({...formData, [formName]: dataToUpdate.map((dataset) => {
      dataset[inputName] = e.target.value;
    })})
 
  }

  //Adds a blanket entry to the formData
  function addEntry(e) {
    e.preventDefault();

    const formName = e.target.closest('.form-container').id;
    const newEntry = newEmptyExperienceEntry();
    
    const prevState = {...sectionData};
    sectionData[formName].push(newEntry);
    setSectionData(prevState)
  }

  function newEmptyExperienceEntry() {
    const newEntry = {
      companyName: '',
      postion: '',
      startData: '',
      endDate: '',
      location: ''
    }

    return newEntry
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
