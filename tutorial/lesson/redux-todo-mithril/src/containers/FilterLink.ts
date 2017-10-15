import { setVisibilityFilter, VisibilityFilterType  } from '../actions/filter';
import Link from '../components/Link';
import { connect } from '../mithril-redux';

interface IOwnProps {
  filter: VisibilityFilterType;
}

const mapStateToProps = (state, ownProps: IOwnProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
    filter: ownProps.filter
  };
};

export default connect(
  mapStateToProps,
  null,
)(Link);
