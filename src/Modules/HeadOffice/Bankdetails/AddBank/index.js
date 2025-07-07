import React from 'react'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { AddBankDetails } from './Partials/AddBankDetails'

const Add_Bank_Details = () => {
    return (
        <div>
            <TopTitle Heading={'Add Bank Details'} />
            <CustomCardView width={'900px'}>
                <AddBankDetails />
            </CustomCardView>
        </div>
    )
}

export default Add_Bank_Details