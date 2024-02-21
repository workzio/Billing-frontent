import React from 'react'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { Table } from '../../../../../Components/Table'

const InvestTable = () => {
    const investCol = [
        {
            title: 'SI No.',
        },
        {
            title: 'Date',
        },
        {
            title: 'Investment Amount',
            dataIndex: 'investment_amount'
        },
        {
            title: 'Action',
            render: () => {
                return (
                    <>
                      
                      <Flex column gap={'10px'}>
                    <Button.Primary  text={'Update'}/>
                     <Button.Primary text={'Cancel'}/>
                    </Flex>
                    </>
                )
            }
        },
    ]
    return (
        <div>
            <Table columns={investCol}/>
        </div>
    )
}

export default InvestTable