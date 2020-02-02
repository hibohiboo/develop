import React from "react";
import { useDispatch } from "react-redux";
import Link from './Link';
import visibilityFilterModules from '../module/visibilityFilterModules';

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const visibilityFilter = visibilityFilterModules.actions.visibilityFilter;

  return <p>
    Show:
  {" "}
    <Link onClick={() => dispatch(visibilityFilter('SHOW_ALL'))}>
      All
  </Link>
    {", "}
    <Link onClick={() => dispatch(visibilityFilter('SHOW_ACTIVE'))}>
      Active
  </Link>
    {", "}
    <Link onClick={() => dispatch(visibilityFilter('SHOW_COMPLETED'))}>
      Completed
  </Link>
  </p>;
};

export default Footer;