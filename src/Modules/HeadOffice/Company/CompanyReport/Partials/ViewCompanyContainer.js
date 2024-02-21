import React, { useState } from 'react'
import BottomSection from './BottomSection'
import { CompanyRecieptReport } from './CompanyRecieptReport'
import { CompanyVoucherReport } from './CompanyVoucherReport'
import { CustomTabs } from '../../../../../Components/CustomTabs'

export const ViewCompanyContainer = ({ CallAllResetFunction, setActiveTab, purchReport, compReciept, compVoucher }) => {

    const [active, setActive] = useState(1)
    const tabs = [
        { label: 'Purchase Report', content: <BottomSection activeKey={active} CallAllResetFunction={CallAllResetFunction} record={purchReport} /> },
        { label: 'Reciept Report', content: <CompanyRecieptReport activeKey={active} CallAllResetFunction={CallAllResetFunction} record={compReciept} /> },
        { label: 'Voucher Report', content: <CompanyVoucherReport activeKey={active} CallAllResetFunction={CallAllResetFunction} record={compVoucher} /> },
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
