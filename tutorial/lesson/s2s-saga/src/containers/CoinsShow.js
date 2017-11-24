import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions'
import styled from 'styled-components'
import { Link} from 'react-router'
import {Breadcrumb,ListGroup,ListGroupItem,PageHeader,Panel} from 'react-bootstrap';

class CoinsShow extends Component{
  componentDidMount(){
   this.props.getCoinRequest(this.props.params.id)
  }
  render () {
    const { coin } = this.props
    return (
      <Wrapper>
        <PageHeader>Coins Show</PageHeader>
        <Breadcrumb>
          <Breadcrumb.Item>
            <Link to='/'>Home</Link>
          </Breadcrumb.Item>
          <Breadcrumb.Item active>
            {coin.name}
          </Breadcrumb.Item>
        </Breadcrumb>
        <Panel header={coin.name}>
          <ListGroup>
            <ListGroupItem><small>id: {coin.id}</small></ListGroupItem>
            <ListGroupItem><small>name: {coin.name} </small></ListGroupItem>
            <ListGroupItem><small>symbol: {coin.symbol} </small></ListGroupItem>
            <ListGroupItem><small>rank: {coin.rank} </small></ListGroupItem>
            <ListGroupItem><small>price_usd: {coin.price_usd} </small></ListGroupItem>
            <ListGroupItem><small>price_btc: {coin.price_btc} </small></ListGroupItem>
            <ListGroupItem><small>24h_volume_usd: {coin["24h_volume_usd"]} </small></ListGroupItem>
            <ListGroupItem><small>market_cap_usd: {coin.market_cap_usd} </small></ListGroupItem>
            <ListGroupItem><small>available_supply: {coin.available_supply} </small></ListGroupItem>
            <ListGroupItem><small>total_supply: {coin.total_supply} </small></ListGroupItem>
            <ListGroupItem><small>max_supply: {coin.max_supply} </small></ListGroupItem>
            <ListGroupItem><small>percent_change_1h: {coin.percent_change_1h} </small></ListGroupItem>
            <ListGroupItem><small>percent_change_24h: {coin.percent_change_24h} </small></ListGroupItem>
            <ListGroupItem><small>percent_change_7d: {coin.percent_change_7d} </small></ListGroupItem>
            <ListGroupItem><small>last_updated: {coin.last_updated}</small></ListGroupItem>
          </ListGroup>
        </Panel>
      </Wrapper>
    )
  }
}

CoinsShow.propTypes = {}


const Wrapper = styled.div`
  margin: 25px 40px;
`

const mapStateToProps = (state, ownProps) => {
  return {
    coin: state.coin.coin
  }
}
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCoinRequest: bindActionCreators( actions.getCoinRequest, dispatch)
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(CoinsShow)