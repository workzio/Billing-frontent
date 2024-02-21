import React from 'react'
import { VoucherForm } from './Partials/VoucherForm'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { CustomCardView } from '../../../../Components/CustomCardView'

export const AddVoucher = () => {
    return (
        <div>
            <TopTitle Heading={'Add Voucher'} />
            <CustomCardView width={'900px'}>
                <VoucherForm />
            </CustomCardView>
        </div>
    )
}

