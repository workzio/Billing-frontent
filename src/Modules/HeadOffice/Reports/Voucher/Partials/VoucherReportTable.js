import React, { Fragment, useState } from 'react'
import { DateRange } from './DateRange'
import { CustomCardView } from '../../../../../Components/CustomCardView'
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EyeOutlined } from '@ant-design/icons'
import { Modal } from '../../../../../Components/Modal'
import dayjs from 'dayjs'
import { ModalViewContent } from '../../../Voucher/ViewVoucher/Partials/ModalViewContent'

export const VoucherReportTable = () => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [voucherList, setVoucherList] = useState([])


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  const columns = [
    {
      title: 'SI No',
      render: (value, item, index) => index + 1,
    },
    {
      title: 'Paid To',
      dataIndex: 'paidTo',
    },
    {
      title: 'Voucher Number',
      dataIndex: 'voucherNo'
    },
    {
      title: 'Date',
      render: (text, record) => {

        const formattedDate = dayjs(record?.date).format('DD-MM-YYYY');
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
    },
    {
      title: 'Action',
      render: (record, i) => {
        return (
          <>
            <Flex center gap={'10px'}>
              <Button.Success text={<EyeOutlined />} onClick={() => onViewProduct(record)} />
            </Flex>
          </>
        );
      },
    }
  ]


  const onViewProduct = (record) => {
    setModalContent(<ModalViewContent record={record} />);
    setModalTitle("View Product");
    showModal();
  }


  return (
    <Fragment>
      <TopTitle Heading={'Voucher Report'} />
      <CustomCardView width={'800px'}>
        <DateRange label={'Select Date'} url={'vouchers/report'} setVoucherList={setVoucherList}/>
      </CustomCardView>

      <Table columns={columns} data={voucherList}/>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
