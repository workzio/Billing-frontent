import React from 'react'
import { ReceiptForm } from './Partials/ReceiptForm'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { CustomCardView } from '../../../../Components/CustomCardView'

export const AddReceipt = () => {
    return (
        <div>
            <TopTitle Heading={'Add Receipt'} />
            <CustomCardView width={'900px'}>
                <ReceiptForm />
            </CustomCardView>
        </div>
    )
}

