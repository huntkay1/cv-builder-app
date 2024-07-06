import PersonalInfo from './components/PersonalInfo.jsx';
import Education from './components/EducationInfo.jsx';
import { useState } from 'react';
// import Experience from './components/ExperienceInfo.jsx'

function App() {

  const [formData, setFormData] = useState([]);
  // const [displayForm, setDisplayForm] = useState(true);
  // const [isExpanded, setIsExpanded] = useState(false);
  // const [editingIndex, setEditingIndex] = useState(-1); //-1 means not in editing mode



  // Function to save form data to formData array
  function updateFormData(newEntry) {
      setFormData([...formData, newEntry]);
  }

  //Function to update entry's data
  function updateEntry(newEntry) {
      const updatedFormData = [...formData];
      updatedFormData[editingIndex] = newEntry;
      setFormData(updatedFormData);
  }

  // function clearForm() {
  //     setSchool('');
  //     setDegree('');
  //     setStartDate('');
  //     setEndDate('');
  //     setLocation('');
  // }

  // function toggleExpand() {
  //     setIsExpanded(!isExpanded);
  // }

  // //toggles state of adding new entry. Shows the form when true, shows list on false. 
  // function handleAddingEntry() {
  //     setDisplayForm(!displayForm);
  // }

  // function handleEditingEntry(index) {
  //     setEditingIndex(index);
  //     const editableEntry = formData[index];
  //     //populate the form fields and show form
  //     setSchool(editableEntry.school);
  //     setDegree(editableEntry.degree);
  //     setStartDate(editableEntry.startDate);
  //     setEndDate(editableEntry.endDate);
  //     setLocation(editableEntry.location);
  //     setDisplayForm(true)
  // }

  // //cancel adding a new entry, going back to list display
  // function cancelAddition() {
  //     setEditingIndex(-1);
  //     setDisplayForm(false);
  // }

  // function handleDeleteEntry() {
  //     const selectedEntry = formData[editingIndex];
  //     setFormData(formData.filter(entry => 
  //         entry.id !== selectedEntry.id
  //     ));
  //     setEditingIndex(-1);
  //     clearForm();
  //     setDisplayForm(false);
  // }

  return(
    <div>
      <PersonalInfo />
      <Education 
      updateFormData={updateFormData}
      updateEntry={updateEntry}
      formData={formData}
    />

    </div>
  );
  
  
}
export default App
