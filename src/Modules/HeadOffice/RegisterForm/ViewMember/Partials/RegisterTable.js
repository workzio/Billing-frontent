import React, { useState } from 'react'
import { Modal as Modals } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined } from '@ant-design/icons';
import { MdNotificationsActive } from 'react-icons/md'
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { Modal } from '../../../../../Components/Modal';
import { Table } from '../../../../../Components/Table';
import RegisTbModal from './RegisTbModal'
import ModalViewDatas from './ModalViewDatas'


const RegistviwTable = ({ setCashOut }) => {
    const [activebtn, setActivebtn] = useState(false)
    const [date, setDate] = useState('');
    // const [ischecked, setIschecked] = useState(false);
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
    const onViewStudent = (record) => {
        setModalContent(<ModalViewDatas record={record} />);
        setModalTitle("View Details");
        showModal();
    }
    const activrBtns = (record) => {
        // setActivebtn(!activebtn);
        console.log(record,'deddddddddd');
        const filtered = dataSource.map((prop)=>{
            if(prop.id === record.id){
            prop.status = !prop.status
     return prop
           }return prop})
           const otherAllFiltered = dataSource.filter((prop)=>prop.id != record.id)
           console.log(filtered,'filtered')
           console.log(otherAllFiltered,'other filtered')
          setDataSource(filtered)
        };

    const onDeleteStudent = (record) => {
        Modals.confirm({
          title: "Are you sure, you want to delete this student record?",
          okText: "Yes",
          okType: "danger",
          onOk: () => {
            setDataSource((pre) => {
              return pre.filter((student) => student.id !== record.id);
            });
          },
        });
      };
      const[tableData, setTableData] = useState();
      const [dataSource, setDataSource] = useState([
        {
            id:1,
            sid: 'IU776',
            name: 'Mike',
            design: 'Marketing',
            status:'Active',
            number: '988777773',
        },
        {
            id:2,
            sid: 'IU776',
            name: 'Mike',
            design: 'Marketing',
            status:'Deactive',
            number: '988777773',
        },
    ])
    
 
    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Member ID',
            dataIndex: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
        },
        {
            title: 'Desigination',
            dataIndex: 'design',
        },
        {
            title: 'Phone No',
            dataIndex: 'number',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status,id) => {
                return (
                    <>
                        {status ?
                            <p style={{color:'red',fontWeight:'500'}}>Active</p> :  <p style={{color:'#02c502',fontWeight:'500'}}>Inactive</p>
                        }
                    </>
                )
            }
        },
        {
            title: 'Action',
            render: (record,i) => {
                return (
                    <>
                        <Flex spaceEvenly>
                            <Button.Success onClick={() => {
                                onEditStudent(record);
                            }} text={<EditOutlined />} />

                            <Button.Success text={<EyeOutlined />} onClick={() => {
                                onViewStudent(record);
                            }} />
                            <Button.Primary text={<MdNotificationsActive />} onClick={() => {
                                activrBtns(record);}}/>

                            <Button.Danger text={<DeleteOutlined />} onClick={() => onDeleteStudent(record)} />

                        </Flex>
                    </>
                );
            },

        }
    ]
    const onEditStudent = (record) => {
        showModal();
        setModalTitle("update");
        setModalContent(<RegisTbModal setCashOut={record} handleOk={handleOk} />);
    }
    return (
        <div><br /><br />
            <Table columns={columns} data={dataSource} />
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={700} modalTitle={modalTitle} modalContent={modalContent} />
        </div>

    )
}

export default RegistviwTable