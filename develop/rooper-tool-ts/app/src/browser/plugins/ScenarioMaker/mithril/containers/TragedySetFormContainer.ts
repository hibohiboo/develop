import TragedySetForm from '../components/InputForm/TragedySetForm';
import { connect } from '../mithril-redux';

function mapStateToProps(state) {
  return  { tragedySetList: state.tragedySetList };
}

export default connect(mapStateToProps)(TragedySetForm);
