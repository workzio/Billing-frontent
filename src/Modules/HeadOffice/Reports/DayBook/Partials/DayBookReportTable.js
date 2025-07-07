import React, { Fragment, useEffect, useState } from 'react'
import { SelectDate } from './SelectDate'
import { CustomCardView } from '../../../../../Components/CustomCardView'
import { TopTitle } from '../../../../../Components/Form/TopTitle'
import { Table } from '../../../../../Components/Table'
import { Modal } from '../../../../../Components/Modal'
import dayjs from 'dayjs'
import { BillDetails } from '../../../Purchase/ViewPurchase/Partials/BillDetails'
import { CustomInputNumber } from '../../../../../Components/Form/CustomInputNumber'
import { Row, Col ,Form} from 'antd'

export const DayBookReportTable = () => {

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const [dayBookList, setDaybookList] = useState([])


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();


  const columns = [
    {
      title: 'Sl.No',
      render: (value, item, index) => index + 1,
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'Date',
      key: 'id',
    },
    {
      title: 'Bill No',
      dataIndex: 'billNumber',
      key: 'id',
    },
    {
      title: 'Particulars',
      key: 'id',
      dataIndex: 'particulars',
    },
    {
      key: 'id',
      title: 'Amount',
      children: [
        {
          title: 'Credit',
          dataIndex: 'credit',
        },
        {
          title: 'Debit',
          dataIndex: 'debit',
        },
      ]
    },

  ]

  let totalDebit = 0;
  let totalCredit = 0;

  dayBookList.forEach(transaction => {
      totalDebit += transaction.debit || 0;
      totalCredit += transaction.credit || 0;
  });
  const data={
    total_credit:totalCredit,
    total_debit:totalDebit
}

    useEffect(() => {
        form.setFieldsValue(data)
    }, [dayBookList])


  const onViewProduct = (record) => {
    setModalContent(<BillDetails record={record} />);
    setModalTitle("View Product");
    showModal();
  }


  return (
    <Fragment>
      <TopTitle Heading={'Product Report'} />
      <CustomCardView width={'800px'}>
        <SelectDate label={'Select Date'} url={'daybook/report1'} setDaybookList={setDaybookList} />
      </CustomCardView>

      <Table columns={columns} data={dayBookList} />

      <Form name="Daybook"
                            labelCol={{
                                span: 24,
                            }}
                            wrapperCol={{
                                span: 24,
                            }}
                            form={form}
                        >
                            <Row gutter={[12, 12]}>
                                <Col span={24} lg={12}>
                                    <CustomInputNumber precision={2}
                                        label={'Total Credit Amount'}
                                        name={'total_credit'}
                                        placed={'end'}
                                        disabled
                                    />
                                </Col>
                                <Col span={24} lg={12}>
                                    <CustomInputNumber precision={2}
                                        label={'Total Debit Amount'}
                                        name={'total_debit'}
                                        placed={'end'}
                                        disabled
                                    />
                                </Col>
                            </Row>
                        </Form>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1000} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}
