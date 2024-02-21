import React from 'react'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { ViewMember } from './partials/ViewMember'

const View_Member = () => {
    return (
        <div>
            <TopTitle Heading={'View Member'} />
            <CustomCardView>
                <ViewMember />
            </CustomCardView>
        </div>
    )
}

export default View_Member