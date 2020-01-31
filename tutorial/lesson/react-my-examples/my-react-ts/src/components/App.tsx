import React from "react";

// React.FC は React.FunctionComponent の短縮形
// @types/reactとlib.dom.d.tsで型が衝突することがあるため、慣習としてReactの型はnamed import({FC} from 'react'みたいなやつ)を避ける
const App: React.FC = () => {
  return <div> Hello World!!! </div>;
};

export default App;