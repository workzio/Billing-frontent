import React, { useEffect, useState } from 'react'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EyeOutlined } from '@ant-design/icons'
import dayjs from 'dayjs'
import { Modal } from '../../../../../Components/Modal'
import { BillDetails } from '../../../Purchase/ViewPurchase/Partials/BillDetails'

const BottomSection = ({ record }) => {

  const [dataSource, setDataSource] = useState([])
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
    setModalContent(<BillDetails record={record} />);
    setModalTitle("View Details");
    showModal();
  }


  useEffect(() => {
    setDataSource(record)
  }, [record])

  const columns = [
    {
      title: 'SI.No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Date',
      render: (record) => {
        const formattedDate = dayjs(record?.purchase_date).format('DD-MM-YYYY');
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Purchase Number',
      dataIndex: 'purchase_number'
    },
    {
      title: 'Amount',
      dataIndex: 'amount'
    },
    {
      title: 'Action',
      render: (record) => {
        return (
          <>
            <Flex center gap={'10px'}>
              <Button.Success text={<EyeOutlined />} onClick={() => {
                onViewStudent(record);
              }} />
            </Flex>
          </>
        );
      },
    },
  ]
  return (
    <div style={{ margin: '15px 10px' }}>
      <Table columns={columns} data={dataSource} />

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />

    </div>
  )
}

export default BottomSection