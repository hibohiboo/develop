import * as React from 'react';
import { Props, Component} from 'react';

interface IProps extends Props<TragedySet>{
  name: string;
};
interface IState {};

class TragedySet extends React.Component<IProps, IState> {
  render(): JSX.Element{
    return (
      <div>
        {this.props.name}
      </div>
    );
  }
 }

 export default TragedySet;