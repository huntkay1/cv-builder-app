import PersonalInfo from './components/PersonalInfo.jsx';
import Education from './components/EducationInfo.jsx';
import { useState } from 'react';
import Experience from './components/ExperienceInfo.jsx'

function App() {

  // const [formData, setFormData] = useState([]);
  // const [displayForm, setDisplayForm] = useState(true);
  

  // // Function to save form data to formData array
  // function updateFormData(newEntry) {
  //     setFormData([...formData, newEntry]);
  // }

  // //Function to update entry's data
  // function updateEntry(newEntry) {
  //     const updatedFormData = [...formData];
  //     updatedFormData[editingIndex] = newEntry;
  //     setFormData(updatedFormData);
  // }

  // function deleteEntry(index) {
  //   const selectedEntry = formData[index];
  //   setFormData(formData.filter(entry => 
  //       entry.id !== selectedEntry.id
  //   ));
  // }





  return(
    <div>
      <PersonalInfo />
      <Education />
    <Experience />
    </div>
  )
  
  
}
export default App
