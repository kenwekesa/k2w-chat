import React from 'react'

import './need_verification.scss'
import { ErrorOutlineOutlined } from '@mui/icons-material'
import Formnav from '../../components/formNavbar/Formnav'

function Needverification() {


    return (
        <div className='need_verification'>
            <Formnav/>
            <div className="body_container">
                

            <div className="body">
             <div className="details_card">         
            <ErrorOutlineOutlined/> <span className='info'>You have a pending email verification, proceed to your email, click on the link sent to you to verify.</span>
                
            </div>
            </div>
          
            </div>
            </div>
    )

}

export default Needverification