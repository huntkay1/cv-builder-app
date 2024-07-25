import { useState } from 'react';

export default function ClearButton( {setFormData} ) {

    const [open, setOpen] = useState(false);
    const cleanFormData = {
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
                description: '.'
              }
            ]
          }  
    }

    function clearForm() {
        setFormData(cleanFormData);
        setOpen(false);
    }

    return (
        <>
        <button id='clear-button' onClick={() => setOpen(true)}>Clear Resume</button>
        
        {open && 
            <div id='popup-container'>
              <p>Are you sure?</p>
              <div>
                  <button onClick={clearForm}>Yes, clear my resume</button>
                  <button onClick={() => setOpen(false)}>No, take me back</button>
              </div>
            </div>
        }
        </>
    )
}