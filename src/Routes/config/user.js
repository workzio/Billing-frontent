import PageNotFound from '../Components/PageNotFound'
import UserSignin from '../../Modules/Auth/Container/index'

// ============= Admin ===========

import { Home } from '../../Modules/Home'

// //-------------- HeadOfficeLink Pages start --------------

import { DayBook_MainOffice } from '../../Modules/HeadOffice/DayBook/index'
import { AddPurchase } from '../../Modules/HeadOffice/Purchase/AddPurchase'
import CmpyOutsource from '../../Modules/HeadOffice/Company/AddCompany/Container/index'
import CompanyView from '../../Modules/HeadOffice/Company/ViewCompany/Container/index'
import ViewStocks from '../../Modules/HeadOffice/Stocks/ViewStock'
import ViewPurchase from '../../Modules/HeadOffice/Purchase/ViewPurchase'
import Admin_AddProduct from '../../Modules/HeadOffice/Product/AddProduct/Container/index'
import Admin_ViewProduct from '../../Modules/HeadOffice/Product/ViewProduct/Container/index'
import Admin_ViewSale from '../../Modules/HeadOffice/Sale/ViewSale'
import { SaleOrder } from '../../Modules/HeadOffice/Sale/OrderSale'
import HeadOfficeCompanyProfile from '../../Modules/HeadOffice/CompanyProfile/Container/index'
import DistributTable from '../../Modules/HeadOffice/Distribution/ViewDistribution/Container/index'
import AddDistribution from '../../Modules/HeadOffice/Distribution/AddDistribution/Container/index'
import { ViewProfile } from '../../Modules/HeadOffice/CompanyProfile/Partial/ViewProfile'
import { AddReceipt } from '../../Modules/HeadOffice/Receipt/AddReceipt'
import { AddVoucher } from '../../Modules/HeadOffice/Voucher/AddVoucher'
import { AddAttendance } from '../../Modules/HeadOffice/Attendance/AddAttendance'
import { DistributorReport } from '../../Modules/HeadOffice/Distribution/ViewReport'
import { CompanyReport } from '../../Modules/HeadOffice/Company/CompanyReport'
import { ViewReceipt } from '../../Modules/HeadOffice/Receipt/ViewReceipt'
import { ViewVoucher } from '../../Modules/HeadOffice/Voucher/ViewVoucher'
import { SalesReport } from '../../Modules/HeadOffice/Reports/Sales'
import { PurchseReport } from '../../Modules/HeadOffice/Reports/Purchase'
import { VoucherReport } from '../../Modules/HeadOffice/Reports/Voucher'
import { ReceiptReport } from '../../Modules/HeadOffice/Reports/Receipt'
import { ProductReport } from '../../Modules/HeadOffice/Reports/Product'
import { DayBookreport } from '../../Modules/HeadOffice/Reports/DayBook'
import ViewAttendance from '../../Modules/HeadOffice/Attendance/ViewAttendance'
import Add_Member from '../../Modules/HeadOffice/Members/AddMembers'
import View_Member from '../../Modules/HeadOffice/Members/ViewMembers'
import Add_salary from '../../Modules/HeadOffice/Salary/AddSalary'
import View_Salary from '../../Modules/HeadOffice/Salary/ViewSalary'
import Add_Bank_Details from '../../Modules/HeadOffice/Bankdetails/AddBank'
import View_Bank_Details from '../../Modules/HeadOffice/Bankdetails/ViewBank'
import { BankIndex } from '../../Modules/HeadOffice/Bankdetails/Bank'
import { BankDetailsFormIndex } from '../../Modules/HeadOffice/Bankdetails/BankForm'
import { InternalTransaction } from '../../Modules/HeadOffice/Bankdetails/Transactions/InternalTransaction'
import { Online_Transaction } from '../../Modules/HeadOffice/Bankdetails/Transactions/OnlineTransaction'
import {InternalTransactionReport } from '../../Modules/HeadOffice/Reports/InternalTransaction/index'
import {OnlineTransactionReport} from '../../Modules/HeadOffice/Reports/OnlineTransaction/index'
// //-------------- HeadOfficeLink Pages end --------------

export const anonymous = [
  {
    routePath: '/signin',
    Component: UserSignin,
  },
]

export const adminAuthenticated = [
  {
    routePath: '/',
    Component: Home,
  },

  // ========  25/5/2023 UPDATES ======
  {
    routePath: 'headoffice_add_receipt/',
    Component: AddReceipt,
  },
  {
    routePath: 'headoffice_view_receipt/',
    Component: ViewReceipt,
  },
  {
    routePath: 'headoffice_add_voucher/',
    Component: AddVoucher,
  },
  {
    routePath: 'headoffice_view_voucher/',
    Component: ViewVoucher,
  },

  // ===========  26-05- NEW PAGES  =========

  {
    routePath: 'headoffice_add_attendance/',
    Component: AddAttendance,
  },
  {
    routePath: 'headoffice_view_attendance/',
    Component: ViewAttendance,
  },
  {
    routePath: 'headoffice_customer_report/',
    Component: DistributorReport,
  },
  {
    routePath: 'headoffice_distributor_report/',
    Component: CompanyReport,
  },
  {
    routePath: 'headoffice_daybook/',
    Component: DayBook_MainOffice,
  },
  // ==========  Reports  ======
  {
    routePath: 'headoffice_Month_SalesReport/',
    Component: SalesReport,
  },
  {
    routePath: 'headoffice_Month_PurchaseReport/',
    Component: PurchseReport,
  },
  {
    routePath: 'headoffice_Month_VoucherReport/',
    Component: VoucherReport,
  },
  {
    routePath: 'headoffice_Month_ReceiptReport/',
    Component: ReceiptReport,
  },
  {
    routePath: 'headoffice_Month_ProductReport/',
    Component: ProductReport,
  },
  {
    routePath: 'headoffice_Month_DaybookReport/',
    Component: DayBookreport,
  },
  {
    routePath: 'headoffice_Month_OnlineTransactionReport/',
    Component: OnlineTransactionReport,
  },
  {
    routePath: 'headoffice_Month_InternalTransactionReport/',
    Component: InternalTransactionReport,
  },




  // ============= Head Office

  {
    routePath: 'headoffice_cmpy_profile/',
    Component: HeadOfficeCompanyProfile,
  },
  {
    routePath: 'headoffice_cmpy_profile_view/',
    Component: ViewProfile,
  },
  {
    routePath: 'headoffice_distributor_outsource/',
    Component: CmpyOutsource,
  },
  {
    routePath: 'headoffice_outsourceview/',
    Component: CompanyView,
  },
  {
    routePath: 'headoffice_add_product/',
    Component: Admin_AddProduct,
  },
  {
    routePath: 'headoffice_view_product/',
    Component: Admin_ViewProduct,
  },
  {
    routePath: 'headoffice_distritale/',
    Component: DistributTable,
  },
  {
    routePath: 'headoffice_customeradmin/',
    Component: AddDistribution,
  },
  {
    routePath: 'headoffice_saleviewdetails/',
    Component: Admin_ViewSale,
  },
  {
    routePath: 'add_headoffice_purchase/',
    Component: AddPurchase,
  },
  {
    routePath: 'headoffice_purchase_view/',
    Component: ViewPurchase,
  },
  {
    routePath: 'headoffice_day_book/',
    Component: DayBook_MainOffice,
  },
  {
    routePath: 'headoffice_stocks/',
    Component: ViewStocks,
  },
  {
    routePath: 'headoffice_sale_order/',
    Component: SaleOrder,
  },
  {
    routePath: 'headoffice_add_member/',
    Component: Add_Member,
  },
  {
    routePath: 'headoffice_view_member/',
    Component: View_Member,
  },
  {
    routePath: 'headoffice_add_salary/',
    Component: Add_salary,
  },
  {
    routePath: 'headoffice_view_salary/',
    Component: View_Salary,
  },
  {
    routePath: 'headoffice_add_bank_details/',
    Component: Add_Bank_Details,
  },
  {
    routePath: 'headoffice_view_bank_details/',
    Component: View_Bank_Details,
  },
  {
    routePath: 'headoffice_bank/',
    Component: BankIndex,
  },
  {
    routePath: 'headoffice_bank_details/',
    Component: BankDetailsFormIndex,
  },
  {
    routePath: 'headoffice_internal_transaction/',
    Component: InternalTransaction,
  }, 
  {
    routePath: 'headoffice_online_transaction/',
    Component: Online_Transaction,
  },

  {
    routePath: '*',
    Component: PageNotFound,
  },
]