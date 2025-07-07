import React, { useRef, useState } from 'react'
import { Col} from 'antd'
import { Modal } from '../../../../../Components/Modal'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import { useEffect } from 'react'
import request from '../../../../../utils/request'
import AddCompany from '../../AddCompany/Partials/AddCompany'
import { Row } from '../../../../../Components/Row'

const CmpSourceTable = ({ getCompany, setCompany }) => {

    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const [dataSource, setDataSource] = useState([])

    useEffect(() => {
        setDataSource(getCompany);
    }, [getCompany])


    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        getCompanyDetails()
    };

    const onViewCompany = (record) => {
        setModalContent(<ModalViewContent record={record} />);
        setModalTitle("View Details");
        showModal();
    }

    const getCompanyDetails = (values) => {
        request.get('outsource', values)
            .then(function (response) {
                setCompany(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    const handleviewtable = () => {
        getCompanyDetails()
        handleOk();
    }

    const columns = [
        {
            title: 'S.No',
            render: ( value, item, index) => index + 1,
        },
        {
            title: 'Company Name',
            dataIndex: 'companyname',
        },
        {
            title: 'Contact',
            dataIndex: 'contact',
        },

        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <Flex center gap={'10px'}>

                            <Button.Success text={<EyeOutlined />} onClick={() => {
                                onViewCompany(record);
                            }} />
                            <Button.Primary text={<EditOutlined />} onClick={() => {
                                EditCompany(record);
                            }} />
                        </Flex>
                    </>
                );
            },

        }
    ]
    const ModalViewContent = ({ record }) => {
        return (

            <Row gutter={[12, 12]}>
                <Col span={24} md={12}>
                    <h2>Dealers Name&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.dealername}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>Company Name&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.companyname}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>Contact&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.contact}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>Address&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.address}</h1>
                </Col>

                <Col span={24} md={12}>
                    <h2>Code&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.code}</h1>
                </Col>

                <Col span={24} md={12}>
                    <h2>GSTIN / UID&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.gstin}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>Email&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.email}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>Tax&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.taxid}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>Country&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.country}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>Account Number&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.accountnumber}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>District&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.district}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>City&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.city}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>State&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.state}</h1>
                </Col>
                <Col span={24} md={12}>
                    <h2>Post code&nbsp;:</h2>
                </Col>
                <Col span={24} md={12}>
                    <h1>{record.zipcode}</h1>
                </Col>
            </Row>
        )
    }

    const EditCompany = (record) => {
        setModalContent(<AddCompany companydata={record} handleviewtable={handleviewtable} />);
        setModalTitle("Edit Details");
        showModal();
    }

    return (
        <div>
<<<<<<< HEAD
            <TopTitle Heading={'View Outsource Company'} />
=======
            <TopTitle Heading={'View Outsource Distributor'} />
>>>>>>> c2084415200b4927070204d83a4aeb64c0a89595
            {
                dataSource.length !== 0 ? (
                    <div>
                        <Table columns={columns} data={dataSource} />
                    </div>
                ) : (
                    <h1>Loading ....</h1>
                )
            }
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}

export default CmpSourceTable