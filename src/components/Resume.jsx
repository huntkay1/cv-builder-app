function Resume({ educationData, experienceData}) {
    return(
        <div>
            <div className='resume-header'>

            </div>
            <ul>
                {educationData.map(dataEntry => (
                    <li>{dataEntry.school}</li>
                ))}
            </ul>
        </div>

    )
}

export default Resume