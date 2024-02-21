import { connect } from "react-redux";
import Admin_AddMember from "../index";
import { setMember } from "../../action";
import adminaddproduct from "../../MemberSelectors";


const mapStateToProps = state =>({
    getMember:adminaddproduct.getMember(state),
})
const mapDispatchToProps = {
    setMember,
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin_AddMember)

  