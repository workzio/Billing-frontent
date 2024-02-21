import { Form, Modal, Radio, } from 'antd'
import React, { useEffect, useState } from 'react'
import Flex from '../../../../../Components/Flex';
import Checkbox from '../../../../../Components/Form/Checkbox';
import { CustomDatePicker } from '../../../../../Components/Form/CustomDatePicker';
import { Table } from '../../../../../Components/Table';
import Label from '../../../../../Components/Form/Label';
import request from '../../../../../utils/request';


const Attendancetable = () => {

  const [checked, setChecked] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const handleActivate = (record) => {
    setChecked(!checked);
    const filtered = dataSource.map((prop) => {
      if (prop.key === record.key) {
        prop.status = !prop.status
        prop.attendance = !prop.attendance
        return prop
      } return prop
    })
    
    setDataSource(filtered)
  }


  const [value, setValue] = useState('Full');


  useEffect(() => {
    getMemberList()
  }, [])

  const getMemberList = () => {
    request.get('Distribution',)
      .then(function (response) {
        setDataSource(response.data)
      })

      .catch(function (error) {
        console.log(error);
      });
  }
  

  const onChange = (e, record) => {
    setDataSource(prevState => {
      const newData = [...prevState];
      const index = newData.findIndex(item => record.key === item.key);
      const updatedIndex = index + 0;
      const item = newData[updatedIndex]; 
      newData[index] = { ...item, section: e.target.value };
      return newData;
    });
  };


  const handleClick = (event) => {
    if (event.target.value === value) {
      setValue("");
    } else {
      setValue(event.target.value);
    }

  }
  
  const columns = [
    {
      title: 'Mem Id',
      dataIndex: 'mem_id',
    },
    {
      title: 'Name',
      dataIndex: 'name',

    },
    {
      title: 'Designation',
      dataIndex: 'designation',
    },
    {
      title: 'Status',
      render: (status) => {

        return (
          <>
            {status ? <h3 style={{ color: 'Red' }}>Absent</h3> : <h3 style={{ color: 'Green' }}> Present</h3>}

          </>
        )
      }
    },
    {
      title: 'Attendance',
      children: [
        {
          title: 'Present',
          dataIndex: 'present',
          render: (_, record) => {
            return (
                <Checkbox name={'att_status'} onClick={() => {handleActivate(record);}} />
            )
          }
        },
        {
          title: 'Section',
          dataIndex: 'section',
          key: 'attendance',
          render: (_, record, text) => {
            return (
              <>
                <Radio.Group onChange={(e) => onChange(e, record)} disabled={record.attendance} defaultChecked={text} value={record.section}>
                  <Radio onClick={handleClick} value={'Half'}>Half</Radio>
                  <Radio onClick={handleClick} value={'Full'}>Full</Radio>
                </Radio.Group>


              </>
            )

          }
        },
      ]

    },
  
  ]
  const isRowDisabled = (row) => {
    return setDataSource.includes(row.id);
  }
  return (
    <>
      <Flex spcPading flexEnd centerVertically>
        <Label>Date :&nbsp;&nbsp;</Label>
        <CustomDatePicker width={200} />
      </Flex><br />
      <Form>
        <Table columns={columns} data={dataSource} dataSource={(row) => isRowDisabled(row) ? 'disabled-row' : ''} />
      </Form>
    </>
  )
}

export default Attendancetable
