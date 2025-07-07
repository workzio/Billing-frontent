import React, { useState } from 'react'
import { Cards, OverScroller, Topdesgn } from './Style';
import { PlusCircleOutlined } from '@ant-design/icons';
import { Select } from '../../../../../../Components/Form/Select';
import Flex from '../../../../../../Components/Flex';
import Button from '../../../../../../Components/Form/Button';
import { Image } from 'antd';
import { FcBusinessman } from 'react-icons/fc';
import { Modal } from '../../../../../../Components/Modal';
import { AddPurchase } from '../../../AddPurchase';
import Reporticon from '../../../../../../Assets/Images/reportbox.png'

const SideSection = () => {
  // ======  Modal Open ========
  const [isModalOpen, setIsModalOpen] = useState(false);

  // ======  Modal Title and Content ========
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onViewRow = () => {
    setModalTitle("Add Purchase");
    setModalContent(<AddPurchase />);
    showModal();
  }
  const Selectsdata = [
    {
      label: 'Demo',
      dataIntex: 'demo',
    },
  ]
  const Datasection = [
    {
      key: '1',
      name: 'Saranya Details',
    },
    {
      key: '2',
      name: 'Naveen Details',
    },
    {
      key: '3',
      name: 'Devi Details',
    },
    {
      key: '4',
      name: 'Bala Details',
    },
    {
      key: '5',
      name: 'Naveen Details',
    },
    {
      key: '6',
      name: 'Devi Details',
    },
    {
      key: '7',
      name: 'Bala Details',
    },
  ]
  return (
    <div>
      <Topdesgn>
        <FcBusinessman />
        <p>Add and Search Details</p>
      </Topdesgn>
      <div style={{ margin: '5px' }}>
        <Select showSearch={true} options={Selectsdata} placeholder={'select'} />&nbsp;&nbsp;
      </div>
      <Flex centerVertically center>
        <Button.Primary onClick={() => onViewRow()} text={'Add Purchase'} icon={<PlusCircleOutlined style={{ fontSize: '20px' }} />} />
      </Flex><br /><br />
      <OverScroller>
        {Datasection.map(({ name, key }, i) => {
          return (
            <Cards>
              <Image src={Reporticon} preview={false} />
              <p>{name}</p>
            </Cards>
          )
        })}
      </OverScroller>
      <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={1200} modalTitle={modalTitle} modalContent={modalContent} />
    </div>
  )
}

export default SideSection