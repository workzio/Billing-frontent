import { connect } from "react-redux";
import HeadOfficeCompanyProfile from "../index";
import { setCompanyProfile } from "../action";
import selectors from "../selector";

const mapStateToProps = state =>({
    getCompanyProfile:selectors.getCompanyProfile(state),
})
const mapDispatchToProps = {
    setCompanyProfile
}

export default connect(mapStateToProps, mapDispatchToProps)(HeadOfficeCompanyProfile)

  