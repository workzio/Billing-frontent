import { Col, Form } from 'antd'
import React, { Fragment, useEffect, useState } from 'react'
import ProductModal from './ProductModal';
import Flex from '../../../../../Components/Flex';
import { Row } from '../../../../../Components/Row';
import Input from '../../../../../Components/Form/Input';
import { Select } from '../../../../../Components/Form/Select';
import { CustomSelect } from '../../../../../Components/Form/CustomSelect';
import { TextAreas } from '../../../../../Components/Form/TextArea';
import Button from '../../../../../Components/Form/Button';
import { Modal } from '../../../../../Components/Modal';
import request from '../../../../../utils/request';
import UnitModal from './Unit';
import { toast } from 'react-toastify';
import { GSTPercentage } from './Data';

const AddProduct = ({setCategory, handleSalesOk, handleEditProduct, record }) => {


    const [form] = Form.useForm();



    const [productdata, setProductdata] = useState(                        // {setProduct}
        {
            mySelectField: '',
            myArraryField: [],
        },
    );
    const [unitdata, setUnitdata] = useState(                        // {setProduct}
        {
            mySelectField: '',
            myArraryField: [],
        },
    )

    const [catOptions, setCatOptions] = useState([])
    const [unitOptions, setUnitOptions] = useState([])
    const [catLoad, setCatLoad] = useState(1)
    const [categoryIDChange, setCategoryIDChange] = useState(null)
    const [unitIDChange, setUnitIDChange] = useState(null)


    // ======  Modal Open ========
    const [isModalOpen, setIsModalOpen] = useState(false);

    // ======  Modal Title and Content ========
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const onFinish = (values) => {
        if (record) {
            UpdateProduct(values);
        }
        else {
            handleOk(false)
            Post_Product(values)
        }
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

    useEffect(() => {
        form.setFieldsValue(record)
        setCategoryIDChange(record?.category_id)
        setUnitIDChange(record?.unit_id)
    }, [record])


    useEffect(() => {
        form.setFieldsValue({ category_id: categoryIDChange })
    }, [categoryIDChange])

    useEffect(() => {
        form.setFieldsValue({ unit_id: unitIDChange })
    }, [unitIDChange])

    //================file upload============//

    const handleButtonClick = () => {
        setModalTitle("Add Category");
        setModalContent(<ProductModal handleOk={handleOk} setCategory={setCategory} HandlesetCatLoad={HandlesetCatLoad} />);
        showModal();
    };
    const handleUnitModal = () => {
        setModalTitle("Add Unit");
        setModalContent(<UnitModal handleOk={handleOk} HandlesetCatLoad={HandlesetCatLoad} />);
        showModal();
    };


    const HandlesetCatLoad = (arg) => {
        setCatLoad(catLoad + arg)
    }

    const onReset = () => {
        form.resetFields();
        if (handleSalesOk) {
            form.resetFields();
            handleSalesOk();
        }
        if (handleEditProduct) {
            form.resetFields();
            handleEditProduct();
        }
    };

    

    const GetCategory = () => {
        request.get('category')
            .then(function (response) {
                setCatOptions(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const GetUnit = () => {
        request.get('unit')
            .then(function (response) {
                setUnitOptions(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    const categoryOption = catOptions?.map((category) => ({
        label: category.category,
        value: category.category_id,
    }));

    const Unit = unitOptions?.map((unit) => ({
        label: unit.unitname,
        value: unit.unit_id,
    }));

    useEffect(() => {
        GetCategory();
    }, [catLoad])

    useEffect(() => {
        GetUnit();
    }, [catLoad])


    const ChangeProductId = (e) => {
        setCategoryIDChange(e)
    }

    const ChangeUnitId = (e) => {
        setUnitIDChange(e)
    }


    const Post_Product = (values) => {

        request.post('product/save', values)
            .then(function (response) {

                if (response.status == 200) {
                    toast.success('Successfully Added Products')
                    form.resetFields();
                    if (handleSalesOk) {
                        form.resetFields();
                        handleSalesOk();
                    }
                }
                else {
                    toast.error('Failed');
                }

            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const UpdateProduct = (values) => {
        const NewValue = {
            categoryid: values?.category_id,
            hsn_code: values?.hsn_code,
            productdescription: values?.productdescription,
            productname: values?.productname,
            tax_percentage: values?.tax_percentage,
            unit_id: values?.unit_id,
        }

        UpdateProductEdit(NewValue);
    }

    const UpdateProductEdit = (values) => {
        console.log(values,'lllllllllll UpdateProductEdit');
        request.put(`/product/edit/${record?.productid}`, values)
            .then(function (response) {

                if (response.status == 200) {
                    toast.info('Successfully Updated Products')
                    form.resetFields();
                    if (handleSalesOk) {
                        form.resetFields();
                        handleSalesOk();
                    }
                    if (handleEditProduct) {
                        form.resetFields();
                        handleEditProduct();
                    }
                }
                else {
                    toast.error('Failed');
                }

            })

            .catch(function (error) {
                console.log(error);
            });
    }

    const categoryId = (e) => {
    }

    const UnitId = (e) => {
    }

    return (
        <Form
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            form={form}
            labelCol={{
                span: 24,
            }}
            wrapperCol={{
                span: 24,
            }}
            autoComplete='off'>
            <Row gutter={[24, 24]} >
                <Col span={24} md={12}>
                    <Input label={'Name of the Product'} placeholder={'Product Name'} name={'productname'} rules={[
                        {
                            required: true,
                            message: 'Please enter details!',
                        },
                    ]} />
                </Col>

                <Col span={24} md={12}>
                    {
                        record ? (
                            <Fragment>
                                <Select options={categoryOption} label={'Product Category'} name={'category'} rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} onChange={ChangeProductId} />
                                <Input name={'category_id'} display={'none'} />
                            </Fragment>
                        ) : (
                            <CustomSelect label={'Product Category'} name={'categoryid'}
                                showSearch={true}
                                onButtonClick={handleButtonClick}
                                onChange={(e) => categoryId(e)}
                                options={categoryOption}
                                value={productdata} rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        )
                    }
                </Col>

                <Col span={24} md={12}>
                    <Input label={'HSN Code'} placeholder={'HSN Code'} name={'hsn_code'} rules={[
                        {
                            required: true,
                            message: 'Please enter details!',
                        },
                    ]} />
                </Col>

                <Col span={24} md={12} >
                    {
                        record ? (
                            <Fragment>
                                <Select options={Unit} label={'Product Unit'} name={'unitname'} rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} onChange={ChangeUnitId} />
                                <Input name={'unit_id'} display={'none'} />
                            </Fragment>
                        ) : (
                            <CustomSelect label={'Product Unit'} name={'unit_id'}
                                showSearch={true}
                                onButtonClick={handleUnitModal}
                                onChange={(e) => UnitId(e)}
                                options={Unit}
                                value={unitdata} 
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please enter details!',
                                    },
                                ]} />
                        )
                    }
                </Col>

                <Col span={24} md={12}>
                    <Select options={GSTPercentage} label={'Tax Percentage'} placeholder={'Select Tax'} name={'tax_percentage'} rules={[
                        {
                            required: true,
                            message: 'Please enter details!',
                        },
                    ]} />
                    
                </Col>

                <Col span={24} md={12}>
                    <TextAreas label={'Product description'} name={'productdescription'} />
                </Col>

                <Flex center gap={'20px'} W_100>
                    <Button.Success text={'Save'} htmlType={'submit'} />
                    <Button.Danger text={'cancel'} onClick={() => onReset()} />
                </Flex>
            </Row>
            <Modal isVisible={isModalOpen} handleOk={handleOk} handleCancel={handleCancel} width={400} modalTitle={modalTitle} modalContent={modalContent} />
        </Form>
    )
}

export default AddProduct