import React, { useState, useEffect, useRef } from "react";
import { Table } from "../../../../../Components/Table";
import Flex from "../../../../../Components/Flex";
import { ButnExcell } from "./Style";
import { TopTitle } from "../../../../../Components/Form/TopTitle";
import request from "../../../../../utils/request";
import { CSVLink } from "react-csv";
import { SiMicrosoftexcel } from "react-icons/si";
import { LoadingPage } from "../../../../../Components/LoadingPage";

const ViewStockEntry = () => {

    const [stockDetails, setStockDetails] = useState([])
    const conponentPDF = useRef();


    useEffect(() => {
        GetCompany();
    }, [])

    const GetCompany = () => {
        request.get('productview')
            .then(function (response) {
                setStockDetails(response.data)
            })
            .catch(function (error) {
                console.log(error, 'failedddd');
            });
    }

    const columns = [
        {
            title: 'S.No',
            render: (value, item, index) => index + 1,
        },
        {
            title: 'Product Category',
            dataIndex: 'category',
        },
        {
            title: 'Product ID',
            dataIndex: 'productid',
        },
        {
            title: 'Product Name',
            dataIndex: 'productname',
        },
        {
            title: 'No.of Stock',
            dataIndex: 'stock',
        },
        {
            title: 'Stock In',
            dataIndex: 'stock_in',
        },
        {
            title: 'Stock Out',
            dataIndex: 'stock_out',
        },
    ]

    const generateRowKey = (record) => record.productid; // Assuming productid is a unique identifier

    const dataSourceWithRowKey = stockDetails.map((item) => ({
      ...item,
      key: generateRowKey(item),
    }));


    return (
        stockDetails.length !== 0 ? (
            <div>
                <Flex centerVertically spaceBetween>
                    <TopTitle Heading={'View Stocks Details'} />
                    <ButnExcell style={{ marginRight: '60px' }}>
                        <CSVLink data={stockDetails} filename={"Stocks Details.csv"}
                            style={{ fontSize: '17px', fontWeight: '600', color: '#8056F7' }}>
                            <SiMicrosoftexcel style={{ fontSize: '33px', padding: '3px' }} /></CSVLink>
                    </ButnExcell>
                </Flex>
                <br />
                <div ref={conponentPDF} style={{ width: '100%' }}>
                    <Table columns={columns} data={dataSourceWithRowKey} rowKey={(record) => record.key} />
                </div>
            </div>
        ) : (
            
            <LoadingPage/>
        )

    );
}
export default ViewStockEntry;