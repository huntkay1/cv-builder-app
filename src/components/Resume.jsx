function Resume({ personalInfoData, experienceData, educationData }) {
    return(
        <div>
            <div className='resume-header'>
                <h1 id='header-name'>{personalInfoData.name}</h1>
                <div id='contact-info'>
                    <h2>{personalInfoData.email}</h2>
                    <h2>{personalInfoData.phone}</h2>
                    <h2>{personalInfoData.location}</h2>
                </div>
            </div>

            <div id='resume-sections'>

                <div className='education-section'>
                    <h3 className='section-header'>Education</h3>
                    {educationData.map((entry, index) => (
                        <div className='education-entry'>  
                            <div className='education-info'>
                                <h4 className='degree-info'>{entry.degree}</h4>
                                <h4 className='school-info'>{entry.school} | {entry.location} </h4>
                            </div>
                            <h4 className='date'>{entry.startDate} - {entry.endDate}</h4>
                        </div>
                    ))}
                </div>

                <div className='experience-section'>
                    <h3 className='section-header'>Experience</h3>
                    {experienceData.map((entry, index) => (
                        <div className='experience-entry'>
                            <div className='experience-info'>
                                <h4 className='company-info'>{entry.companyName} | {entry.location} </h4>
                                <h4 className='position-info'>{entry.position}</h4>
                                <p className='experience-description'>{entry.description}</p>
                            </div>

                            <h4 className='date'>{entry.startDate} - {entry.endDate}</h4>
                        </div>
                    ))}
                </div>
            
            </div>
            
        </div>

    )
}

export default Resume