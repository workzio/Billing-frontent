import { Card, Col, Divider, Form, Popover } from "antd"
import React, { Fragment, useEffect, useState } from "react"
import { Select } from "../../../../../Components/Form/Select"
import Input from "../../../../../Components/Form/Input"
import { DeleteOutlined } from "@ant-design/icons"
import { Table } from "../../../../../Components/Table"
import { Row } from "../../../../../Components/Row"
import { PurchaseFormHeader } from "./PurchaseFormHeader"
import Flex from "../../../../../Components/Flex"
import dayjs from 'dayjs';
import { Modal } from '../../../../../Components/Modal'
import { CustomInputNumber } from "../../../../../Components/Form/CustomInputNumber"
import { DeleteButtonWrapper } from "../../../../../Components/Table"
import { PurchaseFormFooter } from "./PurchaseFormFooter"
import Button from "../../../../../Components/Form/Button"
import { TopTitle } from "../../../../../Components/Form/TopTitle"
import { TableInputNumber } from "../../../../../Components/Form/TableInputNumber"
import request from "../../../../../utils/request"
import { setProductCategory } from "../../../Product/action"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"



export const PurchaseEntryPage = ({ setPurchsaeOrder, getSaleorders }) => {

  const [count, setCount] = useState(1);

  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  // ================  PurchaseFormFooter checked ==========
  const [round, setRound] = useState(false);
  const [roundDecimalValue, setRoundDecimalValue] = useState(null);
  const [balance, setBalance] = useState(false);

  // -----------------  Balance Checking ------------
  const [withDecimal, setWithDecimal] = useState(null);
  const [withOutDecimal, setWithOutDecimal] = useState(null);
  const [balanceChangeAmount, setBalanceChangeAmount] = useState(0);
  const [balanceChange, setBalanceChange] = useState(false);

  // ====================  NEW START  ======================
  const [selectedUserData, setSelectedUserData] = useState({});

  const [salesInvoiceNumber, setSalesInvoiceNumber] = useState(0);


  const CatProduct = useSelector((state) => state.product.categoryProductdetails)

  // ==============  Redux  ===================

  useEffect(() => {
    GetCategoryProducts();
    GetInvoiceNumber();

  }, [])


  const GetCategoryProducts = () => {
    request.get('category')
      .then(function (response) {
        setProductCategory(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const GetInvoiceNumber = () => {
    request.get('purchase/last')
      .then(function (response) {
        setSalesInvoiceNumber(response.data?.purchaseNumber)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // ======  Selected Date ========
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'));


  const HandleUserChange = (arg) => {
    setSelectedUserData(arg)
  }

  useEffect(() => {
    form.setFieldsValue({ companyid: selectedUserData.companyid })
    form.setFieldsValue({ phone_number: selectedUserData.contact })
    form.setFieldsValue({ address: selectedUserData.address })
  }, [selectedUserData])

  useEffect(() => {
    form.setFieldsValue({ purchaseNumber: `${salesInvoiceNumber}` })
  }, [salesInvoiceNumber])


  const CategorySelect = CatProduct.map(category => ({ label: category.category_name, value: category.category_name }));

  // ==========  Date Change =======
  const handleDateOnChange = (date) => {
    setSelectedDate(date);
  };

  // ====================  NEW END  ======================

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

  // =========================  Other Functions End  =========================

  const initialData = [
    {
      key: 0,
      category: '',
      product: '',
      product_id: '',
      category_id: '',
      hsn_code: '',
      description: '',
      qty: '',
      shipped_qty: '',
      unit: '',
      unitname: '',
      tax_percentage: '',
      tax_amt: '',
      tax_qty_amt: '',
      price: '',
      price_tot_amt: '',
      tax_include_price: '',
      amount: '',
    },
  ];

  const secondaryData = [
    {
      total_qty: '',
      total_tax: '',
      total_amount: '',
      total_price: '',
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
  const [tableFooterData, setTableFooterData] = useState(footerCalData);


  // +++++++++++++++++++++   Use Effects Start +++++++++++++++++++

  // ------------------  Dynamic Table  --------------------

  useEffect(() => {
    tableData.forEach(record => {
      form.setFieldsValue({ [`category${record.key}`]: record.category });
      form.setFieldsValue({ [`product_id${record.key}`]: record.product_id });
      form.setFieldsValue({ [`category_id${record.key}`]: record.category_id });
      form.setFieldsValue({ [`product${record.key}`]: record.product });
      form.setFieldsValue({ [`hsn_code${record.key}`]: record.hsn_code });
      form.setFieldsValue({ [`qty${record.key}`]: record.qty });
      form.setFieldsValue({ [`shipped_qty${record.key}`]: record.shipped_qty });
      form.setFieldsValue({ [`unit${record.key}`]: record.unit });
      form.setFieldsValue({ [`unitname${record.key}`]: record.unitname });
      form.setFieldsValue({ [`tax_percentage${record.key}`]: record.tax_percentage });
      form.setFieldsValue({ [`tax_qty_amt${record.key}`]: record.tax_qty_amt });
      form.setFieldsValue({ [`tax_amt${record.key}`]: record.tax_amt });
      form.setFieldsValue({ [`price${record.key}`]: record.price });
      form.setFieldsValue({ [`price_tot_amt${record.key}`]: record.price_tot_amt });
      form.setFieldsValue({ [`tax_include_price${record.key}`]: record.tax_include_price });
      form.setFieldsValue({ [`amount${record.key}`]: record.amount });

      if (record.amount <= 0) {
        setBalanceChange(true);
      }
      else {
        setBalanceChange(false);
      }
    });

    form.setFieldsValue({ [`total_qty`]: tableSecondaryData[0].total_qty });
    form.setFieldsValue({ [`total_tax`]: tableSecondaryData[0].total_tax });
    form.setFieldsValue({ [`total_amount`]: tableSecondaryData[0].total_amount });
    form.setFieldsValue({ [`total_price`]: tableSecondaryData[0].total_price });

    form.setFieldsValue({ "roundoff_amount": tableSecondaryData[0].total_amount });
    form.setFieldsValue({ "balance": tableSecondaryData[0].total_amount });



    setWithOutDecimal(tableSecondaryData[0].total_amount);
  }, [tableData])

  // --------------------- Round Off Checked  -----------------
  useEffect(() => {

    const totalAmt = parseFloat(tableSecondaryData[0].total_amount).toFixed(0);
    if (round) {
      if (balance) {
        form.setFieldsValue({ roundoff: roundDecimalValue });
        form.setFieldsValue({ roundoff_amount: totalAmt });
        form.setFieldsValue({ balance: 0 });
        form.setFieldsValue({ received: totalAmt });
        setBalanceChangeAmount(totalAmt);
      }
      else {
        form.setFieldsValue({ roundoff: roundDecimalValue });
        form.setFieldsValue({ roundoff_amount: totalAmt });
        form.setFieldsValue({ balance: totalAmt });
        form.setFieldsValue({ received: 0 });
        setBalanceChangeAmount(0);
      }
    }
    else {
      if (balance) {
        form.setFieldsValue({ roundoff: 0 });
        form.setFieldsValue({ roundoff_amount: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ balance: 0 });
        form.setFieldsValue({ received: tableSecondaryData[0].total_amount });
        setBalanceChangeAmount(tableSecondaryData[0].total_amount);
      }
      else {
        form.setFieldsValue({ roundoff: 0 });
        form.setFieldsValue({ roundoff_amount: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ balance: tableSecondaryData[0].total_amount });
        form.setFieldsValue({ received: 0 });
        setBalanceChangeAmount(0);
      }
    }

  }, [round])

  useEffect(() => {
    const num = tableSecondaryData[0].total_amount;
    const newInteger = parseInt(num);
    const newDecimal = (num - newInteger).toFixed(2).substr(1);
    setRoundDecimalValue(newDecimal);

    const totalAmt = parseFloat(tableSecondaryData[0].total_amount).toFixed(0);

    if (round) {
      form.setFieldsValue({ roundoff: newDecimal });
      form.setFieldsValue({ roundoff_amount: totalAmt });
      form.setFieldsValue({ balance: totalAmt });
    }
  }, [tableData])


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
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (text, record) => {
        return (
          <>
            <Select rules={[
              {
                required: true,
                message: 'This is a required field'
              },
            ]}
              minWidth={'150px'}
              showSearch
              name={`category${record.key}`}
              options={CategorySelect}
              onChange={(value) => handleOnChangeCategory(value, record)}
            />
            <Input name={`category_id${record.key}`} display={'none'} />
          </>
        )
      }
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      render: (text, record) => {
        return (
          <>
            <Select rules={[
              {
                required: true,
                message: 'This is a required field'
              },
            ]}
              minWidth={'150px'}
              showSearch
              name={`product_id${record.key}`}
              options={record.productsOptions || []}
              onChange={(value) => handleOnChangeProduct(value, record)}
            />
            <Input name={`product${record.key}`} display={'none'}/></>

        )
      }
    },
    {
      title: 'HSN Code',
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
      title: 'Unit',
      dataIndex: 'unit',
      render: (text, record) => (
        <>
          <Input
            minWidth={'150px'}
            disabled
            placed={'end'}
            name={`unit${record.key}`}
          />
          <Input name={`unitname${record.key}`} display={'none'} /></>
      )
    },
    {
      title: 'Tax %',
      dataIndex: 'tax_percentage',
      render: (text, record) => (
        <CustomInputNumber precision={0}
          minWidth={'150px'}
          disabled
          placed={'end'}
          name={`tax_percentage${record.key}`}
        />
      )
    },
    {
      title: 'Quantity',
      children: [
        {
          title: 'Shipped',
          dataIndex: 'shipped_qty',
          key: 'shipped_qty',
          render: (text, record) => (
            <TableInputNumber
              minWidth={'150px'}
              style={{ textAlign: 'center' }}
              onChange={(value) => handleOnChangeShippedQuantity(value, record)}
              name={`shipped_qty${record.key}`}
              rules={[
                {
                  required: true,
                  message: 'This is a required field'
                },
              ]} />
          )
        },
        {
          title: 'Billed',
          dataIndex: 'qty',
          key: 'qty',
          render: (text, record) => {
            return (
              <CustomInputNumber precision={0} rules={[
                {
                  required: true,
                  message: 'This is a required field'
                },
              ]}
                type={"text"}
                placed={'end'}
                minWidth={'150px'}
                min={1.00}
                name={`qty${record.key}`}
                onChange={(value) => handleOnChangeQuantity(value, record)}
              />
            )
          }
        },
      ],
    },
    {
      title: 'Price',
      dataIndex: 'price',
      render: (text, record) => (
        <CustomInputNumber precision={2}
          minWidth={'150px'}
          placed={'end'}
          name={`price${record.key}`}
          onChange={(value) => handleOnChangeTaxIncludePrice(value, record)}
        />
      )
    },
    {
      title: 'Price (Incl. of Tax)',
      dataIndex: 'tax_include_price',
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
          disabled
          name={`tax_include_price${record.key}`}
        />
      )
    },
    {
      title: 'Tax Amount',
      dataIndex: 'tax_amt',
      render: (text, record) => (
        <CustomInputNumber precision={2}
          disabled
          minWidth={'150px'}
          placed={'end'}
          name={`tax_amt${record.key}`}
        />
      )
    },
    {
      title: (
        <p>Tax TotalAmount</p>
      ),
      dataIndex: 'tax_qty_amt',
      key: 'tax_qty_amt',
      render: (text, record) => (
        <CustomInputNumber precision={2}
          disabled
          minWidth={'150px'}
          placed={'end'}
          name={`tax_qty_amt${record.key}`}
        />
      )
    },
    {
      title: (
        <p>Amount</p>
      ),
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record) => (
        <>
          <CustomInputNumber precision={2}
            disabled
            minWidth={'150px'}
            placed={'end'}
            name={`price_tot_amt${record.key}`} display={'none'} />
          <CustomInputNumber precision={2}
            disabled
            minWidth={'150px'}
            placed={'end'}
            name={`amount${record.key}`}
          />
        </>

      )
    },
  ]

  // ===============  Table Data End ==================


  // ==================  Table Functions Start ==================

  // ----------------- Add Row Function 

  const AddRow = () => {
    const newData = {
      key: count,
      category: '',
      product_id: '',
      category_id: '',
      product: '',
      itemCode: '',
      hsnCode: '',
      description: '',
      qty: '',
      unit: '',
      tax_percentage: '',
      tax_amt: '',
      tax_qty_amt: '',
      unitname: '',
      price: '',
      price_tot_amt: '',
      tax_include_price: '',
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
        let totalTax = 0;
        let totalAmount = 0;
        let totalPrice = 0;

        newData.forEach(item => {
          if (item.qty !== '' || item.amount !== '' || item.tax_qty_amt !== '' || item.price_tot_amt !== '') {
            totalQuantity += parseFloat(item.qty);
            totalTax += parseFloat(item.tax_qty_amt);
            totalAmount += parseFloat(item.amount);
            totalPrice += parseFloat(item.price_tot_amt);
          }
        });

        // update the total_amount value in the tableSecondaryData array
        setTableSecondaryData([{
          total_qty: totalQuantity.toFixed(2),
          total_tax: totalTax.toFixed(2),
          total_amount: totalAmount.toFixed(2),
          total_price: totalPrice.toFixed(2)
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
      item.tax_qty_amt = record.tax_qty_amt || 0;
      item.qty = record.qty || 0;
      item.price_tot_amt = record.price_tot_amt || 0;
      // ------ Variables 
      let totalQuantity = 0;
      let totalTax = 0;
      let totalAmount = 0;
      let totalPrice = 0;

      newData.forEach(item => {
        if (item.qty !== '' || item.amount !== '' || item.tax_qty_amt !== '' || item.price_tot_amt !== '') {
          totalQuantity += parseFloat(item.qty);
          totalTax += parseFloat(item.tax_qty_amt);
          totalAmount += parseFloat(item.amount);
          totalPrice += parseFloat(item.price_tot_amt);
        }
      });

      // update the total_amount value in the tableSecondaryData array
      setTableSecondaryData([{
        total_qty: totalQuantity.toFixed(2),
        total_tax: totalTax.toFixed(2),
        total_amount: totalAmount.toFixed(2),
        total_price: totalPrice.toFixed(2)
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
      item.price = record.price || 0;




      item.qty = value || 0;
      item.shipped_qty = value || 0;

      TaxIncludePrice(item.price, {
        ...item,
        qty: item.qty,
        shipped_qty: item.shipped_qty,
      })

      CalculateTotal({
        ...item,
        qty: item.qty,
      })

      return newData;
    });
  }

  const TaxIncludePrice = (value, record) => {


    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      item.qty = record.qty || 0;
      item.price = value || 0;
      item.tax_percentage = record.tax_percentage || 0;

      let TaxPrice = item.price * (item.tax_percentage / 100);

      let TaxIncludePrice = item.price + TaxPrice;

      let TaxQtyAmt = TaxPrice * item.qty

      // ------------- Calculate TaxAmount ---------
      let PriceAmt = item.qty * item.price;
      item.price_tot_amt = PriceAmt;

      item.price = item.price;
      item.tax_amt = TaxPrice;

      item.tax_qty_amt = TaxQtyAmt
      item.amount = item.qty * TaxIncludePrice;
      item.tax_include_price = TaxIncludePrice;

      CalculateTotal({
        ...item,
        qty: item.qty,
        price: item.price,
      })

      return newData;
    });
  }

  const HandleCategory = (value, record) => {
    // Find the selected category and update the options for the corresponding product select
    const selectedCategory = CatProduct.find(item => item.category_name === value);
    const selectedProducts = selectedCategory.products.map(product => ({ label: product.productname, value: product.productid }));

    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];
      item.category = value || 0;
      const selectedUser = CatProduct.find(item => item.category_name === value);


      item.category_id = selectedUser.category_id;
      item.product = '';
      item.hsn_code = '';
      item.unit = '';
      item.product_id = '';
      item.tax_percentage = '';
      item.productsOptions = selectedProducts; // Add the new options to the table data
      return newData;
    });
  };

  const HandleShippedQty = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      if (record.qty >= value) {
        item.shipped_qty = record.qty;
      }
      else {
        item.shipped_qty = value;
      }
      return newData;
    });
  };

  const HandleProduct = (value, record) => {
    setTableData(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const item = newData[index];

      const isProductAlreadyAdded = newData.some(
        existingItem =>
          existingItem.product === value &&
          existingItem.category === item.category
      );

      if (isProductAlreadyAdded) {
        toast.error("Product already exists in the table.");
        return newData;
      }

      item.product = value;
      const selectedProduct = CatProduct.find(
        category => category.category_name === item.category
      ).products.find(product => product.productid === value);


      item.product_id = selectedProduct.productid;
      item.hsn_code = selectedProduct.hsn_code;
      item.unit = selectedProduct.unitname;
      item.unitname = selectedProduct.unit_id;
      item.tax_percentage = selectedProduct.tax_percentage;

      return newData;
    });
  };



  // ---------------- 1.TotalQuantity ONCHANGE Function
  const handleOnChangeShippedQuantity = (value, record) => {
    HandleShippedQty(value, record)
  }

  const handleOnChangeQuantity = (value, record) => {
    HandleQty(value, record)
  }

  const handleOnChangeTaxIncludePrice = (value, record) => {
    TaxIncludePrice(value, record)
  }


  const handleOnChangeCategory = (value, record) => {
    HandleCategory(value, record)
  }

  const handleOnChangeProduct = (value, record) => {
    HandleProduct(value, record)
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
    const record = { ...values, purchase_date: selectedDate };


    let result = {
      companyid: record.companyid,
      phone_number: record.phone_number,
      address: record.address,
      purchase_date: record.purchase_date,
      purchaseNumber: record.purchaseNumber,
      invoice_no: record.invoice_no,
      payment_type: record.payment_type,
      description: record.description,
      total_qty: parseInt(record.total_qty),
      total_tax: parseFloat(record.total_tax).toFixed(2),
      total_amount: parseFloat(record.total_amount).toFixed(2),
      total_price: parseFloat(record.total_price).toFixed(2),
      roundoff: parseFloat(record.roundoff) || 0,
      roundoff_amount: parseFloat(record.roundoff_amount).toFixed(2),
      received: 0,
      balance: parseFloat(record.balance).toFixed(2),

      purchaselist: Object.entries(record)
        .filter(([key]) => key.startsWith('category_id'))
        .map(([key, categoryid]) => {
          const index = key.match(/\d+/)[0];

          const productIdKey = `product_id${index}`;
          const hsnKey = `hsn_code${index}`;
          const qtyKey = `qty${index}`;
          const unitKey = `unitname${index}`;
          const shippedQtyKey = `shipped_qty${index}`;
          const priceKey = `price${index}`;
          const amountKey = `amount${index}`;

          const taxPerKey = `tax_percentage${index}`;
          const taxAmtKey = `tax_amt${index}`;
          const taxQtyAmtKey = `tax_qty_amt${index}`;
          const PriceTotAmtKey = `price_tot_amt${index}`;

          const taxIncludePriceKey = `tax_include_price${index}`;

          return {
            categoryid,
            productid: record[productIdKey],
            hsn_code: record[hsnKey],
            qty: record[qtyKey],
            unit_id: record[unitKey],
            shipped_qty: record[shippedQtyKey],

            tax_percentage: record[taxPerKey],

            inc_tax_price: parseFloat(record[taxIncludePriceKey]).toFixed(2),
            tax_amt: parseFloat(record[taxAmtKey]).toFixed(2),
            tax_qty_amount: parseFloat(record[taxQtyAmtKey]).toFixed(2),
            price_tot_amt: parseFloat(record[PriceTotAmtKey]).toFixed(2),

            price: parseFloat(record[priceKey]).toFixed(2),
            amount: parseFloat(record[amountKey]).toFixed(2),
          };
        }),
    };
    PurchsePost(result);
    console.log(result,'hhhhhhh');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const PurchsePost = (values) => {
    request.post('purchase/save', values)
      .then(function (response) {
        if (response.status == 200) {
          toast.success('Successfully Billed ')
          form.resetFields();
          setTableData(initialData);
          setTableSecondaryData(secondaryData);
          setTableFooterData(footerCalData);
          setSelectedUserData({});
          GetInvoiceNumber();
          setRound(false);
        }
        else {

          console.log('Something went Wrong');
        }
      })
      .catch(function (error) {
        console.log(error, 'failedddd');
      });
  }



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
    GetCategoryProducts();
    GetInvoiceNumber();
    form.setFieldsValue({ purchaseNumber: `${salesInvoiceNumber}` })
    setSelectedUserData({})

    setTableData(initialData)
    setTableSecondaryData(secondaryData)
    setTableFooterData(footerCalData)
    setRound(false)
  }
  return (
    <Fragment>
      <Form name="purchase"
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        form={form}
        initialValues={
          {
            purchase_date: dayjs(),
            roundoff: 0,
          }
        }
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >

        <TopTitle Heading={'purchase'} />

        <PurchaseFormHeader setPurchsaeOrder={setPurchsaeOrder} HandleUserChange={HandleUserChange} handleDateOnChange={handleDateOnChange} />

        <div style={{ margin: '20px 0' }}>
          <Table columns={columns.filter(Boolean)} data={tableData} pagination={false} />
          <FooterComponent />
        </div>


        <div style={{ margin: '20px 0' }}>
          <PurchaseFormFooter BalanceOnChange={BalanceOnChange} RoundOffChecked={RoundOffChecked} TotalBalance={TotalBalance} tableSecondaryData={tableSecondaryData} footerCalData={footerCalData} setRoundDecimalValue={setRoundDecimalValue} round={round} />
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