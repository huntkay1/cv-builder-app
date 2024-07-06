// import React, { useState } from 'react';
// import downIcon from '../assets/down.svg';
// import upIcon from '../assets/up.svg'; 

// function ExperienceForm() {
//     return (
//         <form className={isExpanded ? 'form' : 'collapsed form'} onSubmit={handleSubmit} >
//             <div className='input-container'>
//                 <label htmlFor='companyName'>Company Name</label>
//                 <input type='text' id='companyName' name='companyName' value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
//             </div>
//             <div className='input-container'>
//                 <label htmlFor='position'>Position</label>
//                 <input type='text' id='position' name='position' value={position} onChange={(e) => setPosition(e.target.value)} />
//             </div>
//             <div className='input-container'>
//                 <label htmlFor='start_date'>Start Date</label>
//                 <input type='text' id='start_date' name='start_date' value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//             </div>
//             <div className='input-container'>
//                 <label htmlFor='end_date'>End Date</label>
//                 <input type='text' id='end_date' name='end_date' value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//             </div>
//             <div className='input-container'>
//                 <label htmlFor='location'>Location</label>
//                 <input type='text' id='location' name='location' value={location} onChange={(e) => setLocation(e.target.value)} />
//             </div>
//             <div className='input-container'>
//                 <label htmlFor='description'>Description</label>
//                 <input type='text' id='description' name='description' value={description} onChange={(e) => setDescription(e.target.value)} />
//             </div>

//             <div className='button-container'>
//                 <div>
//                     <button type='button' onClick ={cancelAddition}>Cancel</button>
//                     <button type='button' onClick={handleDeleteEntry}>Delete</button>
//                 </div>
//                 <button type='submit'>Save</button>
//             </div>
//         </form>
//     );
// }

// function ExperienceList() {

// }

// function Experience() {
//     return(
//         <ExperienceForm />
//     )
    
// }

// export default Experience