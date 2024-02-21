import { connect } from "react-redux";
import { setDistribute } from '../../actions'
import selectors from "../../DistributeSelectors";
import DistributTable from "../index";



const mapStateToProps = state =>({
    getDistribute :selectors.getDistribute(state),
})
const mapDispatchToProps = {
    setDistribute,
}

export default connect(mapStateToProps, mapDispatchToProps)(DistributTable)
