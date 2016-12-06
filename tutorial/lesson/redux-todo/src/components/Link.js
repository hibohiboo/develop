import React, { PropTypes } from 'react'


const Link = ({ children, onClick }) => (
  <a href="#"
    onClick={(e) => {
      e.preventDefault()
      onClick()
    }}
  >
  {/* props.childrenはコンポーネントの中身を取得できる
      Linkコンポーネントを使うときの、<Link>xxx</Link>のxxx */}
    {children}
  </a>
)

Link.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired
}
export default Link