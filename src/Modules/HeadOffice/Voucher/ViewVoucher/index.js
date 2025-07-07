import React from 'react'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { ViewVoucherTable } from './Partials/ViewVoucher'

export const ViewVoucher = () => {
  return (
    <div>
        <TopTitle Heading={'View Voucher'} />
        <ViewVoucherTable />
    </div>
  )
}
