import { setVisibilityFilter, VisibilityFilterType  } from '../actions/filter';
import Link from '../components/Link';
import { connect } from '../mithril-redux';

interface IOwnProps {
  filter: VisibilityFilterType;
}

interface IDispatchToProps {
  onClick: () => void;
}

const mapStateToProps = (state, ownProps: IOwnProps) => {
  return {
    active: ownProps.filter === state.visibilityFilter,
  };
};
const mapDispatchToProps = (dispatch, ownProps: IOwnProps): IDispatchToProps => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Link);
