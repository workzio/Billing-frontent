import React from 'react'
import { BankDetailsFrom } from './Partials/BankDetailsFrom'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { CustomCardView } from '../../../../Components/CustomCardView'

export const BankDetailsFormIndex = () => {
    return (
        <div>
            <TopTitle Heading={'Add Bank Account'} />
            <CustomCardView width={'900px'} >
                <BankDetailsFrom />
            </CustomCardView>
        </div>
    )
}
