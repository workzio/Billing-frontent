import React from 'react'
import { Addsalary } from './Partials/Addsalary'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { TopTitle } from '../../../../Components/Form/TopTitle'

const Add_salary = () => {
    return (
        <div>
            <TopTitle Heading={'Add Salary'}/>
            <CustomCardView width={'800px'}>
                <Addsalary />
            </CustomCardView>
        </div>
    )
}

export default Add_salary