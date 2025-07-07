import { connect } from "react-redux";
import { setCompany } from '../../actions'
import selectors from "../../CompanySelectors";
import CompanyView from "../index";




const mapStateToProps = state =>({
    getCompany :selectors.getCompany(state),
})
const mapDispatchToProps = {
    setCompany,
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyView)

  