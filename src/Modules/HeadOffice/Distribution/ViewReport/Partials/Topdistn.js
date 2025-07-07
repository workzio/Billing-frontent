import React, { useEffect, useState } from 'react'
import { Row } from '../../../../../Components/Row';
import { Col, Form } from 'antd';
import { Select } from '../../../../../Components/Form/Select';
import Button from '../../../../../Components/Form/Button';
import { ReportTitle } from '../../../../../Components/Styled';
import Input from '../../../../../Components/Form/Input';
import { CustomCardView } from '../../../../../Components/CustomCardView';
import Flex from '../../../../../Components/Flex';
import request from '../../../../../utils/request';
import { toast } from 'react-toastify';
import Bottomdistn from './Bottomdistn';
import { ViewDistContainer } from './ViewDistContainer';

const Topdistn = () => {

  const [distributorList, setDistributorList] = useState([])
  const [salesReport, setSalesReport] = useState([])
  const [disVoucher, setDisVoucher] = useState([])
  const [disReceipt, setDisReceipt] = useState([])
  const [selectedDistributor, setSelectedDistributor] = useState({})
  const [activeTab, setActiveTab] = useState(1)

  const [form] = Form.useForm();

  useEffect(() => {
    getDistributorDetails();
    getSalesList();
    getDisVoucher();
    getDisReceipt();
  }, [])

  const ResetForm = () => {
    CallAllResetFunction();
    form.resetFields();
    setSelectedDistributor({});
  }

  const CallAllResetFunction = () => {
    getSalesList();
    getDisVoucher();
    getDisReceipt();
  }

  const getDistributorDetails = () => {
    request.get('Distribution')
      .then(function (response) {
        setDistributorList(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getSalesList = () => {
    request.get('sales/paidbill')
      .then(function (response) {
        setSalesReport(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getDisVoucher = () => {
    request.get('voucher/distributor')
      .then(function (response) {
        setDisVoucher(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getDisReceipt = () => {
    request.get('receipt/distributor')
      .then(function (response) {
        setDisReceipt(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const DistList = distributorList?.map(user => ({ label: user.name, value: user.name }));

  const DistributorChange = (value) => {
    const selectedUser = distributorList.find(user => user.name === value);
    setSelectedDistributor(selectedUser)
    form.setFieldsValue({ distributorid: selectedUser?.distributorid })
  }

  const onFinish = (values) => {
    GetSalesReport(values);
    searchDistributorReciept(values)
    searchDistributorVoucher(values)

  };

  const GetSalesReport = (values) => {
    request.get(`sales/distributor/${values?.distributorid}`)
      .then(function (response) {
        setSalesReport(response.data?.sales)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const searchDistributorReciept = (values) => {
    request.get(`receipt/distributor/${values?.distributorid}`)
      .then(response => {
        setDisReceipt(response.data)

      })
      .catch(error => console.log(error, 'error'))
  }

  const searchDistributorVoucher = (values) => {
    request.get(`voucher/distributor/${values?.distributorid}`)
      .then(response => {
        setDisVoucher(response.data)

      })
      .catch(error => console.log(error, 'error'))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: '10px 7px' }}>

      <CustomCardView >
        <Form
          name="report"
          labelCol={{
            span: 24,
          }}
          wrapperCol={{
            span: 24,
          }}
          form={form}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off">

          <ReportTitle>Search Distributor Here</ReportTitle>

          <Row gutter={[24, 24]}>
            <Col span={24} md={6}>
            </Col>
            <Col span={24} md={12}>
              <Select showSearch={true} options={DistList} placeholder={'select'} onChange={DistributorChange}
                name={'distributor'}
                rules={[
                  {
                    required: true,
                    message: 'This is a required field'
                  },
                ]} />
              <Input name={'distributorid'} display={'none'} />
            </Col>

            <Flex center gap={'20px'} W_100>
              <Button.Primary htmlType={'submit'} text={'Search'} />
              <Button.Danger text={'Reset'} onClick={() => ResetForm()} />
            </Flex>
          </Row>

        </Form>

        <div style={{ padding: '10px' }}></div>
        <Row gutter={[24, 24]}>
          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12} md={10}>
                <h4>Distributor Name</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedDistributor?.name}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12}>
                <h4>GSTIN / UIN</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedDistributor?.gst_no}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12} md={10}>
                <h4>Code</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedDistributor?.code}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12}>
                <h4>Contact</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedDistributor?.phoneno}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12} md={10}>
                <h4>E - Mail</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedDistributor?.email}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12}>
                <h4>District</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedDistributor?.district}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </CustomCardView>

      <ViewDistContainer setActiveTab={setActiveTab} CallAllResetFunction={CallAllResetFunction} salesReport={salesReport} disVoucher={disVoucher} disReceipt={disReceipt} getSalesList={getSalesList} />

    </div>
  )
}

export default Topdistn