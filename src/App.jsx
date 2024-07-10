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

  function handleFormDataUpdate(e) {
    const inputKeyName = e.target.name;
    const formName = e.target.closest('.form-container').id;

    if(formName === 'personalInfo') {
      setFormData({...formData.personalInfo, [inputKeyName]: e.target.value}) 
    } 
    
  }




  return(
    <div id='main-container'>
      <div id='forms'>
        <PersonalInfo 
        handleFormDataUpdate={handleFormDataUpdate}
        />
        <Education 
        formData={educationFormData}
        setFormData={setEducationFormData}
        />
        <Experience 
        formData={experienceFormData}
        setFormData={setExperienceFormData}
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
