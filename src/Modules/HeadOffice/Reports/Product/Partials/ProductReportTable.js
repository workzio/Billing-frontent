import React, { Fragment, useEffect, useState } from 'react'
import { DateRange } from './DateRange'
import { CustomCardView } from '../../../../../Components/CustomCardView'
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import { Table } from '../../../../../Components/Table'
import Flex from '../../../../../Components/Flex'
import Button from '../../../../../Components/Form/Button'
import { EyeOutlined } from '@ant-design/icons'
import { Modal } from '../../../../../Components/Modal'
import dayjs from 'dayjs'
import { BillDetails } from '../../../Purchase/ViewPurchase/Partials/BillDetails'

export const ProductReportTable = () => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
 
  const [productList, setProductList] = useState([])


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
      title: 'Category',
      dataIndex: 'category',
    },
    {
      title: 'Product Name',
      dataIndex: 'productname'
    },
    {
      title: 'Date',
      render: (text, record) => {

        const formattedDate = dayjs(record?.purchase_date).format('DD-MM-YYYY');
        return <span>{formattedDate}</span>;
      },
    },
    {
      title: 'Unit Name',
      dataIndex: 'unitname'
    },
    {
      title: 'Moving Stock',
      dataIndex: 'moving_stock',
    },
  ]

  return (
    <Fragment>
      <TopTitle Heading={'Product Report'} />
      <CustomCardView width={'800px'}>
        <DateRange label={'Select Date'} url={'date/range'} setProductList={setProductList}/>
      </CustomCardView>

      <Table columns={columns} data={productList}/>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
