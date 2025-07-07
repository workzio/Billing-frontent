import React, { Fragment, useEffect, useState } from 'react'
import { ViewInternalTransaction } from './ViewInternalTransaction'
import { ViewOnlineTransaction } from './ViewOnlineTransaction'
import { CustomTabs } from '../../../../../Components/CustomTabs'

export const ViewBankContainer = () => {

    const [active, setActive] = useState(1)

    const tabs = [
        { label: 'Internal Transaction', content: <ViewInternalTransaction activeKey={active} /> },
        { label: 'Online Transaction', content: <ViewOnlineTransaction activeKey={active} /> },
    ];

    return (
        <Fragment>
            <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={(e) => setActive(e)} />
        </Fragment>
    )
}
