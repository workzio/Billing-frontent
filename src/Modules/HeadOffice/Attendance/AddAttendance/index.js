import React from 'react'
import Attendancetable from './Partials/Attendancetable'
import { TopTitle } from '../../../../Components/Form/TopTitle'

export const AddAttendance = () => {
    return (
        <div>
            <TopTitle Heading={'Add Attendance'} />
            <Attendancetable />
        </div>
    )
}