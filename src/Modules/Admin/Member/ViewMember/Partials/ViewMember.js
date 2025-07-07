import React, { useState } from 'react'
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { Table } from '../../../../../Components/Table';
import { Modal } from '../../../../../Components/Modal';
import { Modal as Modals } from 'antd'
import { EditOutlined, EyeOutlined } from '@ant-design/icons';
import { MdNotificationsActive } from 'react-icons/md';

const AdminViewMember = () => {
    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

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
        setModalContent('Demo');          //<ModalViewDatas record={record}/>
        setModalTitle("View Details");
        showModal();
    }
    const activrBtns = (record) => {
        const filtered = dataSource.map((prop) => {
            if (prop.id === record.id) {
                prop.status = !prop.status
                return prop
            } return prop
        })
        setDataSource(filtered)
    };
   
    const [dataSource, setDataSource] = useState([
        {
            key: '1',
            id: 'IU776',
            name: 'Mike',
            number: '988777773',
            aadhar: 'FW629654',
            designation: 'Marketing',
            status: 'Active',
        },
        {
            key: '2',
            id: 'IU9676',
            name: 'Del',
            number: '988777773',
            designation: 'Marketing',
            aadhar: 'YF&U8759',
            status: 'Active',
        },
    ])
    const columns = [
        {
            title: 'S.No',
            render: ( index) => index + 1,
        },
        {
            title: 'Distributor ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Contact no',
            dataIndex: 'number',
        },
        {
            title: 'Designation',
            dataIndex: 'designation',
        },
        {
            title: 'Aadhar',
            dataIndex: 'aadhar',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status) => {
                return (
                    <>
                        {status ?
                            <p style={{ color: 'red', fontWeight: '500' }}>Active</p> : <p style={{ color: '#02c502', fontWeight: '500' }}>Inactive</p>
                        }
                    </>
                )
            }
        },
        {
            title: 'Action',
            render: (record) => {
                return (
                    <>
                        <Flex spaceEvenly>
                            <Button.Primary text={<MdNotificationsActive />} onClick={() => {
                                activrBtns(record);
                            }} />
                            <Button.Success onClick={() => { onEditStudent(record) }} text={<EditOutlined />} />
                            <Button.Success onClick={() => { onViewDetails(record) }} text={<EyeOutlined />} />

                        </Flex>
                    </>
                );
            },

        }
    ]


    const onEditStudent = () => {
        showModal();
        setModalTitle("update");
        setModalContent('Demo');
    }
    return (
        <div>
            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={700} modalTitle={modalTitle} modalContent={modalContent} />

        </div>
    )
}

export default AdminViewMember