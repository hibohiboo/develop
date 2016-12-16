import { connect } from 'react-redux';
import { setVisibilityFilter } from '../actions';
import Link from '../components/Link';
import { VisibilityFilterType } from '../states/VisibilityFilterType';

interface IState{
  visibilityFilter: VisibilityFilterType
}

interface IProps{
  filter:VisibilityFilterType
}

interface IStateToProps{
  active: boolean
}

interface IDispatchToProps{
  onClick: Function
}

const mapStateToProps = (state:IState, ownProps:IProps):IStateToProps => {
  return { 
    active: ownProps.filter === state.visibilityFilter
  }
}

const mapDispatchToProps = (dispatch, ownProps:IProps):IDispatchToProps => {
  return {
    onClick: () => {
      dispatch(setVisibilityFilter(ownProps.filter))
    }
  }
}

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link);

export default FilterLink