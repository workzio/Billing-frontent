import React, { useState } from 'react'
import { Table } from '../../../../../Components/Table';
import { Modal } from '../../../../../Components/Modal';
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { DeleteOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { BillDetails } from './BillDetails';
import { useEffect } from 'react';
import request from '../../../../../utils/request';
import { TopTitle } from '../../../../../Components/Form/TopTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs'
import { Popconfirm } from 'antd';
const ViewTable = () => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ============  Sales  ====

    const [salesList, setSalesList] = useState([])

    const Distributor = useSelector((state => state.Distributee.Distributor))

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    const onViewDetails = (record) => {
        setModalContent(<BillDetails record={record} />);          //<ModalViewDatas record={record}/>
        setModalTitle("View Details");
        showModal();
    }

    const confirm = (e) => {
        onDeletePurchase(e)
    };

    const cancel = (e) => {
        console.log(e);
    };

    const onDeletePurchase = (record) => {
        request.delete(`purchase/delete/${record.purchase_id}`,)
            .then(function (response) {
                toast.success('Purchase Report Deleted Successfully')
                getPurchaseList();

            })

            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getPurchaseList()
    }, [])

    const getPurchaseList = () => {
        request.get('purchase/invoice',)
            .then(function (response) {
                setSalesList(response.data)
            })

            .catch(function (error) {
                console.log(error);
            });
    }


    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Company Name',
            dataIndex: 'companyname',
        },
        {
            title: 'Purchase Number',
            dataIndex: 'purchase_number'
        },
        {
            title: 'Date',
            dataIndex: 'purchase_date',
            render: (text, record) => {

                const formattedDate = dayjs(record?.purchase_date).format('DD-MM-YYYY');
                return <span>{formattedDate}</span>;
            },
        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_no',
        },
        {
            title: 'Total Amount',
            dataIndex: 'roundoff_amount',
        },
       
        {
            title: 'Action',
            render: (record) => {
                return (
                    <Flex center gap={'10px'}>
                        <Button.Success text={<EyeOutlined />} onClick={() => onViewDetails(record)} />

                        <Popconfirm
                            title="Delete the Purchase"
                            description="Are you sure to delete this Purchase?"
                            onConfirm={() => confirm(record)}
                            onCancel={cancel}
                            icon={
                                <QuestionCircleOutlined size={'30'}
                                    style={{
                                        color: 'red',
                                    }}
                                />
                            }
                            placement="topLeft"
                            okText="Yes"
                            cancelText="No"
                        >
                            <Button.Danger text={<DeleteOutlined />} />
                        </Popconfirm>
                    </Flex>
                );
            },

        }
    ]

    return (

        <div style={{ margin: '30px 0' }}>
            <TopTitle Heading={'Purchase View'} />
            <Table columns={columns} data={salesList} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </div>

    )
}

export default ViewTable