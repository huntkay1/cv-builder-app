import PersonalInfo from './components/PersonalInfo.jsx';
import Education from './components/EducationInfo.jsx';
import Experience from './components/ExperienceInfo.jsx';
import Resume from './components/Resume.jsx'
import { useState } from 'react';

function App() {
  const [currentEducationIndex, setCurrentEducationIndex] = useState(0); //the index of the entry that is currently being manipulated
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [displayEducationForm, setDisplayEducationForm] = useState(false);
  const [displayExperienceForm, setDisplayExperienceForm] = useState(false);
  const [editingMode, setEditingMode] = useState(false);

  const [formData, setFormData] = useState({
    personalInfo: {
      name: 'Kayla Hunt',
      email: 'kayla.hunt798@gmail.com',
      phone: '269-941-3012',
      location: 'South Haven, MI'
    },
    sections: {
      education: [
        {
          school: 'Michigan State University',
          degree: 'Bachelors of Arts, Information Science',
          startDate: 'September 2020',
          endDate: 'August 2023',
          location: 'East Lansing, MI'
        },
      ],
      experience: [
        {
          companyName: 'Michigan State University',
          position: 'UX Designer & Researcher',
          startDate: 'February 2024',
          endDate: 'May 2024',
          location: 'Remote',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
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
        companyName: '',
        postion: '',
        startData: '',
        endDate: '',
        location: '',
        descripton: ''
      }
    } else if (formName === 'education') {
      return {
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
          personalInfoData={formData.personalInfo}
          experienceData={formData.sections.experience}
          educationData={formData.sections.education}
        />
      </div>
    </div>
  )
  
  
}
export default App
