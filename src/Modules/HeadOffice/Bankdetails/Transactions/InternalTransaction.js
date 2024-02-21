import React from 'react'
import { AddBankDetails } from '../AddBank/Partials/AddBankDetails'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { TopTitle } from '../../../../Components/Form/TopTitle'

export const InternalTransaction = () => {

    return (
        <div>
            <TopTitle Heading={'Internal Transaction'} />
            <CustomCardView width={'900px'}>
                <AddBankDetails />
            </CustomCardView>
        </div>
    )
}
