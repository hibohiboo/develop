import React from "react";
import { useDispatch } from "react-redux";
import Link from './Link';
import visibilityFilterModules, { useVisibleFilter } from '../module/visibilityFilterModules';

const Footer: React.FC = () => {
  const dispatch = useDispatch();
  const visibilityFilter = visibilityFilterModules.actions.visibilityFilter;
  const filter = useVisibleFilter();

  return <p>
    Show:
  {" "}
    <Link onClick={() => dispatch(visibilityFilter('SHOW_ALL'))} active={filter === 'SHOW_ALL'}>
      All
  </Link>
    {", "}
    <Link onClick={() => dispatch(visibilityFilter('SHOW_ACTIVE'))} active={filter === 'SHOW_ACTIVE'}>
      Active
  </Link>
    {", "}
    <Link onClick={() => dispatch(visibilityFilter('SHOW_COMPLETED'))} active={filter === 'SHOW_COMPLETED'}>
      Completed
  </Link>
  </p>;
};

export default Footer;