import Flex from "../../../../../Components/Flex";
import Button from "../../../../../Components/Form/Button";
import { Table } from "../../../../../Components/Table";
import { Modal } from "../../../../../Components/Modal";
import {  useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { VoucherForm } from "../../AddVoucher/Partials/VoucherForm";
import request from "../../../../../utils/request";
import { toast } from "react-toastify";
import dayjs from 'dayjs'
import {ModalViewContent} from './ModalViewContent'

import { useSelector } from "react-redux";
import { Popconfirm } from "antd";

export const ViewVoucherTable = () => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const [dataSource, setDataSource] = useState([])


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        GetVouchers();
        
    };

    const onViewDetails = (record) => {
        setModalContent(<ModalViewContent record={record} />);
        setModalTitle("View Details");
        showModal();
    }

    useEffect(() => {
        GetVouchers();
    }, [])

    const GetVouchers = () => {
        request.get('vouchers')
            .then(function (response) {
                if (response.status == 200) {
                    setDataSource(response.data)
                }
                else {
                    console.log('Distributes details failed');
                }
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    }

    const handleGetTable = () => {
        GetVouchers();
        handleOk();
    }



    const onEditVoucher = (record) => {
        setModalContent(<VoucherForm data={record} handleGetTable={handleGetTable} />);
        setModalTitle("View Details");
        showModal();
    }

    const confirm = (e) => {
        onDeleteVoucher(e)
      };
      const cancel = (e) => {
        console.log(e);
      };

    const onDeleteVoucher = (record) => {
        request.delete(`vouchers/delete/${record.voucher_id}`,)
            .then(function (response) {
                toast.success('Voucher Deleted Successfully')
                GetVouchers();
            })

            .catch(function (error) {
                console.log(error);
            });
    }

    
    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Voucher No',
            dataIndex: 'voucherNo',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => (
                <span>{dayjs(date).format('DD-MM-YYYY')}</span>
            )
        },
        {
            title: 'Paid To',
            dataIndex: 'paidTo',
        },
        {
            title: 'Voucher Type',
            dataIndex: 'voucherType',
        },
        {
            title: 'Amount',
            dataIndex: 'amount',
        },

        {
            title: 'Action',
            render: (record, i) => {
                return (
                    <Flex center gap={'10px'}>
                        <Button.Success onClick={() => { onViewDetails(record) }} text={<EyeOutlined />} />
                        <Button.Primary onClick={() => { onEditVoucher(record) }} text={<EditOutlined />} />

                        <Popconfirm
                            title="Delete the Voucher"
                            description="Are you sure to delete this Voucher?"
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
        <div>
            <Table columns={columns} data={dataSource} rowKey={(record) => record.voucher_id} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={900} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}