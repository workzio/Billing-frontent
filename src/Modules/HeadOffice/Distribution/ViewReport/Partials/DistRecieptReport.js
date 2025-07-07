import React, { useEffect, useState } from 'react'
import { Table } from '../../../../../Components/Table'
import { Modal } from '../../../../../Components/Modal'
import dayjs from 'dayjs'
import request from '../../../../../utils/request'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { Popconfirm } from 'antd'
import { DeleteOutlined, EditOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import { ModalViewContent } from '../../../Receipt/ViewReceipt/Partials/ModalViewContent'
import { ReceiptForm } from '../../../Receipt/AddReceipt/Partials/ReceiptForm'
import { toast } from 'react-toastify'

export const DistRecieptReport = ({ activeKey, record, CallAllResetFunction }) => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [trigger, setTrigger] = useState(0)
  const [dataSource, setDataSource] = useState([])


  useEffect(() => {
    setDataSource(record)
  }, [record])



  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    CallAllResetFunction();
  };

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
        CallAllResetFunction();
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  const handleGetTable = () => {
    CallAllResetFunction();
    handleOk();
  }

  const onViewDetails = (record) => {
    setModalContent(<ModalViewContent record={record} />);
    setModalTitle("View Details");
    showModal();
  }

  const onEditReceipt = (record) => {
    setTrigger(trigger + 1)
    showModal();
    setModalTitle("update");
    setModalContent(<ReceiptForm trigger={trigger} data={record} handleGetTable={handleGetTable} />);
  }


  // const SortedSalesList = dataSource?.slice().sort((a, b) => b.receiptno - a.receiptno);

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
