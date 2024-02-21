import { Col } from 'antd';
import { useState } from 'react';
import Flex from '../../../../../Components/Flex';
import Button from '../../../../../Components/Form/Button';
import { SearchBar } from '../../../../../Components/Form/SearchBar';
import { Modal } from '../../../../../Components/Modal';
import { Row } from '../../../../../Components/Row';
import { Table } from '../../../../../Components/Table'
import { HeadCon } from './style';
import Formstocks from './Formstocks';
import { TopBox } from '../../../Stocks/Style';

const StockTable = () => {
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
    const onDetails = () => {
        setModalContent(<Formstocks />);
        setModalTitle("View Details");
        showModal();
    }
    const Columns = [
      
        {
            title: 'No of Stocks arrival',
            dataIndex: 'stock_arrival',

        },
    
        {
            title: 'Order No',
            dataIndex: 'order_no',

        },
        {
            title: 'Bill No',
            dataIndex: 'order_no',

        },
        {
            title: 'Status',
            dataIndex: 'status',

        },
        {
            title: 'Date',
            dataIndex: 'date',

        },
    ]
    return (
        <div>
            <HeadCon>
                <TopBox>
                    <Row style={{ padding: '22px 70px' }}>
                        <Col span={24} lg={6}>
                            <SearchBar width={200}  />
                        </Col>
                        <Col span={24} lg={6}>
                        </Col>
                        <Col span={24} lg={6}>
                        </Col>
                        <Col span={24} lg={6}>
                            <Flex end gap={'50px'}>
                                <Button.Primary text={'Add Details'} onClick={() => onDetails()} />
                            </Flex>
                        </Col>
                    </Row>
                </TopBox>
                <Table columns={Columns} />
            </HeadCon>
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={800} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )
}

export default StockTable