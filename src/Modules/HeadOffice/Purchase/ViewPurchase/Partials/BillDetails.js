import React from 'react'
import { Cardsin, BillTable, PrintTitle, PrintSubTitle } from './style'
import { Col, } from 'antd'
import { Row } from '../../../../../Components/Row'
import { useRef } from 'react'
import { useReactToPrint } from 'react-to-print'
import Button from '../../../../../Components/Form/Button'
import { Fragment } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import request from '../../../../../utils/request'
import * as numToWord from 'num-to-text';

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

    const NumConvert = numToWord(record?.roundoff_amount,'in');

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

    const formattedDate = formatDate(record?.purchase_date);

    const HeaderTable = () => {

        return (
            <Cardsin>
                <Row>
                    <Col span={24} md={12} style={{ borderRight: '1px solid', padding: '2px 10px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                            <PrintTitle Size={'16px'} UPPER Weight={'600'}>{record?.companyname}</PrintTitle>
                            <PrintTitle Size={'14px'} UPPER Weight={'600'} >{record?.address}</PrintTitle>
                            <PrintTitle Size={'14px'} UPPER Weight={'600'}>GSTIN / UIN&nbsp;:&nbsp;{record?.gstin}</PrintTitle>
                            <PrintTitle Size={'14px'} Weight={'600'}>State&nbsp;Name&nbsp;:&nbsp;{record?.state},</PrintTitle>
                            <PrintTitle Size={'14px'} Weight={'600'}>Contact&nbsp;:&nbsp;{record?.contact}</PrintTitle>
                            <PrintTitle Size={'14px'} Weight={'600'}>Invoice Number&nbsp;:&nbsp;{record?.invoice_no}</PrintTitle>
                            <PrintTitle Size={'14px'} Weight={'600'}>E-Mail&nbsp;:&nbsp;{record?.email}</PrintTitle>
                        </div>
                    </Col>
                    <Col span={24} md={12} >
                        <Row>
                            <Col span={24} md={12} style={{ padding: '5px', textAlign: 'center', borderBottom: '1px solid', borderRight: '1px solid' }}>
                                <PrintTitle Size={'14px'} Weight={'600'}>Purchase No.</PrintTitle>
                                <PrintTitle Size={'14px'} UPPER Weight={'600'}>{record?.purchase_number}</PrintTitle>
                            </Col>
                            <Col span={24} md={12} style={{ padding: '5px', textAlign: 'center', borderBottom: '1px solid' }}>
                                <PrintTitle Size={'14px'} Weight={'600'}>Purchase Date</PrintTitle>
                                <PrintTitle Size={'14px'} UPPER Weight={'600'}>{formattedDate}</PrintTitle>
                            </Col>
                            <Col span={24} md={24} style={{ padding: '2px 10px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                    <PrintTitle Size={'16px'} UPPER Weight={'600'}> {companyProfile.companyname}</PrintTitle>
                                    <PrintTitle Size={'14px'} UPPER Weight={'600'} TextAlign={'left'}>{companyProfile.address}, {companyProfile.state}-{companyProfile.pincode}, {companyProfile.district} DISTRICT.</PrintTitle>
                                    <PrintTitle Size={'14px'} UPPER Weight={'600'}>GSTIN / UIN&nbsp;:&nbsp;<span style={{ textTransform: 'uppercase' }}>{companyProfile.gstno}</span></PrintTitle>
                                    <PrintTitle Size={'14px'} Weight={'600'}>State&nbsp;Name&nbsp;:&nbsp;<span style={{ textTransform: 'capitalize' }}>{companyProfile.state}</span>, Code: {companyProfile.code}</PrintTitle>
                                    <PrintTitle Size={'14px'} Weight={'600'}>E-Mail&nbsp;:&nbsp;{companyProfile.email}</PrintTitle>
                                </div>

                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Cardsin>
        )
    }

    const FooterComponent = () => {

        const formattedRoundOff = record?.roundoff_amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedRoundOffPay = record?.roundoff.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedTotal = record?.total_price.toLocaleString('en-IN', { minimumFractionDigits: 2 });

        return (
            <div style={{ background: 'var(--light-color)', padding:'10px' }}>
                <Row>
                    <Col span={24} md={10}>
                        <PrintTitle Size={'12px'} TextAlign={'left'}>Amount Chargeable (in words)</PrintTitle>
                        <PrintTitle Size={'12px'} Weight={'600'} TextAlign={'left'}>INR {NumConvert} Only</PrintTitle>
                    </Col>
                    <Col span={24} md={14}>
                        <Row gutter={[12, 12]} style={{ justifyContent: 'end', display: 'flex', textAlign: 'end' }}>

                            <Col span={24} md={14}>
                                <div>
                                    {record?.igst && <><PrintSubTitle Size={'14px'} Weight={'600'}>IGST&nbsp;:</PrintSubTitle><br /></>}
                                    {record?.cgst && <><PrintSubTitle Size={'14px'} Weight={'600'}>CGST&nbsp;:</PrintSubTitle><br /></>}
                                    {record?.sgst && <><PrintSubTitle Size={'14px'} Weight={'600'}>SGST&nbsp;:</PrintSubTitle><br /></>}
                                    <PrintSubTitle Size={'14px'} Weight={'600'}>Less&nbsp;:&nbsp;Round Off&nbsp;:</PrintSubTitle><br /></div>
                            </Col>
                            <Col span={24} md={10}>
                                <div>
                                    {record?.igst && <><PrintSubTitle Size={'14px'} Weight={'600'}>{record?.igst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</PrintSubTitle><br /></>}
                                    {record?.cgst && <><PrintSubTitle Size={'14px'} Weight={'600'}>{record?.cgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</PrintSubTitle><br /></>}
                                    {record?.sgst && <><PrintSubTitle Size={'14px'} Weight={'600'}>{record?.sgst.toLocaleString('en-IN', { minimumFractionDigits: 2 })}</PrintSubTitle><br /></>}
                                    <PrintSubTitle Size={'14px'} Weight={'600'}>(-){formattedRoundOffPay}</PrintSubTitle>
                                </div>
                            </Col>
                        </Row><br />
                        <hr />
                        <br />
                        <Row gutter={[12, 12]} style={{ justifyContent: 'end', display: 'flex', textAlign: 'end', }}>
                            <Col span={24} md={12}><PrintTitle Size={'14px'} Weight={'600'}>Grand&nbsp;Total&nbsp;:&nbsp;</PrintTitle></Col>
                            <Col span={24} md={12}><PrintTitle Size={'14px'} Weight={'600'}>{formattedRoundOff}</PrintTitle></Col>
                        </Row>
                    </Col>
                </Row><br />
            </div >
        )
    }

    const rows = record?.purchaselist.map((item, index) => {
        const formattedAmount = item.price_tot_amt.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedTaxPrice = item.inc_tax_price.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedPrice = item.price.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        const formattedValue = item.tax_qty_amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td style={{ padding: '5px' }} colSpan="4"><span style={{ fontSize: '12px',fontWeight:'600',letterSpacing:'.5px' }}>{item.productname}</span></td>
                <td style={{ padding: '5px' }} colSpan="3">{item.hsn_code}</td>
                <td style={{ padding: '5px' }} colSpan="2">{item.shipped_qty} {item.unitname}</td>
                <td style={{ padding: '5px' }} colSpan="2">{item.qty} {item.unitname} </td>
                <td style={{ padding: '5px' }} colSpan="3">{formattedTaxPrice}</td>
                <td style={{ padding: '5px' }} colSpan="3">{formattedPrice}</td>
                <td style={{ padding: '5px' }} colSpan="3">{item.tax_percentage}&nbsp;%</td>
                <td style={{ padding: '5px' }} colSpan="3">{item.unitname}</td>
                <td style={{ padding: '5px' }} colSpan="3">{formattedValue}</td>
                <td style={{ padding: '5px' }} colSpan="3">{formattedAmount}</td>
            </tr>
        );
    });

    return (
        <Fragment>
            <Button.Primary onClick={handlePrint} text={'Click To Print'} />

            <BillTable ref={componentRef}>
               
                <table style={{ height: '100vh' }}>
                    <thead>
                        <tr>
                            <th colSpan={30}><HeaderTable /></th>
                        </tr>
                        <tr>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2">Sl.<br />No</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="4">Description of Goods</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">HSN/SAC</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} colSpan="4">Quantity</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">Rate (Incl. of Tax)</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">Rate</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">Tax %</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">per</th>
                            <th style={{ fontSize: '14px', fontWeight: '500' }} rowSpan="2" colSpan="3">Value</th>
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
                    <tfoot>
                        <tr>
                            <th colSpan={"30"}><FooterComponent /></th>
                        </tr>
                    </tfoot>
                </table>
            </BillTable>
        </Fragment>
    )
}
