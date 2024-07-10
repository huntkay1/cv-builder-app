import PersonalInfo from './components/PersonalInfo.jsx';
import Education from './components/EducationInfo.jsx';
import Experience from './components/ExperienceInfo.jsx';
import Resume from './components/Resume.jsx'
import { useState } from 'react';

function App() {

  const [educationFormData, setEducationFormData] = useState([]);
  const [experienceFormData, setExperienceFormData] = useState([]);

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
        }
      ],
      experience: [
        {
          companyName: '',
          position: '',
          startDate: '',
          endDate: '',
          location: '',
          description: ''
        }
      ]
    }  


  })

  function handlePersonalInfoChange(e) {
    const inputKeyName = e.target.name;
    setFormData({...formData.personalInfo, [inputKeyName]: e.target.value})
  }

  function handleSectionsUpdate(e) {
    const inputKeyName = e.target.name;
    const formName = e.target.closest('.form-container').id;
    const dataToUpdate = formData.sections[formName]

    setFormData({...formData, [formName]: dataToUpdate.map((dataset) => {
      dataset[inputKeyName] = e.target.value;
    })})
    
    console.log(formData)
  }




  return(
    <div id='main-container'>
      <div id='forms'>
        <PersonalInfo 
        handleFormDataUpdate={handlePersonalInfoChange}
        />
        <Education 
        formData={educationFormData}
        setFormData={setEducationFormData}
        handleFormUpdate={handleSectionsUpdate}
        />
        <Experience 
        formData={experienceFormData}
        setFormData={setExperienceFormData}
        handleFormUpdate={handleSectionsUpdate}
        />
      </div>

      <div className='resume-container'>
        <Resume 
        educationData={educationFormData}
        experienceData={experienceFormData}
        />
      </div>
    </div>
  )
  
  
}
export default App
