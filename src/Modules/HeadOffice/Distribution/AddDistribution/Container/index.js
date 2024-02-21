import { connect } from "react-redux";
import AddDistribution from "../index";
import { setUpdateDistribute } from '../../actions'
import selectors from "../../DistributeSelectors";



const mapStateToProps = state =>({
    getDistribute :selectors.getDistribute(state),
})
const mapDispatchToProps = {
    setUpdateDistribute,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddDistribution)

  