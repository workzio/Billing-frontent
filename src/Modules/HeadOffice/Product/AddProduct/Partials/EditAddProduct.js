import { Col, Form } from 'antd'
import React, { useEffect, useState } from 'react'
import ProductModal from './ProductModal';
import Flex from '../../../../../Components/Flex';
import { Row } from '../../../../../Components/Row';
import Input from '../../../../../Components/Form/Input';
import { CustomSelect } from '../../../../../Components/Form/CustomSelect';
import { TextAreas } from '../../../../../Components/Form/TextArea';
import Upload from '../../../../../Components/Form/Upload';
import Button from '../../../../../Components/Form/Button';
import { Modal } from '../../../../../Components/Modal';

const AddProduct = ({ setProduct, getProduct }) => {

    const [form] = Form.useForm();

    const [productdata, setProductdata] = useState(                        // {setProduct}
        {
            mySelectField: '',
            myArraryField: [],
        },
    );

    const [options, setOptions] = useState([]);
    const [newOption, setNewOption] = useState("");


    const handleAddOption = (e) => {
        e.preventDefault();
        setOptions([...options, { label: newOption, value: newOption }]);
        setNewOption("");
    };


    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);
    const onFinish = (values) => {
        console.log('Success:', values);

    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    //================file upload============//
    const [files, setFiles] = useState(null)

    const SelectedImg = (arg) => {
        setFiles(arg)
    };
    const handleButtonClick = () => {
        setModalTitle("Add Category");
        setModalContent(<ProductModal setProduct={setProduct} handleOk={handleOk} />);
        showModal();
    };
    const onReset = () => {
        form.resetFields();
    }
    useEffect(() => {
        setProductdata(getProduct)
    }, [getProduct])

    return (

        <div>
            <Form
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
                labelCol={{
                    span: 24,
                }}
                wrapperCol={{
                    span: 24,
                }}>
                <Row gutter={[24, 24]} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '10px', boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)' }} >
                    <Col span={24} md={12}>
                        <Input label={'Product ID'} placeholder={'ProductId'} name={'product_id'} />
                    </Col>
                    <Col span={24} md={12}>
                        <Input label={'Name of the Product'} placeholder={'Product Name'} name={'product_name'} />
                    </Col>

                    <Col span={24} md={12}>


                        <CustomSelect label={'Product Category'} name={'category'}
                            onButtonClick={handleButtonClick}
                            options={options}
                            value={productdata} />
                        <br /> <br />
                        <Row gutter={[12, 12]}>
                            <Col span={18} md={15}>
                                <Input placeholder={'select'} value={newOption}
                                    onChange={(e) => setNewOption(e.target.value)} />
                            </Col>
                            <Col span={6} md={8}>
                                <Flex spaceEvenly>
                                    <Button.Primary htmlType={'submit'} text={'Add'} onClick={handleAddOption} />
                                    <Button.Danger text={'Cancel'} onClick={() => onReset()} />
                                </Flex>
                            </Col>
                        </Row>



                    </Col>
                    <Col span={24} md={12}>
                        <TextAreas label={'Product description'} name={'product_description'} />
                    </Col>
                    <Col span={24} md={12} style={{ textAlign: 'center' }} >
                        <Upload SelectedImg={SelectedImg}
                            label={'Profile Photo'}
                            rules={[
                                {
                                    required: true,
                                    message: 'This is a required field'
                                },

                            ]}
                            name={'img'}
                            link={'http://127.0.0.1:8000/api/my_testing/'}
                            maxCount={1}
                            listType={'picture-card'}
                            files={files}
                        />
                    </Col>
                    <Col span={24} md={12} offset={12}></Col>
                    <br />
                    <Flex center gap={'20px'}>
                        <Button.Primary text={'Update'} htmlType={'submit'} />
                        <Button.Danger text={'cancel'} />
                    </Flex>
                </Row>
            </Form>
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={400} modalTitle={modalTitle} modalContent={modalContent} />
        </div>
    )

}

export default AddProduct