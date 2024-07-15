function Resume({ formData }) {
    return(
        <div>
            <div className='resume-header'>
                <h1 id='header-name'>{formData.personalInfo.name}</h1>
                <div id='contact-info'>
                    <h2>{formData.personalInfo.email}</h2>
                    <h2>{formData.personalInfo.phone}</h2>
                    <h2>{formData.personalInfo.location}</h2>
                </div>
            </div>
            
        </div>

    )
}

export default Resume