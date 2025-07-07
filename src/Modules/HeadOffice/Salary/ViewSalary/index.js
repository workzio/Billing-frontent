import React from 'react'
import { ViewSalary } from './Partials/ViewSalary'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { TopTitle } from '../../../../Components/Form/TopTitle'

const View_Salary = () => {
    return (
        <div>
            <TopTitle Heading={'View Salary'} />
            <CustomCardView>
                <ViewSalary />
            </CustomCardView>
        </div>
    )
}

export default View_Salary