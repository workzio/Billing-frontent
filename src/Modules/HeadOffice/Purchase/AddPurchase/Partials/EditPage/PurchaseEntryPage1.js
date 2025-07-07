import { Card, Col, Form } from "antd"
import React, { Fragment, useEffect, useState } from "react"
import { DeleteOutlined } from "@ant-design/icons"
import dayjs from 'dayjs';
import Flex from "../../../../../Components/Flex";
import { DeleteButtonWrapper, Table } from "../../../../../Components/Table";
import Button from "../../../../../Components/Form/Button";
import { Select } from "../../../../../Components/Form/Select";
import Input from "../../../../../Components/Form/Input";
import { CustomInputNumber } from "../../../../../Components/Form/CustomInputNumber";
import OutSourceData from './Data'
import { Row } from "../../../../../Components/Row";
import { Modal } from "../../../../../Components/Modal";
import { PurchaseFormHeader } from "./PurchaseFormHeader";
import { PurchasrFormFooter } from "./PurchaseFormFooter1";
import { TopTitle } from "../../../../../Components/Form/TopTitle";


export const PurchaseEntryPage = ({ setSaleorder, selectedDate }) => {

  const [count, setCount] = useState(1);

  const [state, setState] = useState(false)

  const [files, setFiles] = useState(null)

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ================  SalesFormFooter checked ==========
  const [round, setRound] = useState(false);
  const [roundDecimalValue, setRoundDecimalValue] = useState(null);
  const [balance, setBalance] = useState(false);

  // -----------------  Balance Checking ------------
  const [withDecimal, setWithDecimal] = useState(null);
  const [withOutDecimal, setWithOutDecimal] = useState(null);
  const [balanceChangeAmount, setBalanceChangeAmount] = useState(0);
  const [balanceChange, setBalanceChange] = useState(false);



 
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const [form] = Form.useForm();


  // =========================  Modal Content Start  ===========================

  // -----------------------  RoundOff Checked Function ----------
  const RoundOffChecked = (value) => {
    setWithDecimal(tableSecondaryData[0].total_amount - roundDecimalValue);
    setRound(value)
  }

  const TotalBalance = (value) => {
    setBalance(value)
    setWithDecimal(tableSecondaryData[0].total_amount - roundDecimalValue);
    setWithOutDecimal(tableSecondaryData[0].total_amount)
  }

  // =========================  Modal Content End  ===========================

  // =========================  Other Functions start  =========================


  // =========================  Other Functions End  =========================

  const initialData = [
    {
      key: 0,
      product: '',
      hsn_code: '',
      description: '',
      qty: '',
      unit: '',
      price: '',
      discount_percentage: '',
      discount_amt: '',
      tax_percentage: '',
      tax_amt: '',
      amount: '',
    },
  ];

  const secondaryData = [
    {
      total_qty: '',
      total_discount: '',
      total_tax: '',
      total_amount: '',
    },
  ];

  const footerCalData = [
    {
      roundoff: '',
      total_amount: '',
      total_rowamount: '',
      received: '',
      balance: '',
    },
  ];


  const [tableData, setTableData] = useState(initialData);
  const [tableSecondaryData, setTableSecondaryData] = useState(secondaryData);

  // +++++++++++++++++++++   Use Effects Start +++++++++++++++++++

  // ------------------  Dynamic Table  --------------------

  useEffect(() => {
    tableData.forEach(record => {
      form.setFieldsValue({ [`product${record.key}`]: record.product });
      form.setFieldsValue({ [`hsn_code${record.key}`]: record.hsn_code });
      form.setFieldsValue({ [`qty${record.key}`]: record.qty });
      form.setFieldsValue({ [`unit${record.key}`]: record.unit });
      form.setFieldsValue({ [`price${record.key}`]: record.price });
      form.setFieldsValue({ [`discount_percentage${record.key}`]: record.discount_percentage });
      form.setFieldsValue({ [`discount_amt${record.key}`]: record.discount_amt });
      form.setFieldsValue({ [`tax_percentage${record.key}`]: record.tax_percentage });
      form.setFieldsValue({ [`tax_amt${record.key}`]: record.tax_amt });
      form.setFieldsValue({ [`amount${record.key}`]: record.amount });
    });

    form.setFieldsValue({ [`total_qty`]: tableSecondaryData[0].total_qty });
    form.setFieldsValue({ [`total_discount`]: tableSecondaryData[0].total_discount });
    form.setFieldsValue({ [`total_tax`]: tableSecondaryData[0].total_tax });
    form.setFieldsValue({ [`total_amount`]: tableSecondaryData[0].total_amount });

    form.setFieldsValue({ "roundoff_amount": tableSecondaryData[0].total_amount });
    form.setFieldsValue({ "balance": tableSecondaryData[0].total_amount });

    setWithOutDecimal(tableSecondaryData[0].total_amount);
  }, [tableData])

  // --------------------- Round Off Checked  -----------------
  useEffect(() => {
    const totalAmt = tableSecondaryData[0].total_amount - roundDecimalValue;
    if (round) {
      if (balance) {
        form.setFieldsValue({ round_off: roundDecimalValue });
        form.setFieldsValue({ roundoff_amount: totalAmt });
        form.setFieldsValue({ balance: 0 });
        form.setFieldsValue({ received: totalAmt });
        setBalanceChangeAmount(totalAmt);
      }
      else {
        form.setFieldsValue({ round_off: roundDecimalValue });
        form.setFieldsValue({ roundoff_amount: totalAmt });
        form.setFieldsValue({ balance: totalAmt });
        form.setFieldsValue({ received: 0 });
        setBalanceChangeAmount(0);
      }
    }
    else {
      if (balance) {
        form.setFieldsValue({ round_off: '' });
        form.setFieldsValue({ roundoff_amount: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ balance: 0 });
        form.setFieldsValue({ received: tableSecondaryData[0].total_amount });
        setBalanceChangeAmount(tableSecondaryData[0].total_amount);
      }
      else {
        form.setFieldsValue({ round_off: '' });
        form.setFieldsValue({ roundoff_amount: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ balance: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ received: 0 });
        setBalanceChangeAmount(0);
      }
    }

  }, [round])

  const BalanceOnChange = (value) => {
    setBalanceChangeAmount(value)
  }

  useEffect(() => {
    if (round) {
      if (balance) {
        form.setFieldsValue({ received: withDecimal });
        form.setFieldsValue({ balance: 0 });
        setBalanceChangeAmount(withDecimal);
      }
      else {
        form.setFieldsValue({ received: 0 });
        form.setFieldsValue({ balance: withDecimal });
        setBalanceChangeAmount(0);

      }
    }
    else {
      if (balance) {
        form.setFieldsValue({ received: withOutDecimal });
        form.setFieldsValue({ balance: 0 });
        setBalanceChangeAmount(withOutDecimal);
      }
      else {
        form.setFieldsValue({ received: 0 });
        form.setFieldsValue({ balance: withOutDecimal });
        setBalanceChangeAmount(0);
      }
    }
  }, [balance])

  useEffect(() => {

    let fizedAmount = 0;

    if (round) {
      fizedAmount = withDecimal;

      if (balance) {
        form.setFieldsValue({ received: withDecimal });
        form.setFieldsValue({ balance: 0 });
        setBalanceChange(false);
      }
      else {
        // ===
        let setAmt = balanceChangeAmount;
        let balSetAmt = withDecimal - setAmt;

        if (balSetAmt < 0) {
          setBalanceChange(true);
        }
        else {
          setBalanceChange(false);
        }
        form.setFieldsValue({ received: setAmt });
        form.setFieldsValue({ balance: balSetAmt });
      }
    }
    else {
      fizedAmount = withOutDecimal;
      if (balance) {
        form.setFieldsValue({ received: withOutDecimal });
        form.setFieldsValue({ balance: 0 });
        setBalanceChange(false);
      }
      else {
        // ===
        let setAmt = balanceChangeAmount;
        let balSetAmt = withOutDecimal - setAmt;

        if (balSetAmt < 0) {
          setBalanceChange(true);
        }
        else {
          setBalanceChange(false);
        }

        form.setFieldsValue({ received: setAmt });
        form.setFieldsValue({ balance: balSetAmt });
      }
    }

  }, [balanceChangeAmount])




  // +++++++++++++++++++++   Use Effects End +++++++++++++++++++
  // ===============  Hidden Table Data End ==================

  // ===============  Table Data Start ==================

  const columns = [
    {
      title: '#',
      render: (text, record, index) => {

        return (
          (
            <Flex alignCenter gap={'20px'} style={{ alignItems: 'center' }}>
              <h4>{index + 1}</h4>
              <DeleteButtonWrapper>
                <Button
                  style={{
                    display: 'flex',
                    padding: '10px',
                    height: 'auto',
                    fontSize: '16px',
                  }}
                  htmlType="button"
                  danger
                  onClick={() => onDelete(record.key)}
                >
                  <DeleteOutlined />
                </Button>
              </DeleteButtonWrapper>
            </Flex>
          )
        );
      },
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, record) => {
        return (
          <Select rules={[
            {
              required: true,
              message: 'This is a required field'
            },
          ]}
            minWidth={'150px'}
            showSearch
            name={`product${record.key}`}
            options={OutSourceData.CategoryData}
            onChange={(value) => handleOnChangeProduct(value, record)}
          />
        )
      }
    },
    {
      title: 'HSN/SAC Code',
      dataIndex: 'hsn_code',
      key: 'hsn_code',
      render: (text, record) => {
        return (
          <Input
            minWidth={'150px'}
            name={`hsn_code${record.key}`}
            disabled
          />
        )
      }
    },
    {
      title: 'Qty',
      dataIndex: 'qty',
      key: 'qty',
      render: (text, record) => {
        return (
          <CustomInputNumber precision={2} rules={[
            {
              required: true,
              message: 'This is a required field'
            },
          ]}
            type={"text"}
            step={"0.01"}
            placed={'end'}
            minWidth={'150px'}
            min={1.00}
            name={`qty${record.key}`}
            onChange={(value) => handleOnChangeQuantity(value, record)}
          />
        )
      }
    },
    {
      title: 'Price/Unit',
      dataIndex: 'price',
      render: (text, record) => (
        <CustomInputNumber precision={2} rules={[
          {
            required: true,
            message: 'This is a required field'
          },
        ]}
          minWidth={'150px'}
          min={1.00}
          placed={'end'}
          name={`price${record.key}`}
          onChange={(value) => handleOnChangePrice(value, record)}
        />
      )
    },
    {
      title: 'Discount',
      children: [
        {
          title: '%',
          dataIndex: 'discount_percentage',
          key: 'discount_percentage',
          render: (text, record) => (
            <CustomInputNumber precision={2}
              minWidth={'150px'}
              placed={'end'}
              name={`discount_percentage${record.key}`}
              min={0.00}
              max={100.00}
              onChange={(value) => handleonChangeDiscount(value, record)}
            />
          )
        },
        {
          title: 'Amount',
          dataIndex: 'discount_amt',
          key: 'discount_amt',
          render: (text, record) => (
            <CustomInputNumber precision={2}
              minWidth={'150px'}
              placed={'end'}
              name={`discount_amt${record.key}`}
              disabled
            />
          )
        },
      ],
    },
    {
      title: 'Tax',
      children: [
        {
          title: 'GST %',
          dataIndex: 'tax_percentage',
          key: 'tax_percentage',
          render: (text, record) => (
            <CustomInputNumber
              minWidth={'150px'}
              placed={'end'}
              name={`tax_percentage${record.key}`}
              min={1}
              max={100}
              precision={0}
              rules={[
                {
                  required: true,
                  message: 'This is a required field'
                },
              ]}
              onChange={(value) => handleOnChangeTax(value, record)}
            />
          )
        },
        {
          title: 'Amount',
          dataIndex: 'tax_amt',
          key: 'tax_amt',
          render: (text, record) => (
            <CustomInputNumber
              minWidth={'150px'}
              disabled
              placed={'end'}
              name={`tax_amt${record.key}`}
            />
          )
        },
      ],
    },
    {
      title: (
        <p>Amount</p>
      ),
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <CustomInputNumber precision={2}
          disabled
          minWidth={'150px'}
          placed={'end'}
          name={`amount${record.key}`}
        />
      )
    },
  ]

  // ===============  Table Data End ==================


  // ==================  Table Functions Start ==================

  // ----------------- Add Row Function 

  const AddRow = () => {
    const newData = {
      key: count,
      product: '',
      itemCode: '',
      hsnCode: '',
      description: '',
      qty: '',
      unit: '',
      price: '',
      discount_percentage: '',
      discount_amt: '',
      tax_percentage: '',
      tax_amt: '',
      amount: '',
    };
    setTableData(pre => {
      return [...pre, newData]
    })
    setCount(count + 1);
  }

  // -----------------------  Delete Row Function

  const onDelete = (key) => {
    if (tableData.length > 1) {
      setTableData(prevState => {
        const newData = prevState.filter(item => item.key !== key);

        // ------ Variables 
        let totalQuantity = 0;
        let totalDiscount = 0;
        let totalTax = 0;
        let totalAmount = 0;

        newData.forEach(item => {
          if (item.qty !== '' || item.amount !== '' || item.discount_amt !== '' || item.tax_amt !== '') {
            totalQuantity += parseFloat(item.qty);
            totalDiscount += parseFloat(item.discount_amt);
            totalTax += parseFloat(item.tax_amt);
            totalAmount += parseFloat(item.amount);
          }
        });

        // update the total_amount value in the tableSecondaryData array
        setTableSecondaryData([{
          total_qty: totalQuantity.toFixed(2),
          total_discount: totalDiscount.toFixed(2),
          total_tax: totalTax.toFixed(2),
          total_amount: totalAmount.toFixed(2)
        }]);

        // setTableFooterData

        return newData;
      });
    } else {
      console.log(`only ${tableData.length} is available`)
    }
  };

  // ========================   Total Calculating Functions
  // ----------------- 1. Calculate TotalAmount 

  const CalculateTotal = (record) => {

    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.amount = record.amount || 0;
      item.tax_amt = record.tax_amt || 0;
      item.qty = record.qty || 0;
      item.discount_amt = record.discount_amt || 0;

      // ------ Variables 
      let totalQuantity = 0;
      let totalDiscount = 0;
      let totalTax = 0;
      let totalAmount = 0;

      newData.forEach(item => {
        if (item.qty !== '' || item.amount !== '' || item.discount_amt !== '' || item.tax_amt !== '') {
          totalQuantity += parseFloat(item.qty);
          totalDiscount += parseFloat(item.discount_amt);
          totalTax += parseFloat(item.tax_amt);
          totalAmount += parseFloat(item.amount);
        }
      });

      // update the total_amount value in the tableSecondaryData array
      setTableSecondaryData([{
        total_qty: totalQuantity.toFixed(2),
        total_discount: totalDiscount.toFixed(2),
        total_tax: totalTax.toFixed(2),
        total_amount: totalAmount.toFixed(2)
      }]);

      return newData;
    })
  };

  // ============  OnChange Functions  ==============

  const HandleQty = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.qty = value || 0;
      item.price = record.price || 0;
      item.discount_percentage = record.discount_percentage;

      let CalAmount = 0;

      if (item.discount_percentage != 0) {
        const Amt = calculateAmount(item);
        item.discount_amt = (Amt * item.discount_percentage) / 100;
        CalAmount = Amt - item.discount_amt;
      } else {
        CalAmount = calculateAmount(item);
      }

      item.amount = CalAmount;

      HandlePrice(item.price, {
        ...item,
        qty: item.qty,
        amount: CalAmount,
        price: item.price,
      })

      CalculateTotal({
        ...item,
        qty: item.qty,
        amount: CalAmount,
        price: item.price,
      })

      HandleTax(item.tax_percentage, {
        ...item,
        qty: item.qty,
        amount: CalAmount,
        price: item.price,
      })

      return newData;
    });
  }

  const HandlePrice = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      item.qty = record.qty || 0;
      item.price = value || 0;
      item.discount_percentage = record.discount_percentage;

      let CalAmount = 0;

      if (item.discount_percentage != 0) {
        const Amt = calculateAmount(item);
        item.discount_amt = (Amt * item.discount_percentage) / 100;
        CalAmount = Amt - item.discount_amt;
      } else {
        CalAmount = calculateAmount(item);
      }
      item.amount = CalAmount;

      CalculateTotal({
        ...item,
        qty: item.qty,
        price: item.price,
        amount: CalAmount,
      })

      HandleTax(item.tax_percentage, {
        ...item,
        qty: item.qty,
        amount: CalAmount,
        price: item.price,
      })

      return newData;
    });
  }

  const HandleDiscount = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      const DiscountPercentage = value || 0;
      const TaxPercentage = record.tax_percentage || 0;


      let Amt = 0;

      if (TaxPercentage != 0) {
        if (DiscountPercentage != 0) {
          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;

          const taxAmt = (ApplyDiscount * TaxPercentage) / 100;
          const ApplyTax = ApplyDiscount + taxAmt

          item.discount_percentage = DiscountPercentage;
          item.discount_amt = DisMinus;
          item.tax_percentage = TaxPercentage;
          item.tax_amt = taxAmt;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            discount_amt: item.discount_amt,
            amount: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          const TaxPlus = (OriginalAmount * TaxPercentage) / 100;

          const ApplyTax = OriginalAmount + TaxPlus;

          item.tax_percentage = TaxPercentage;
          item.tax_amt = TaxPlus;
          item.discount_amt = 0;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            discount_amt: item.discount_amt,
            amount: Amt,
          })
        }
      }
      else {
        if (DiscountPercentage != 0) {

          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;
          item.discount_percentage = DiscountPercentage;
          item.discount_amt = DisMinus;
          item.discount_percentage = 0;
          Amt = ApplyDiscount;

          CalculateTotal({
            ...item,
            discount_amt: item.discount_amt,
            amount: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          item.discount_amt = 0;

          Amt = OriginalAmount;

          CalculateTotal({
            ...item,
            discount_amt: item.discount_amt,
            amount: Amt,
          })
        }
      }

      item.amount = Amt;
      item.discount_percentage = DiscountPercentage;

      return newData;
    })
  }

  const HandleProduct = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.product = value;

      return newData;
    });
  }

  const HandleTax = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      const DiscountPercentage = record.discount_percentage || 0;
      const TaxPercentage = value || 0;

      let Amt = 0;

      if (TaxPercentage != 0) {
        if (DiscountPercentage != 0) {
          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;

          const taxAmt = (ApplyDiscount * TaxPercentage) / 100;
          const ApplyTax = ApplyDiscount + taxAmt

          item.discount_percentage = DiscountPercentage;
          item.discount_amt = DisMinus;
          item.tax_percentage = TaxPercentage;
          item.tax_amt = taxAmt;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            amount: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          const TaxPlus = (OriginalAmount * TaxPercentage) / 100;

          const ApplyTax = OriginalAmount + TaxPlus;

          item.tax_percentage = TaxPercentage;
          item.tax_amt = TaxPlus;
          Amt = ApplyTax;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            amount: Amt,
          })
        }
      }
      else {
        if (DiscountPercentage != 0) {

          const OriginalAmount = calculateAmount(item);
          const DisMinus = (OriginalAmount * DiscountPercentage) / 100;

          const ApplyDiscount = OriginalAmount - DisMinus;
          item.discount_percentage = DiscountPercentage;
          item.discount_amt = DisMinus;
          item.tax_amt = 0;
          Amt = ApplyDiscount;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            amount: Amt,
          })
        }
        else {
          const OriginalAmount = calculateAmount(item);
          item.tax_amt = 0;

          Amt = OriginalAmount;

          CalculateTotal({
            ...item,
            tax_amt: item.tax_amt,
            amount: Amt,
          })
        }
      }

      item.amount = Amt;
      item.tax_percentage = TaxPercentage;

      return newData;
    })
  }

  // ---------------- 1.TotalQuantity ONCHANGE Function
  const handleOnChangeQuantity = (value, record) => {
    HandleQty(value, record)
  }

  const handleOnChangePrice = (value, record) => {
    HandlePrice(value, record)
  }

  const handleonChangeDiscount = (value, record) => {
    HandleDiscount(value, record)
  }

  const handleOnChangeProduct = (value, record) => {
    HandleProduct(value, record)
  }

  const handleOnChangeTax = (value, record) => {
    HandleTax(value, record)
  }


  // -------------- Handle Total Row Amount  --------------
  const calculateAmount = (record) => {
    const qty = parseFloat(record.qty) || 0;
    const price = parseFloat(record.price) || 0;
    return qty * price;
  }

  //  ======================  Other Functions =========

  // ====================  On Finish Function ============

  const onFinish = (values) => {
    const record = { ...values, selected_date: selectedDate };
    setSaleorder(record)


    var val = ''
    if (state === false) {
      val = 'credit'
    }
    else (
      val = 'cash'
    )

    const my_arr = []

    for (var i = 1; i <= tableData.length; i++) {
      const FilteredData = Object.fromEntries(Object.entries(values).filter(([key]) => key.includes(i)));

      const item = FilteredData[`item${i}`];
      const qty = FilteredData[`qty${i}`];
      const price = FilteredData[`price${i}`];
      const discount_percentage = FilteredData[`discount_percentage${i}`];
      const discount_amt = FilteredData[`discount_amt${i}`];
      const tax_percentage = FilteredData[`tax_percentage${i}`];
      const tax_amt = FilteredData[`tax_amt${i}`];

      const unit = FilteredData[`unit${i}`];

      const my_obj = {
        item: item,
        qty: qty,
        price: price,
        unit: unit,
        discount_percentage: discount_percentage,
        discount_amt: discount_amt,
        tax_percentage: tax_percentage,
        tax_amt: tax_amt,
      }
      my_arr.push(my_obj)
    }

   
    setFiles(null)
    const reducedarr = [tableData[0]];
    setTableData(reducedarr)

  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  // ==============  Add Row Component  ================

  const FooterComponent = () => {
    return (
      <div style={{ background: 'var(--light-color)', padding: '20px' }}>
        <Row>
          <Col lg={4} sm={12} span={24}><Button type="primary" style={{
            fontSize: '1rem',
            height: 'auto',
            fontFamily: 'Poppins',
            fontWeight: 500,
            letterSpacing: '1px',
          }}
            htmlType="button"
            onClick={AddRow}>
            Add Row
          </Button>
          </Col>
        </Row>
      </div >
    )
  }

  // ==================  Table  ==================
  const onRest = () => {
    form.resetFields();
  }
  return (
    <Fragment>
      <Form name="sales"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        form={form}
        initialValues={
          {
            invoice_date: dayjs()
          }
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed} >

        <TopTitle Heading={'Purchase'} />

        <PurchaseFormHeader setSaleorder={setSaleorder} />

        <div style={{ margin: '20px 0' }}>
          <Table columns={columns.filter(Boolean)} data={tableData} pagination={false} />
          <FooterComponent />
        </div>


        <div style={{ margin: '20px 0' }}>
          <PurchasrFormFooter BalanceOnChange={BalanceOnChange} RoundOffChecked={RoundOffChecked} TotalBalance={TotalBalance} tableSecondaryData={tableSecondaryData} footerCalData={footerCalData} setRoundDecimalValue={setRoundDecimalValue} round={round} />
        </div>

        <Card>
          <Flex flexEnd gap={'10px'}>
            <Button.Primary text={'Submit'} htmlType="submit" disabled={balanceChange} />
            <Button.Danger text={'Cancel'} onClick={onRest} htmlType="cancel" />
          </Flex>
        </Card>
      </Form>

      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={500} modalTitle={modalTitle} modalContent={modalContent} />
    </Fragment>
  )
}