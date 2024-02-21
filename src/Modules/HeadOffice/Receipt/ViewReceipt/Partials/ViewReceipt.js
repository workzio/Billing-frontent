import { Col, Modal as Modals, Popconfirm } from "antd";
import Flex from "../../../../../Components/Flex";
import Button from "../../../../../Components/Form/Button";
import { Table } from "../../../../../Components/Table";
import { Modal } from "../../../../../Components/Modal";
import { Fragment, useEffect, useRef, useState } from "react";
import { DeleteOutlined, EditOutlined, EyeOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { ReceiptForm } from "../../AddReceipt/Partials/ReceiptForm";
import request from "../../../../../utils/request";
import { Row } from "../../../../../Components/Row";
import { toast } from "react-toastify";
import dayjs from 'dayjs'
import { useReactToPrint } from 'react-to-print'
import * as numToWord from 'num-to-text';
import {
    AmountWrapper,
    Symbol,
    SignatureWrapper,
    ShopName,
    Sign,
} from "./Style";
import {
    CommonHolder,
    CommonTitleHolder,
    CommonTitleH1,
    CommonTitleH2,
    CommonTitleH3,
    ContentHolder,
    CommonSubTitleMenu,
    CommonSubTitleMenuValue,
} from '../../../../../Components/Styled'
import { useSelector } from "react-redux";
import { ModalViewContent } from "./ModalViewContent";


export const ViewReceiptTable = () => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const [dataSource, setDataSource] = useState([])

    const [trigger, setTrigger] = useState(0)

    const CompanySel = useSelector((state) => state.companyprofile.companyprofile)

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        GetReceipt();
    };

    const onViewDetails = (record) => {
        setModalContent(<ModalViewContent record={record} />);
        setModalTitle("View Details");
        showModal();
    }

    useEffect(() => {
        GetReceipt();
    }, [])

    const GetReceipt = () => {
        request.get('receipts')
            .then(function (response) {
console.log(response.data,'RECIEPTS');
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
        GetReceipt();
        handleOk();
    }



    const onEditReceipt = (record) => {
        setTrigger(trigger + 1)
        showModal();
        setModalTitle("update");
        setModalContent(<ReceiptForm trigger={trigger} data={record} handleGetTable={handleGetTable} />);
    }

    const confirm = (e) => {
        onDeleteReceipts(e)
    };
    const cancel = (e) => {
        console.log(e);
    };

    const onDeleteReceipts = (record) => {
        request.delete(`receipts/delete/${record.receipt_id}`,)
            .then(function (response) {
                toast.success('Receipt Deleted Successfully')
                GetReceipt();

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
            title: 'Receipt No',
            dataIndex: 'receiptNo',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date) => (
                <span>{dayjs(date).format('DD-MM-YYYY')}</span>
            )
        },
        {
            title: 'Received From',
            dataIndex: 'received',
        },
        {
            title: 'Reciept Type',
            dataIndex: 'receiptType',
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
                        <Button.Primary onClick={() => { onEditReceipt(record) }} text={<EditOutlined />} />

                        <Popconfirm
                            title="Delete the Receipt"
                            description="Are you sure to delete this Receipt?"
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
            <Table columns={columns} data={dataSource} rowKey={(record) => record.receipt_id} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={900} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}
