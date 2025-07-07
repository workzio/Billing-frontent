import React, { useEffect, useState } from 'react'
import { Row } from '../../../../../Components/Row';
import { Col, Form } from 'antd';
import { Select } from '../../../../../Components/Form/Select';
import Button from '../../../../../Components/Form/Button';
import { ReportTitle } from '../../../../../Components/Styled';
import Input from '../../../../../Components/Form/Input';
import request from '../../../../../utils/request';
import { toast } from 'react-toastify';
import BottomSection from './BottomSection';
import { CustomCardView } from '../../../../../Components/CustomCardView';
import Flex from '../../../../../Components/Flex';
import { ViewCompanyContainer } from './ViewCompanyContainer';

const TopSection = () => {

  const [companyList, setCompanyList] = useState([])
  const [purchaseData, setPurchaseData] = useState([])
  const [compReciept, setCompReciept] = useState([])
  const [compVoucher, setCompVoucher] = useState([])
  const [selectedCompany, setSelectedCompany] = useState({})

  const [form] = Form.useForm();

  const [activeTab, setActiveTab] = useState(1)

  useEffect(() => {
    getCompanyDetails();
    getPurchaseList();
    getCompanyVoucher();
    getCompanyReciept()
  }, [])

  const ResetForm = () => {
    CallAllResetFunction()
    form.resetFields();
    setSelectedCompany({});
  }

  const CallAllResetFunction = () => {
    getPurchaseList();
    getCompanyVoucher();
    getCompanyReciept()
  }

  const getCompanyDetails = () => {
    request.get('outsource')
      .then(function (response) {
        setCompanyList(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ======  get all company details  =========
  const getPurchaseList = () => {
    request.get('purchase/invoice')
      .then(function (response) {
        setPurchaseData(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const getCompanyVoucher = () => {
    request.get('voucher/company')
      .then(function (response) {
        setCompVoucher(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  const getCompanyReciept = () => {
    request.get('receipt/company')
      .then(function (response) {
        setCompReciept(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ======  get all company details by ID  =========

  const GetPurchaseReportByID = (values) => {
    request.get(`purchase/company/${values?.companyid}`)
      .then(function (response) {
        setPurchaseData(response.data?.purchase)
      })
      .catch(function (error) {
        toast.error("Failed")
        console.log(error);
      });
  }

  const searchCompanyRecieptByID = (value) => {
    request.get(`receipt/company/${value.companyid}`)
      .then(response => {
        setCompReciept(response.data)
      })
      .catch(error => console.log(error, 'error'))
  }

  const searchCompanyVoucherByID = (value) => {
    request.get(`voucher/company/${value.companyid}`)
      .then(response => {
        setCompVoucher(response.data)
      })
      .catch(error => console.log(error, 'error'))
  }


  const CompanyList = companyList?.map(user => ({ label: user.companyname, value: user.companyname }));

  const CompanyChange = (value) => {
    const selectedUser = companyList.find(user => user.companyname === value);
    setSelectedCompany(selectedUser)
    form.setFieldsValue({ companyid: selectedUser?.companyid })
  }

  const onFinish = (values) => {
    GetPurchaseReportByID(values)
    searchCompanyRecieptByID(values)
    searchCompanyVoucherByID(values)
  };



  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ padding: '10px 7px' }}>

      <CustomCardView >
        <Form name="report"
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

          <ReportTitle>Search Company Here</ReportTitle>

          <Row gutter={[24, 24]}>
            <Col span={24} md={6}></Col>
            <Col span={24} md={12}>
              <Select
                showSearch={true}
                options={CompanyList}
                placeholder={'select'}
                onChange={CompanyChange}
                name={'Company'}
                rules={[
                  {
                    required: true,
                    message: 'This is a required field'
                  },
                ]} />
              <Input name={'companyid'} display={'none'} />
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
              <Col span={24} sm={12}>
                <h4>Company Name</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedCompany?.companyname}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12}>
                <h4>Dealer Name</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedCompany?.dealername}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12}>
                <h4>GSTIN / UIN</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedCompany?.gstin}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12}>
                <h4>Code</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedCompany?.code}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12}>
                <h4>Contact</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedCompany?.contact}</h3>
              </Col>
            </Row>
          </Col>

          <Col span={24} md={12}>
            <Row gutter={[12, 12]}>
              <Col span={24} sm={12}>
                <h4>E - Mail</h4>
              </Col>
              <Col span={24} sm={12}>
                <h3>:&nbsp;{selectedCompany?.email}</h3>
              </Col>
            </Row>
          </Col>
        </Row>
      </CustomCardView>



      <ViewCompanyContainer setActiveTab={setActiveTab} CallAllResetFunction={CallAllResetFunction} purchReport={purchaseData} compReciept={compReciept} compVoucher={compVoucher} />
      {/* <BottomSection record={data} /> */}
    </div>
  )
}

export default TopSection