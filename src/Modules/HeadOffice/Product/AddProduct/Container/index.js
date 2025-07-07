import { connect } from "react-redux";
import Admin_AddProduct from "../index";
import { setProduct,setCategory } from '../../action'
import selectors from '../../ProductSelectors'


const mapStateToProps = state =>({
    getProduct :selectors.getProduct(state),
    getCategory :selectors.getCategory(state),
})
const mapDispatchToProps = {
    setProduct,setCategory,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin_AddProduct)

  