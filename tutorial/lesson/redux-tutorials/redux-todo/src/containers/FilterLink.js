import { connect } from 'react-redux'
import { setVisibilityFilter } from '../actions'
import Link from '../components/Link'

// mapStateToProps(state, [ownProps])
const mapStateToProps = (state, ownProps) => {
  // Linkコンポーネントが現在の状態を知るために、props.activeとして値を渡す。
  return {
    // 現在のフィルターの値（state.visibilityFilter）を自身のpropsの値と比較
    active: ownProps.filter === state.visibilityFilter
  }
}

// 引数は mapDispatchToProps(dispatch, [ownProps])
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => {
      dispatch(
        // 自身のpropsのフィルターの値をsetVisibilityFilter関数に渡す
        setVisibilityFilter(ownProps.filter)
      )
    }
  }
}

// connectの引数は、connect([mapStateToProps], [mapDispatchToProps])であるため、
// mapDispatchToPropsだけを使うときでも、mapStateToPropsが必要。

const FilterLink = connect(
  mapStateToProps,
  mapDispatchToProps
)(Link)

export default FilterLink