import React, { useEffect, useState } from 'react'
import request from '../../../../../utils/request'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import { EyeOutlined, EditOutlined, } from '@ant-design/icons';
import Button from '../../../../../Components/Form/Button';
import { Modal } from '../../../../../Components/Modal';
import { DebitReturnModal } from './DebitReturnModal';
import { Tag } from 'antd';

export const ViewTableModal = ({ record, getSalesList }) => {
    const [tableData, setTableData] = useState([])

    const [isModalOpen, setIsModalOpen] = useState(false);

    const [modalTitle, setModalTitle] = useState("");

    const [modalContent, setModalContent] = useState(null);


    useEffect(() => {
        tableModal()
    }, [record,])


    const tableModal = () => {
        request.get(`total/sales/${record?.sales_id}`)
            .then(response => {
                setTableData(response.data.report)
            })
            .catch(error => console.log(error, 'error'))
    }

    const filteredData = tableData.filter(obj => obj.amount !== null && obj.payment_date !== null && obj.amount !== 0);
   
    const handleDebitReturnModal = () => {
        tableModal()
        handleOk()
    }


    const onEditDetails = (value) => {
        setModalContent(<DebitReturnModal getSalesList={getSalesList} handleDebitReturnModal={handleDebitReturnModal} dataFromAmtTable={record} amountData={value} />)
        setModalTitle("Edit Amount");
        showModal();
    }

    const columns = [
        {
            title: 'SI.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Received Amount',
            dataIndex: 'amount'
        },
        {
            title: 'Pay Date',
            dataIndex: 'payment_date'
        },
        {
            title: 'Action',
            dataIndex: 'status',
            render: (text, record, index) => {
                return (
                    index === filteredData.length - 1 && (
                        (text === false) ?
                            <Flex column gap={'5px'} >
                                <Button.Primary text={<EditOutlined />} onClick={() => onEditDetails(record)} />
                                <Tag color="green" style={{ textAlign: 'center' }}>Editable</Tag>
                            </Flex> :
                            <>
                                <Flex column gap={'5px'}>
                                    <Button.Primary text={<EditOutlined />} onClick={() => onEditDetails(record)} disabled />
                                    <Tag color="red" style={{ textAlign: 'center' }}>Already Edited</Tag>
                                </Flex>
                            </>
                    )
                )
            },
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
        <>
            <Table columns={columns} data={filteredData} />
            <Modal width={800} isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} />
        </>
    )
}
