import React, { Fragment, useState } from 'react'
import { CustomCardView } from '../../../../../Components/CustomCardView'
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EyeOutlined } from '@ant-design/icons'
import { Modal } from '../../../../../Components/Modal'
import dayjs from 'dayjs'
import { DateRange } from './DateRange'

export const InternalTrasactionReportTable = () => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const [internalReport, setInternalReportList] = useState([])


    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Date',
            dataIndex: 'in_transcation_date'
        },
        {
            title: 'Bank Name',
            dataIndex: 'bank_name'
        },
        {
            title: 'Payment Type',
            dataIndex: 'payment_type'
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone_number'
        },
        {
          title: 'Amount',
          dataIndex:'in_transcation_amount'
          },
    ]


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Fragment>
            <TopTitle Heading={'Internal Transaction Report'} />
            <CustomCardView width={'800px'}>
                <DateRange label={'Select Date'} url={'in/transcation/report'} setInternalReportList={setInternalReportList} />
            </CustomCardView>

            <Table columns={columns} data={internalReport}/>

            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </Fragment>
    )
}
