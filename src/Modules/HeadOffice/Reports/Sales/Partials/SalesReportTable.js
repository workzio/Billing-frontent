import React, { Fragment, useEffect, useState } from 'react'
import { DateRange } from './DateRange'
import { CustomCardView } from '../../../../../Components/CustomCardView'
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EyeOutlined } from '@ant-design/icons'
import { Modal } from '../../../../../Components/Modal'
import { BillDetails } from '../../../Sale/ViewSale/Partials/BillDetails'
import dayjs from 'dayjs'

export const SalesReportTable = () => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [salesList, setSalesList] = useState([])


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
      title: 'Distributor Name',
      dataIndex: 'name',
    },
    {
      title: 'Invoice Number',
      dataIndex: 'invoice_no'
    },
    {
      title: 'Sales Date',
      render: (text, record) => {

        const formattedDate = dayjs(record?.invoice_date).format('DD-MM-YYYY');
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Total Amount',
      dataIndex: 'roundoff_amount',
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
    setModalContent(<BillDetails record={record} />);
    setModalTitle("View Product");
    showModal();
  }

  return (
    <Fragment>
      <TopTitle Heading={'Sales Report'} />
      <CustomCardView width={'800px'}>
        <DateRange label={'Select Date'} url={'sales/report1'} setSalesList={setSalesList}/>
      </CustomCardView>

      <Table columns={columns} data={salesList}/>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
