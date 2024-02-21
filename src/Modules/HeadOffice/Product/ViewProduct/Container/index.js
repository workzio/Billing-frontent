import { connect } from "react-redux";
import { setProduct, setCategory, setUnit } from '../../action'
import selectors from "../../ProductSelectors";
import Admin_ViewProduct from "../index";


const mapStateToProps = state => ({
    getProduct: selectors.getProduct(state),
    getCategory: selectors.getCategory(state),
    getUnit: selectors.getUnit(state),
})
const mapDispatchToProps = {
    setProduct,
    setCategory,
    setUnit,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin_ViewProduct)

