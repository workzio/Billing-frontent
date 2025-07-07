import React, { useEffect, useState } from 'react'
import { Table } from '../../../../../Components/Table'
import { Modal } from '../../../../../Components/Modal'
import dayjs from 'dayjs'
import request from '../../../../../utils/request'
import { DeleteOutlined, EditOutlined, EyeOutlined, QuestionCircleOutlined } from '@ant-design/icons'
import Button from '../../../../../Components/Form/Button'
import { Popconfirm } from 'antd'
import { ModalViewContent } from '../../../Voucher/ViewVoucher/Partials/ModalViewContent'
import { VoucherForm } from '../../../Voucher/AddVoucher/Partials/VoucherForm'
import Flex from '../../../../../Components/Flex'
import { toast } from 'react-toastify'

export const DistVoucherReport = ({record, CallAllResetFunction}) => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [dataSource, setDataSource] = useState([])


  
  useEffect(() => {
    setDataSource(record)
  }, [record])


  const onDeleteVoucher = (record) => {
    request.delete(`vouchers/delete/${record.voucher_id}`,)
      .then(function (response) {
        toast.success('Voucher Deleted Successfully')
        CallAllResetFunction()
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    CallAllResetFunction()
  };

  const onViewDetails = (record) => {
    setModalContent(<ModalViewContent record={record} />);
    setModalTitle("View Details");
    showModal();
  }

  const handleGetTable = () => {
    CallAllResetFunction()
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
