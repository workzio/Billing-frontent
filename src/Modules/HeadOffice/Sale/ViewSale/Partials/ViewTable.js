import React, { useState } from 'react'
import { Table } from '../../../../../Components/Table';
import { Modal } from '../../../../../Components/Modal';
import { Modal as Modals, Popconfirm } from 'antd'
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { MdNotificationsActive } from 'react-icons/md';
import { DeleteOutlined, EditOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import EditDetails, { BillDetails } from './BillDetails';
import Modal_view_distri from '../../../Distribution/ViewDistribution/Partials/Modal_view_distri';
import { useEffect } from 'react';
import request from '../../../../../utils/request';
import { TopTitle } from '../../../../../Components/Form/TopTitle';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import dayjs from 'dayjs'

const ViewTable = () => {
    const [activebtn, setActivebtn] = useState(false)
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    // ============  Sales  ====

    const [salesList, setSalesList] = useState([])

    const navigate = useNavigate()
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
        onDeleteSale(e)
    };

    const cancel = (e) => {
        console.log(e);
    };


    const onDeleteSale = (record) => {
        request.delete(`sales/delete/${record.sales_id}`,)
            .then(function (response) {
                toast.success('Purchase Report Deleted Successfully')
                getSaleList();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    useEffect(() => {
        getSaleList()
    }, [])

    const getSaleList = () => {
        request.get('sales/invoice',)
            .then(function (response) {
                console.log(response);
                setSalesList(response.data)
            })

            .catch(function (error) {
                console.log(error);
            });
    }


    const SortedSalesList = salesList?.slice().sort((a, b) => b.invoice_no - a.invoice_no);

    const columns = [
        {
            title: 'SI No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Distributor Name',
            dataIndex: 'name',
        },
        {
            title: 'Invoice Number',
            dataIndex: 'invoice_no'
        },
        {
            title: 'Sales Date',
            render: (text, record) => {

                const formattedDate = dayjs(record?.invoice_date).format('DD-MM-YYYY');
                return <span>{formattedDate}</span>;
            },
        },
        {
            title: 'Total Amount',
            dataIndex: 'roundoff_amount',
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <Flex center gap={'10px'}>
                            <Button.Success text={<EyeOutlined />} onClick={() => onViewDetails(record)} />

                            <Popconfirm
                                title="Delete the Sale"
                                description="Are you sure to delete this Sale?"
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
                    </>
                );
            },

        }
    ]

    return (
        <div style={{ margin: '30px 0' }}>
            <TopTitle Heading={'Sales View'} />
            <Table columns={columns} data={SortedSalesList} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
        </div>

    )
}

export default ViewTable