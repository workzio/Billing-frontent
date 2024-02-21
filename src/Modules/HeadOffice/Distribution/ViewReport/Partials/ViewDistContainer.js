import React, { Fragment, useState } from 'react'
import Bottomdistn from './Bottomdistn'
import { CustomTabs } from '../../../../../Components/CustomTabs'
import { DistRecieptReport } from './DistRecieptReport'
import { DistVoucherReport } from './DistVoucherReport'

export const ViewDistContainer = ({ CallAllResetFunction, salesReport, disVoucher, disReceipt, getSalesList, setActiveTab }) => {

    const [active, setActive] = useState(1)

    const tabs = [
        { label: 'Sales Report', content: <Bottomdistn activeKey={active} CallAllResetFunction={CallAllResetFunction} record={salesReport} getSalesList={getSalesList} /> },
        { label: 'Reciept Report', content: <DistRecieptReport activeKey={active} CallAllResetFunction={CallAllResetFunction} record={disReceipt} /> },
        { label: 'Voucher Report', content: <DistVoucherReport activeKey={active} CallAllResetFunction={CallAllResetFunction} record={disVoucher} /> },
    ];

    const handleChange = (e) => {
        setActive(e)
        setActiveTab(e)
    }

    return (
        <div style={{ marginTop: '30px' }}>
            <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={(e) => handleChange(e)} />
        </div>
    )
}
