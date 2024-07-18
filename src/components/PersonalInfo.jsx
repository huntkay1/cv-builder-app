import personalIcon from '../assets/personal.svg'


function PersonalInfo({ handleFormDataUpdate, formData }) {

    return(
        <div className='form-container' id='personalInfo'>
            <div className='form-header'>
                <div className='form-header-title'>
                    <img src={personalIcon}></img>
                    <h2 className='form-title'>Personal Details</h2>
                </div>
            </div>
            <form >
                <div className='input-container'>
                    <label htmlFor='name'>Full Name</label>
                    <input type='text' name='name' id='name' value={formData.name} onChange={handleFormDataUpdate}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='email'>Email</label>
                    <input type='text' name='email' id='email' value={formData.email} onChange={handleFormDataUpdate}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='phone'>Phone Number</label>
                    <input type='text' name='phone' id='phone' value={formData.phone} onChange={handleFormDataUpdate}></input>
                </div>
                <div className='input-container'>
                    <label htmlFor='location'>Location</label>
                    <input type='text' name='location' id='location' value={formData.location} onChange={handleFormDataUpdate}></input>
                </div>
            </form>
        </div>
    );
}

export default PersonalInfo