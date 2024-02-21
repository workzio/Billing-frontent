import { Fragment, useRef } from "react";
import Button from "../../../../../Components/Form/Button";
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
import Flex from "../../../../../Components/Flex";
import { Row } from "../../../../../Components/Row";
import { Col } from "antd";
import { AmountWrapper, Symbol } from "./Styled";
import dayjs from 'dayjs'
import { useReactToPrint } from 'react-to-print'
import * as numToWord from 'num-to-text';
import { useSelector } from "react-redux";


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
                        Voucher
                    </CommonTitleH2>
                </CommonTitleHolder>

                <ContentHolder>
                    <Row gutter={[24, 24]}>
                        <Col span={12} md={8}>
                            <Flex W_100>
                                <CommonSubTitleMenu>Voucher&nbsp;No&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{record?.voucherNo}</CommonSubTitleMenuValue>
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
                                <CommonSubTitleMenu>Paid&nbsp;to&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{record?.paidTo}</CommonSubTitleMenuValue>
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
                                <CommonSubTitleMenu>Particulars&nbsp;:&nbsp;</CommonSubTitleMenu>
                                <CommonSubTitleMenuValue>{record?.particulars}</CommonSubTitleMenuValue>
                            </Flex>
                        </Col>

                        <Col span={12} md={8} style={{ marginTop: '15px' }}>
                            <AmountWrapper >
                                <Symbol>
                                    &#x20B9;
                                </Symbol>
                                <h4>
                                    {formattedAmount}
                                </h4>
                            </AmountWrapper>
                        </Col>
                        <Col span={12} md={8} style={{ marginTop: '15px' }}>
                            <Flex W_100 center>
                                <span>Received by</span>
                            </Flex>
                        </Col>

                        <Col span={12} md={8} style={{ marginTop: '15px' }}>
                            <Flex W_100 center>
                                <span>Account</span>
                            </Flex>
                        </Col>
                    </Row>
                </ContentHolder>
            </CommonHolder>
        </Fragment>
    )
}
