import PersonalInfo from './components/PersonalInfo.jsx';
import Education from './components/EducationInfo.jsx';
import Experience from './components/ExperienceInfo.jsx';
import { useState } from 'react';

function App() {

  const [educationFormData, setEducationFormData] = useState([]);
  const [experienceFormData, setExperienceFormData] = useState([]);

  return(
    <div>
      <PersonalInfo />
      <Education 
      formData={educationFormData}
      setFormData={setEducationFormData}
      />
      <Experience 
      formData={experienceFormData}
      setFormData={setExperienceFormData}
      />
    </div>
  )
  
  
}
export default App
