import React from "react";

const Link: React.FC<{ active: boolean, children: any, onClick: () => void }> = ({ active, children, onClick }) => {
  if (active) {
    return <span>{children}</span>;
  }
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  return <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}>{children}</a>;
};

export default Link;