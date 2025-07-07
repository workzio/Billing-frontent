import React from 'react'
import { Cardsin, BillTable, PrintTitle, PrintSubTitle } from './style'
import { InvoiceTitle } from '../../../../../Components/Form/FormTitle'
import Flex from '../../../../../Components/Flex'
import { Col } from 'antd'
import { Row } from '../../../../../Components/Row'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Button from '../../../../../Components/Form/Button'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import request from '../../../../../utils/request'
import * as numToWord from 'num-to-text';
import dayjs from 'dayjs';

export const BillDetails = ({ record }) => {

    const [companyProfile, setCompanyProfile] = useState({})
    useEffect(() => {
        GetCompany();
    }, [])

    const GetCompany = () => {
        request.get('mycompany')
            .then(function (response) {
                setCompanyProfile(response.data[0])
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    }


    const NumConvert = numToWord(record?.roundoff_amount, 'in');

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1; // Adding 1 because months are zero-based
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    }

    const formattedDate = dayjs(record?.invoice_date).format('DD-MMM-YY');
    const PrintedDate = dayjs().format('DD-MMM-YY [at] HH:mm');

    const HeaderTable = () => {
        return (
            <Cardsin>
                <Row>
                    <Col span={24} md={12} style={{ borderRight: '1px solid' }}>
                        <Row gutter={[12, 12]}>
                            <Col span={24} style={{ padding: '2px 10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <PrintTitle Size={'16px'} UPPER Weight={'600'}> {companyProfile.companyname}</PrintTitle>
                                    <PrintTitle Size={'14px'} UPPER Weight={'600'} TextAlign={'left'}>{companyProfile.address}, {companyProfile.state}-{companyProfile.pincode}, {companyProfile.district} DISTRICT.</PrintTitle>
                                    <PrintTitle Size={'14px'} UPPER Weight={'600'}>GSTIN / UIN&nbsp;:&nbsp;{companyProfile.gstno}</PrintTitle>
                                    <PrintTitle Size={'14px'} Weight={'600'}>State&nbsp;Name&nbsp;:&nbsp;{companyProfile.state},&nbsp;Code&nbsp;:&nbsp;{companyProfile.code}</PrintTitle>
                                    <PrintTitle Size={'14px'} Weight={'600'}>E-Mail&nbsp;:&nbsp;{companyProfile.email}</PrintTitle>
                                    <br />
                                </div>

                            </Col>

                        </Row>
                    </Col>
                    <Col span={24} md={12} >
                        <Row>
                            <Col span={24} md={12} style={{ padding: '5px', textAlign: 'left', borderBottom: '1px solid', borderRight: '1px solid' }}>
                                <PrintTitle Size={'12px'}>Invoice No.</PrintTitle>
                                <PrintTitle Size={'12px'} Weight={'600'}>{record?.invoice_no}</PrintTitle>
                            </Col>
                            <Col span={24} md={12} style={{ padding: '5px', textAlign: 'left', borderBottom: '1px solid' }}>
                                <PrintTitle Size={'12px'}>Dated</PrintTitle>
                                <PrintTitle Size={'12px'} Weight={'600'}>{formattedDate}</PrintTitle>
                            </Col>
                            <Col span={24} md={24} style={{ padding: '2px 10px' }}>
                                <div style={{ textAlign: 'start', padding: '5px 10px' }}>
                                    <PrintTitle Size={'12px'}>Buyer (Bill To)</PrintTitle>
                                    <PrintTitle Size={'16px'} UPPER Weight={'600'}> {record?.name}</PrintTitle>
                                    <PrintTitle Size={'14px'} UPPER Weight={'600'} TextAlign={'left'}>{record?.address}</PrintTitle>
                                    <PrintTitle Size={'14px'} UPPER Weight={'600'}>GSTIN / UIN&nbsp;:&nbsp;{record?.gstno}</PrintTitle>
                                    <PrintTitle Size={'14px'} Weight={'600'}>State&nbsp;Name&nbsp;:&nbsp;{record?.state}&nbsp;,&nbsp;Code&nbsp;:&nbsp;{record?.code}</PrintTitle>
                                    <PrintTitle Size={'14px'} Weight={'600'}>Contact&nbsp;:&nbsp;{record?.phoneno}</PrintTitle>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Cardsin>
        )
    }

    const FooterComponent = () => {

        const formattedTotalAmount = record?.roundoff_amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedroundOff = record?.roundoff.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedTotalPrice = record?.total_price.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        return (
            <div style={{ background: 'var(--light-color)', pageBreakInside: 'avoid', padding: '10px' }}>
                <Row>
                    <Col span={24} md={10}>
                        <PrintTitle Size={'12px'} TextAlign={'left'}>Amount Chargeable (in words)</PrintTitle>
                        <PrintTitle Size={'12px'} Weight={'600'} TextAlign={'left'}>INR {NumConvert} Only</PrintTitle>
                    </Col>
                    <Col span={24} md={14}>
                        <Row gutter={[12, 12]} style={{ justifyContent: 'end', display: 'flex', textAlign: 'end' }}>

                            <Col span={24} md={14}>
                                <PrintSubTitle Size={'14px'} Weight={'600'}>Total&nbsp;:&nbsp;</PrintSubTitle><br />
                                <div>
                                    {
                                        record?.taxlist.map((tax) => {
                                            console.log(tax, 'tax.sgst')
                                            return (
                                                tax.gst_type ? (
                                                    <><PrintSubTitle Size={'14px'} Weight={'600'}>CGST @{tax.cgst_tax}%&nbsp;:&nbsp;</PrintSubTitle> <br />
                                                        <PrintSubTitle Size={'14px'} Weight={'600'}>SGST @{tax.sgst_tax}%&nbsp;:&nbsp;</PrintSubTitle> <br /></>
                                                ) :
                                                    (<><PrintSubTitle Size={'14px'} Weight={'600'}>IGST @{tax.igst_tax}%&nbsp;:&nbsp;</PrintSubTitle> <br /></>)
                                            )
                                        })
                                    }


                                    <PrintSubTitle Size={'14px'} Weight={'600'}>Less&nbsp;:&nbsp;&nbsp;Round Off&nbsp;:&nbsp;</PrintSubTitle><br /></div>
                            </Col>
                            <Col span={24} md={10}>
                            <PrintSubTitle Size={'14px'} Weight={'600'}>{formattedTotalPrice}</PrintSubTitle> <br />
                                <div>
                                    {
                                        record?.taxlist.map((tax) => {
                                            return (
                                                tax.gst_type ? (
                                                    <><PrintSubTitle Size={'14px'} Weight={'600'}>{tax.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</PrintSubTitle> <br />
                                                        <PrintSubTitle Size={'14px'} Weight={'600'}>{tax.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</PrintSubTitle> <br /></>
                                                ) :
                                                    (<><PrintSubTitle Size={'14px'} Weight={'600'}>{tax.igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</PrintSubTitle> <br /></>)
                                            )
                                        })
                                    }

                                    <PrintSubTitle Size={'14px'} Weight={'600'} >(-){formattedroundOff}</PrintSubTitle>
                                </div>
                            </Col>
                        </Row><br />
                        <hr />
                        <br />
                        <Row gutter={[12, 12]} style={{ justifyContent: 'end', display: 'flex', textAlign: 'end', alignItems: 'center' }}>
                            <Col span={24} md={12}><PrintTitle Size={'14px'} Weight={'600'}>Grand&nbsp;Total&nbsp;:&nbsp;</PrintTitle></Col>
                            <Col span={24} md={12}><PrintTitle Size={'14px'} Weight={'600'}>{formattedTotalAmount}</PrintTitle></Col>
                        </Row>
                    </Col>
                </Row><br />
            </div >
        )
    }

    const BottomFooterComponent = () => {
        return (
            <div style={{ pageBreakInside: 'avoid' }}>
                <Row gutter={[12, 12]}>
                    <Col span={24} md={10}><PrintSubTitle Under Size={'12px'} Weight={'600'}>Declaration</PrintSubTitle>
                        <PrintTitle Size={'10px'} >We declare that this invoice shows the actual price of the <br />
                            goods described and that all particulars are true and correct</PrintTitle>
                    </Col>
                    <Col span={24} md={14}>
                        <PrintTitle Size={'12px'} >Company's Bank Details</PrintTitle>
                        <Flex gap={'5px'}>
                            <div style={{ textAlign: 'start' }}>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'12px'} >Bank Name&nbsp;</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'12px'} >A/c No.&nbsp;</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintSubTitle Size={'12px'} >Branch&nbsp;</PrintSubTitle>&nbsp;&&nbsp;
                                    <PrintSubTitle Size={'12px'} >IFS&nbsp;code&nbsp;</PrintSubTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                </div>
                            </div>
                            <div style={{ textAlign: 'start' }}>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'12px'} UPPER Weight={'600'} >:&nbsp;&nbsp;{companyProfile.bankname}</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintTitle Size={'12px'} UPPER Weight={'600'} >:&nbsp;&nbsp;{companyProfile.account_no}</PrintTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                    <PrintSubTitle Size={'12px'} UPPER Weight={'600'} >:&nbsp;&nbsp;{companyProfile.branch}&nbsp;&</PrintSubTitle>
                                    <PrintSubTitle Size={'12px'} UPPER Weight={'600'} >&nbsp;{companyProfile.ifsc_code}</PrintSubTitle>
                                </div>
                                <div style={{ textAlign: 'start' }}>
                                </div>
                            </div>
                        </Flex>
                    </Col>
                </Row>
                <div style={{ border: '1px solid', padding: '2px 10px', marginTop: '5px' }}>
                    <Row>
                        <Col span={12}><PrintSubTitle Size={'12px'} Weight={'600'}>Customer's Seal and Signature</PrintSubTitle></Col>
                        <Col span={12} style={{ textAlign: 'end' }}><b>for</b><PrintSubTitle Size={'14px'} Weight={'600'} UPPER> {companyProfile.companyname}</PrintSubTitle></Col>
                    </Row>
                    <PrintTitle Size={'14px'} TextAlign={'end'} MT={'30px'}>Authorised Signatory</PrintTitle>
                </div>
                <PrintTitle Size={'14px'} TextAlign={'center'}>This is a Computer Generated Invoice</PrintTitle>
            </div>
        )
    }

    const rows = record?.saleslist?.map((item, index) => {
        const formattedAmount = item.price_tot_amt.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedTaxRate = item.tax_include_price.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedPrice = item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ padding: '5px' }} colSpan="4"><span style={{ fontSize: '12px', fontWeight: '600', letterSpacing: '.5px' }}>{item.productname}</span></td>
                <td style={{ padding: '5px' }} colSpan="3">{item.hsn_code}</td>
                <td style={{ padding: '5px' }} colSpan="2">{item.shipped_qty} {item.unitname}</td>
                <td style={{ padding: '5px' }} colSpan="2"><b style={{ fontSize: '12px' }}>{item.qty} {item.unitname}</b></td>
                <td style={{ padding: '5px' }} colSpan="3">{formattedTaxRate}</td>
                <td style={{ padding: '5px' }} colSpan="3">{formattedPrice}</td>
                <td style={{ padding: '5px' }} colSpan="3">{item.unitname}</td>
                <td style={{ padding: '5px' }} colSpan="1"></td>
                <td style={{ padding: '5px' }} colSpan="3"><b style={{ fontSize: '12px' }}>{formattedAmount}</b></td>
            </tr>
        );
    })


    return (

        <Fragment>
            <Button.Primary onClick={handlePrint} text={'Click To Print'} />

            <BillTable ref={componentRef} id='my-table'>
                <Row>
                    <Col span={14}>
                        <div style={{ textAlign: 'center' }}>
                            <InvoiceTitle Title={'TAX INVOICE'} />
                        </div>
                    </Col>
                    <Col span={10}>
                        <div style={{ textAlign: 'end', marginRight: '40px' }}>
                            <PrintTitle Size={'14px'}>Printed&nbsp;on&nbsp;{PrintedDate}</PrintTitle>
                            <PrintTitle Size={'16px'} UPPER >(Original for Receipt)</PrintTitle>
                        </div>
                    </Col>
                </Row>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={24}><HeaderTable /></th>
                        </tr>
                        <tr>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2">Sl.<br />No</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="4">Description of Goods</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">HSN/SAC</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} colSpan="4">Quantity</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">Rate (Incl. of Tax)</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">Rate</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">per</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="1">Disc. %</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">Amount</th>
                        </tr>
                        <tr>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} colSpan="2" >shipped</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} colSpan="2" >Billed</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            rows
                        }
                    </tbody>
                </table>
                <FooterComponent />
                <BottomFooterComponent />
            </BillTable>
        </Fragment>
    )
}
