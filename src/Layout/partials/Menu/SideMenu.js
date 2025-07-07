import { FileProtectOutlined} from "@ant-design/icons";
import {  MdProductionQuantityLimits } from 'react-icons/md'
import { GoListUnordered } from 'react-icons/go'
import { Menu } from "antd";
import { useNavigate } from 'react-router-dom';
import { BiPurchaseTag, BiSitemap } from "react-icons/bi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import request from "../../../utils/request";
import { setCompanyProfile } from "../../../Modules/HeadOffice/CompanyProfile/action";
import { ImProfile } from "react-icons/im";
import { FaChartBar, FaUserFriends, FaUsers, FaRupeeSign } from "react-icons/fa";
import { AiOutlineReconciliation, AiOutlineStock,AiOutlineBank } from "react-icons/ai";
import { TfiReceipt } from "react-icons/tfi";
import { BsCalendar2Day } from "react-icons/bs";
import { SolutionOutlined } from "@ant-design/icons";

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}


const SideMenu = () => {

    const [CompanyPro, setCompanyPro] = useState([])
    const dispatch=useDispatch();


        const company = useSelector((state)=>state.companyprofile.companyprofile)

    

    useEffect(() => {
        setCompanyPro(company);
    }, [company])

    useEffect(() => {
        GetCompany();
    }, [])


    const GetCompany = () => {

        request.get('Shop_mycompany/1')
            .then(function (response) {
                setCompanyPro(response.data)
                dispatch(setCompanyProfile(response.data))
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    const rootSubinmenuKeys = ['sub1', 'sub2', 'sub3', 'sub4', 'sub5', 'sub6','sub7',
     'sub8','sub9','sub10','sub11','sub12','sub13'];

    const [openKeys, setOpenKeys] = useState(['sub1']);

    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubinmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    const items = [
        getItem('Dashboard', '',<BiSitemap/>),
        getItem('Day Book', 'headoffice_daybook',<BsCalendar2Day/>),
        
        getItem('Profile', 'sub1', <ImProfile />, [
           Object.keys(company).length === 0 && getItem('Add Profile', 'headoffice_cmpy_profile'),
            getItem('View Profile', 'headoffice_cmpy_profile_view'),
        ]),

        getItem('Stocks', 'headoffice_stocks',<AiOutlineStock/>),
    
        getItem('Products', 'sub2', <MdProductionQuantityLimits />, [
            getItem('Add Product', 'headoffice_add_product'),
            getItem('View Product', 'headoffice_view_product'),
        ]),

        getItem('Distributor Outsource', 'sub3', <FileProtectOutlined />, [
            getItem('Add Distributor', 'headoffice_distributor_outsource'),
            getItem('View Distributor', 'headoffice_outsourceview'),
            getItem('Distributor Report', 'headoffice_distributor_report'),
        ]),   
        getItem('Customer', 'sub4', <FaUserFriends />, [
            getItem('Add Customer', 'headoffice_customeradmin'),
            getItem('View Customer', 'headoffice_distritale'),
            getItem('Customer Report', 'headoffice_customer_report'),
        ]),

        getItem('Members', 'sub11', <FaUsers />, [
            getItem('Add Member', 'headoffice_add_member'),
            getItem('View Member', 'headoffice_view_member'),
        ]),
        getItem('Salary', 'sub12', <FaRupeeSign />, [
            getItem('Add Salary', 'headoffice_add_salary'),
            getItem('View Salary', 'headoffice_view_salary'),
        ]),
        getItem('Banks & Transaction', 'sub13', <AiOutlineBank />, [
            // getItem('Add Bank', 'headoffice_add_bank_details'),
            getItem('Add Bank','headoffice_bank_details'),
            getItem('Internal Transaction', 'headoffice_internal_transaction'),
            getItem('Online Transaction', 'headoffice_online_transaction'),
            getItem('View Transaction Details', 'headoffice_view_bank_details'),

        ]),
    

        getItem('Purchase', 'sub5', <BiPurchaseTag />, [
            getItem('Add Purchase', 'add_headoffice_purchase'),
            getItem('View Purchase', 'headoffice_purchase_view'),
        ]),
    
        getItem('Sale', 'sub6', <GoListUnordered />, [
            getItem('Add Sale ', 'headoffice_sale_order'),
            getItem('View Sale', 'headoffice_saleviewdetails'),
        ]),

        getItem('Receipt', 'sub7', <AiOutlineReconciliation />, [
            getItem('Add Receipt', 'headoffice_add_receipt'),
            getItem('View Receipt', 'headoffice_view_receipt'),
        ]),

        getItem('Voucher', 'sub8', <TfiReceipt />, [
            getItem('Add Voucher', 'headoffice_add_voucher'),
            getItem('View Voucher', 'headoffice_view_voucher'),
        ]),

        
        getItem('Reports', 'sub9', <FaChartBar />, [
            getItem('Purchase', 'headoffice_Month_PurchaseReport'),
            getItem('Sales', 'headoffice_Month_SalesReport'),
            getItem('Vouchers', 'headoffice_Month_VoucherReport'),
            getItem('Receipt', 'headoffice_Month_ReceiptReport'),
            getItem('Product', 'headoffice_Month_ProductReport'),
            getItem('DayBook', 'headoffice_Month_DaybookReport'),
            getItem('Internal Transaction', 'headoffice_Month_InternalTransactionReport'),
            getItem('Online Transaction', 'headoffice_Month_OnlineTransactionReport'),
        ]),

        getItem('Attendance','sub10', <SolutionOutlined/>,[
            getItem('Add Attendance','headoffice_add_attendance'),
            getItem('View Attendance','headoffice_view_attendance'),
        ])
    ];

    const navigate = useNavigate();
    const onClick = ({ key }) => {

        if (key === null) {

        }
        else {
            navigate(`${key}/`)
        }
    }
    return (
        <>

            <Menu
                onClick={onClick}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                defaultSelectedKeys={['1']}
                mode="inline"
                items={items}
            />
        </>
    )
}

export default SideMenu
