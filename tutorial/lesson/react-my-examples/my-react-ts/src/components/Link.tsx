import React from "react";

const Link: React.FC<{ children: any, onClick: () => void }> = ({ children, onClick }) => {
  return <a href="#" onClick={(e) => { e.preventDefault(); onClick(); }}>{children}</a>;
};

export default Link;