import React, { useEffect, useState } from 'react'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EyeOutlined, EditOutlined, FileTextOutlined } from '@ant-design/icons'
import { Modal } from '../../../../../Components/Modal'
import { BillDetails } from '../../../Sale/ViewSale/Partials/BillDetails'
import dayjs from 'dayjs'
import { DebitReturnModal } from './DebitReturnModal'
import request from '../../../../../utils/request'
import { ViewTableModal } from './ViewTableModal'

const Bottomdistn = ({ record, CallAllResetFunction,getSalesList}) => {

  const [dataSource, setDataSource] = useState([])
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [trigger, setTrigger] = useState(1)


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

  useEffect(() => {
    setDataSource(record)
  }, [record])


  const onViewStudent = (record) => {
    setModalContent(<BillDetails record={record} />);
    setModalTitle("View Details");
    showModal();
  }

  const onViewTable = (record) => {
    setModalContent(<ViewTableModal record={record} getSalesList={getSalesList}/>);
    setModalTitle("View Details");
    showModal();
  }

  const onViewDebitReturn = (record) => {
    setTrigger(trigger + 1)
    setModalContent(<DebitReturnModal CallAllResetFunction={CallAllResetFunction} trigger={trigger} isModalOpen={isModalOpen} handleCancel={handleCancel} record={record} setIsModalOpen={setIsModalOpen} />);
    setModalTitle("Debit Return");
    showModal();
  }

  const SortedSalesList = dataSource?.slice().sort((a, b) => b.invoice_no - a.invoice_no);
  
  const columns = [
    {
      title: 'SI.No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Date',
      render: (record) => {
        const formattedDate = dayjs(record?.invoice_date).format('DD-MM-YYYY');
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoice_no'
    },
    {
      title: 'Amount',
      dataIndex: 'roundoff_amount'
    },
    {
      title: 'Balance',
      dataIndex: 'balance'
    },
    {
      title: 'Action',
      render: (tableRecord) => {
        return (
          <>
            <Flex center gap={'10px'}>

              <Button.Success text={<EyeOutlined />} onClick={() => {
                onViewStudent(tableRecord);
              }} />

              {tableRecord?.paidbill === 0 &&
                (<Button.Primary text={<EditOutlined />} onClick={() => {
                  onViewDebitReturn(tableRecord);
                }} />)
              }
              <Button.Primary text={<FileTextOutlined />} onClick={() => {
                onViewTable(tableRecord);
              }} />

            </Flex>
          </>
        );
      },
    },
  ]

  return (
    <div style={{ margin: '15px 10px' }}>
      <Table columns={columns} data={SortedSalesList} />

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}

export default Bottomdistn