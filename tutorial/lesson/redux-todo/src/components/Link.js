import React, { PropTypes } from 'react'

// props.childrenはコンポーネントの中身を取得できる
// Linkコンポーネントを使うときの、<Link>xxx</Link>のxxx

const Link = ({ children, onClick }) => (
  <a href="#">{children}</a>
)

Link.propTypes = {
  children: PropTypes.node.isRequired
}

export default Link