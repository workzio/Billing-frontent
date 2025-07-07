import React, { useState } from 'react'
import DeliveryForm from './DeliveryForm';
import Button from '../../../../Components/Form/Button';
import Flex from '../../../../Components/Flex';
import { Table } from '../../../../Components/Table';
import { Modal } from '../../../../Components/Modal';
import { AppstoreAddOutlined, EditOutlined } from '@ant-design/icons';
import { MdOutlineMoveUp } from 'react-icons/md';

const DeliveryTable = () => {

const [isModalOpen,setIsModalOpen]=useState(false);


const [modalTitle,setModalTitle]=useState('');
const [modalContent,setModalContent]=useState(null)

const showModal = () => {
    setIsModalOpen(true);
};
const handleOk = () => {
    setIsModalOpen(false);
};
const handleCancel = () => {
    setIsModalOpen(false);
};

const UpdateDelivery = ()=>{
setModalContent(<DeliveryForm/>);
setModalTitle("Delivery");
showModal();
}




const columns =[
{
    title:'Order_id',
   dataIndex:'order_id'

},
{
    title:'Bill_no',
    dataIndex:'bill_no',

},
{
    title:'Status',
    dataIndex:'status',

},
{
  title:'Company Name',
  dataIndex:'company_name',

},

{
    title:'Contact',
    dataIndex:'contact_no',

},
{
    title:'Action',
    render: () =>{
        return(
           <>
             <Flex spaceEvenly>
         
         <Button.Success text={<AppstoreAddOutlined />} />
         <Button.Primary text={<EditOutlined/>} onClick={()=>UpdateDelivery()}/>
         <Button.Yellow text={<MdOutlineMoveUp/>} />

   
         </Flex>
           </>
          
        )
    }

},
]
const data = [
{
    order_id: '17777',
    bill_no: 'IU776',
    status: 'Mike',
    company_name: 'Active',
    contact_no: '987456321',
}
]
return (

<div style={{marginTop:'70px'}}>
<h1>STOCK LIST</h1>
<Table columns={columns} data={data}/>


<Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} modalTitle={modalTitle} modalContent={modalContent} width={1200}></Modal>

</div>

)
}


export default DeliveryTable
