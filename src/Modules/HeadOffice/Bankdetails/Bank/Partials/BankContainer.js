import React, { Fragment } from 'react'
import { CustomTabs } from '../../../../../Components/CustomTabs'
import { OnlineTransaction } from './OnlineTransaction'
import { BankToBank } from './BankToBank'
import { Savings } from './Savings'
 
export const BankContainer = () => {

    const tabs = [
        { label: 'Savings', content: <Savings /> },
        { label: 'Online Transaction', content: <OnlineTransaction /> },
        // { label: 'Bank to Bank Transaction', content: <BankToBank /> },
    ];

    return (
        <Fragment>
            {/* <CustomTabs tabs={tabs} defaultActiveKey={'1'}/> */}
        </Fragment>
    )
}
