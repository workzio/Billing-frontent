import { DeleteOutlined, EditOutlined } from '@ant-design/icons'
import { Form, Modal } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import Checkbox from '../../../../../Components/Form/Checkbox';
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker';
import { Table } from '../../../../../Components/Table';
import Label from '../../../../../Components/Form/Label';
import request from '../../../../../utils/request';
import Input from '../../../../../Components/Form/Input';
import Radio from '../../../../../Components/Form/RadioButton';
import dayjs from 'dayjs'
import { toast } from 'react-toastify';


const Attendancetable = () => {

  const [dataSource, setDataSource] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedValue, setSelectedValue] = useState([]);
  const [selectedDate, setSelectedDate] = useState(dayjs().format('YYYY-MM-DD'))

  const [form] = Form.useForm();

  const handleActivate = (record) => {

    if (selectedRows.includes(record.memberid)) {
      // If the record.memberid is in the selectedRows array, remove it using filter
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((item) => item !== record.memberid)
      );

      // If the record.memberid is in the selectedValue array, remove it using filter
      setSelectedValue((prevSelectedValue) =>
        prevSelectedValue.filter((item) => item.id !== record.memberid)
      );

      const fieldName = `section${record.memberid}`;
      form.setFieldsValue({ [fieldName]: '' });

    } else {
      // If the record.memberid is not in the selectedRows array, add it using spread operator
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, record.memberid]);

      // If the record.memberid is not in the selectedValue array, add it with the section value
      setSelectedValue((prevSelectedValue) => [
        ...prevSelectedValue,
        { id: record.memberid, section: "" }, // You can set the initial section value here.
      ]);
    }
  };

  useEffect(() => {
    getMemberList()
  }, [])

  const getMemberList = () => {
    request.get('rolelist',)
      .then(function (response) {
        setDataSource(response.data)
        console.log(response.data, 'dist');
      })

      .catch(function (error) {
        console.log(error);
      });
  }

  const options = [
    {
      label: 'Half',
      value: 'Half',
    },
    {
      label: 'Full',
      value: 'Full',
    },
  ];

  const handleRadioChange = (e, record) => {
    console.log(e, record, 'kkkkk');

    const selectedItemId = record.memberid;
    const selectedSection = e.target.value;

    // Check if the selected id and section combination already exists in the array
    const existingIndex = selectedValue.findIndex(
      (item) => item.id === selectedItemId && item.section === selectedSection
    );

    if (existingIndex !== -1) {
      // If the combination exists, do nothing as it is already selected
      return;
    }

    // Check if the selected id exists in the array but with a different section
    const sameIdIndex = selectedValue.findIndex((item) => item.id === selectedItemId);

    if (sameIdIndex !== -1) {
      // If the same id exists, update the section for that id
      setSelectedValue((prevSelectedValue) =>
        prevSelectedValue.map((item, index) =>
          index === sameIdIndex ? { ...item, section: selectedSection } : item
        )
      );
    } else {
      // If the id does not exist, add the new selected value to the array
      setSelectedValue((prevSelectedValue) => [
        ...prevSelectedValue,
        { id: selectedItemId, section: selectedSection },
      ]);
    }
  };

  useEffect(() => {
    dataSource.forEach(record => {
      form.setFieldsValue({ [`memberid${record.memberid}`]: record.memberid });
      form.setFieldsValue({ [`att_status${record.memberid}`]: record.att_status });
      form.setFieldsValue({ [`section${record.memberid}`]: record.section });
    });
  }, [dataSource])

  const columns = [
    {
      title: 'Mem Id',
      dataIndex: 'memberid',
      render: (text, record) => {
        return (
          <>
            <span>{text}</span>
            <Input name={`memberid${record.memberid}`} display={'none'} />
          </>
        )
      }
    },
    {
      title: 'Name',
      dataIndex: 'name',

    },
    {
      title: 'Gender',
      dataIndex: 'gender',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Status',
      render: (_, record) => {
        const isRowSelected = selectedRows.includes(record.memberid);
        return (
          <Fragment>
            {isRowSelected ? <h3 style={{ color: 'Green' }}> Present</h3> : <h3 style={{ color: 'Red' }}>Absent</h3>}
          </Fragment>
        )
      }
    },
    {
      title: 'Attendance',
      children: [
        {
          title: 'Present',
          render: (_, record) => {
            const isRowSelected = selectedRows.includes(record.memberid);

            console.log(isRowSelected, 'isRowSelected');
            return (
              <Checkbox
                name={`att_status${record.memberid}`}
                checked={isRowSelected}
                onChange={() => handleActivate(record)}
              />
            );
          }
        },
        {
          title: 'Section',
          render: (_, record) => {
            const isRowSelected = selectedRows.includes(record.memberid);

            return (
              <Fragment>
                {
                  isRowSelected ? (
                    <Radio
                      name={`section${record.memberid}`}
                      value={isRowSelected}
                      rules={[
                        {
                          required: true,
                          message: 'Please select Section !',
                        }
                      ]}
                      onChange={(e) => handleRadioChange(e, record)}
                      options={options} />
                  ) : (
                    <Radio name={`section${record.memberid}`} value={''} disabled={!isRowSelected} options={options} />
                  )
                }
              </Fragment>
            )
          }
        },
      ]
    },
  ]

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const onFinish = (values) => {
    console.log(values);
    let result = {
      attendanceDate: selectedDate,
      attendance: Object.entries(values)
        .filter(([key]) => key.startsWith('memberid'))
        .map(([key, memberid]) => {
          const index = key.match(/\d+/)[0];
          const attstatuskey = `att_status${index}`;
          const sectionkey = `section${index}`;
          return {
            memberid,
            attstatus: values[attstatuskey] !== undefined ? values[attstatuskey] : false,
            section: values[sectionkey] !== undefined ? values[sectionkey] : '',

          };
        }),
    };

    PostAttendance(result);

    console.log(result, 'result');
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const PostAttendance = (value) => {
    request.post('attendance/save', value)
      .then(response => {
        toast.success('Transaction Successs!')
        form.resetFields()
      })
      .catch(error => console.log(error, 'error'))
  }

  return (
    <Form
      form={form}
      name="attendance"
      labelCol={{
        span: 24,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        date: selectedDate,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off">

      <Flex spcPading flexEnd centerVertically>
        <Label>Date :&nbsp;&nbsp;</Label>
        <Input name={'date'} disabled={'true'} />
        {/* <CustomDatePicker width={200} onChange={handleDateChange} name={'date'} disabled={'true'}/> */}
      </Flex><br />

      <Table columns={columns} data={dataSource} />

      <Flex spaceEvenly style={{ margin: '20px' }} gap={'20px'}>
        <Button.Primary htmlType="submit" text={'Save'} />
      </Flex>
    </Form>
  )
}

export default Attendancetable
