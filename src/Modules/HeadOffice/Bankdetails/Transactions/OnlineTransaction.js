import React from 'react'
import { TopTitle } from '../../../../Components/Form/TopTitle'
import { CustomCardView } from '../../../../Components/CustomCardView'
import { OnlineTransaction } from '../Bank/Partials/OnlineTransaction'

export const Online_Transaction = () => {
    return (
        <div>
            <TopTitle Heading={'Online Transaction'} />
                <OnlineTransaction />
        </div>
    )
}
