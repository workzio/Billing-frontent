import dayjs from 'dayjs'
import { useReactToPrint } from 'react-to-print'
import * as numToWord from 'num-to-text';
import {
    AmountWrapper,
    Symbol,
    SignatureWrapper,
    ShopName,
    Sign,
} from "./Style";
import {
    CommonHolder,
    CommonTitleHolder,
    CommonTitleH1,
    CommonTitleH2,
    CommonTitleH3,
    ContentHolder,
    CommonSubTitleMenu,
    CommonSubTitleMenuValue,
} from '../../../../../Components/Styled'
import { useSelector } from "react-redux";
import { Row } from "../../../../../Components/Row";
import { Fragment, useRef } from 'react';
import Button from '../../../../../Components/Form/Button';
import { Col } from 'antd';
import Flex from '../../../../../Components/Flex';


export const ModalViewContent = ({ record, Name }) => {

    const CompanySel = useSelector((state) => state.companyprofile.companyprofile)

    const componentRef = useRef();
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const formattedDate = dayjs(record?.date).format('DD-MM-YYYY');
    const NumConvert = numToWord(record?.amount,'in');
    const formattedAmount = record?.amount.toLocaleString('en-IN', { minimumFractionDigits: 2 });

    return (
        <Fragment>
            <Button.Primary onClick={handlePrint} text={'Click To Print'} />

            <CommonHolder ref={componentRef}>
                <CommonTitleHolder>
                    <CommonTitleH1>
                        {CompanySel?.companyname}
                    </CommonTitleH1>

                    <CommonTitleH3>
                        {CompanySel?.location},&nbsp;{CompanySel?.district}&nbsp;District,&nbsp;Pin&nbsp;:&nbsp;{CompanySel?.pincode}
                    </CommonTitleH3>

                    <CommonTitleH3>
                        Mob&nbsp;:&nbsp;{CompanySel?.phoneno1}{CompanySel?.phoneno2 && <>,&nbsp;{CompanySel?.phoneno2}</>}
                    </CommonTitleH3>

                    <CommonTitleH3>
                        E-mail&nbsp;:&nbsp;{CompanySel?.email}
                    </CommonTitleH3>

                    <CommonTitleH2>
                        Receipt
                    </CommonTitleH2>
                </CommonTitleHolder>

                <ContentHolder>
                    <Row gutter={[24, 24]}>
                        <Col span={12} md={8}>
                            <Flex W_100>
                                <CommonSubTitleMenu>No&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{record?.receiptNo}</CommonSubTitleMenuValue>
                            </Flex>
                        </Col>

                        <Col span={6}></Col>

                        <Col span={12} md={10}>
                            <Flex W_100>
                                <CommonSubTitleMenu>Date&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{formattedDate}</CommonSubTitleMenuValue>
                            </Flex>
                        </Col>

                        <Col span={24} md={24}>
                            <Flex W_100 baseLine>
                                <CommonSubTitleMenu>Received&nbsp;From&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{record?.received}</CommonSubTitleMenuValue>
                            </Flex>
                        </Col>

                        <Col span={24} md={24}>
                            <Flex W_100 baseLine>
                                <CommonSubTitleMenu>Rupees&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{NumConvert}&nbsp;Only</CommonSubTitleMenuValue>
                            </Flex>
                        </Col>

                        <Col span={24} md={24}>
                            <Flex W_100 baseLine>
                                <CommonSubTitleMenu>Towards&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{record?.towards}</CommonSubTitleMenuValue>
                            </Flex>
                        </Col>

                        <Col span={12} md={12}>
                            <Flex W_100>
                                <CommonSubTitleMenu>Bank&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{record?.bank}</CommonSubTitleMenuValue>
                            </Flex>
                        </Col>

                        <Col span={12} md={12}>
                            <Flex W_100>
                                <CommonSubTitleMenu>Cheque&nbsp;No&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{record?.chequeNo}</CommonSubTitleMenuValue>
                            </Flex>
                        </Col>

                        <Col span={12} md={8}>
                            <Flex W_100>
                                <CommonSubTitleMenu>Paid&nbsp;By&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{record?.paymentType}</CommonSubTitleMenuValue>
                            </Flex>

                            <AmountWrapper >
                                <Symbol>
                                    &#x20B9;
                                </Symbol>
                                <h4>
                                    {formattedAmount}
                                </h4>
                            </AmountWrapper>
                        </Col>

                        <Col span={4}></Col>

                        <Col span={12} md={12}>
                            <SignatureWrapper>
                                <ShopName>
                                    {CompanySel?.companyname}
                                </ShopName>

                                <Sign>
                                    Authorised Signatory
                                </Sign>
                            </SignatureWrapper>
                        </Col>
                    </Row>
                </ContentHolder>
            </CommonHolder>
        </Fragment>
    )
}
