import React from 'react'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { ViewReceiptTable } from './Partials/ViewReceipt'

export const ViewReceipt = () => {
    return (
        <div>
            <TopTitle Heading={'View Receipt'} />
            <ViewReceiptTable />
        </div>
    )
}

