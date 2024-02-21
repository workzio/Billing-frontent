import React from 'react'
import { CustomTabs } from '../../../../../Components/CustomTabs'

export const ViewReceiptTabContainer = () => {

    const [active, setActive] = useState(1)

    return (
        <Fragment>
            <CustomTabs tabs={tabs} defaultActiveKey={'1'} onChange={(e) => setActive(e)} />
        </Fragment>
    )
}
