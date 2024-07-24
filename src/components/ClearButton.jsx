import { useState } from 'react';

export default function ClearButton() {

    const [open, setOpen] = useState(false);

    return (
        <>
        <button onClick={() => setOpen(true)}>Clear Resume</button>
        
        {open && 
            <div id='popup'>
                Are you sure?
                <div>
                    <button>Yes</button>
                    <button onClick={() => setOpen(false)}>No</button>
                </div>
            </div> 
        }
        </>
    )
}