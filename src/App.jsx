import PersonalInfo from './components/PersonalInfo.jsx';
import Education from './components/EducationInfo.jsx';
import Experience from './components/ExperienceInfo.jsx';
import Resume from './components/Resume.jsx';
import ClearButton from './components/ClearButton.jsx';
import { useState , useRef} from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function App() {
  const [currentEducationIndex, setCurrentEducationIndex] = useState(0); //the index of the entry that is currently being manipulated
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState(0);
  const [displayEducationForm, setDisplayEducationForm] = useState(false);
  const [displayExperienceForm, setDisplayExperienceForm] = useState(false);
  const [editingMode, setEditingMode] = useState(false);
  const [experienceIsExpanded, setExperienceIsExpanded] = useState(false);
  const [educationIsExpanded, setEducationIsExpanded] = useState(false);
  const resumeRef = useRef(null); // Reference for Resume component


  const [formData, setFormData] = useState({
    personalInfo: {
      name: 'Bob Loblaw',
      email: 'bob_loblaw@email.com',
      phone: '123-456-7890',
      location: 'Detroit, Michigan'
    },
    sections: {
      education: [
        {
          school: 'University of Michigan',
          degree: 'Bachelor in Computer Science',
          startDate: 'September 2019',
          endDate: 'August 2023',
          location: 'Ann Arbor, MI'
        },
      ],
      experience: [
        {
          companyName: 'Apple',
          position: 'Jr. Front-End Developer',
          startDate: 'February 2024',
          endDate: 'Present',
          location: 'Remote',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        },
        {
          companyName: 'LinkedIn',
          position: 'Front-End Developer Intern',
          startDate: 'May 2023',
          endDate: 'August 2023',
          location: 'San Diego, California',
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

  function toggleExpand(formName) {
    if(formName==='education') {
      setEducationIsExpanded(!educationIsExpanded)
      setExperienceIsExpanded(false)
    } else if(formName==='experience') {
      setExperienceIsExpanded(!experienceIsExpanded)
      setEducationIsExpanded(false)
    }
  }

  // Function to capture and download resume as PDF
  const handleDownloadPDF = async () => {
    const element = resumeRef.current;
    const canvas = await html2canvas(element, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 190;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 10, 10, imgWidth, imgHeight);
    pdf.save('resume.pdf');
  };

  return(
    <div id='main-container'>
      <div id='forms'>
        <div className='action-buttons-container'>
          <button onClick={handleDownloadPDF} className='action-button download'>Download as PDF</button>
          <ClearButton 
            setFormData={setFormData}
          />
        </div>

        <PersonalInfo 
        handleFormDataUpdate={handlePersonalInfoChange}
        formData={formData.personalInfo}
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
        isExpanded={educationIsExpanded}
        toggleExpand={toggleExpand}
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
        isExpanded={experienceIsExpanded}
        toggleExpand={toggleExpand}
        />
      </div>

      <div className='resume-container' ref={resumeRef}>
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
