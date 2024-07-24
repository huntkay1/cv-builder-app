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
        <button onClick={() => setOpen(true)}>Clear Resume</button>
        
        {open && 
            <div id='popup'>
                Are you sure?
                <div>
                    <button onClick={clearForm}>Yes</button>
                    <button onClick={() => setOpen(false)}>No</button>
                </div>
            </div> 
        }
        </>
    )
}