import * as React from 'react';
import { Props, Component} from 'react';
interface IProps extends Props<MobileTearSheet>{
  children?:any;
};
interface IState {};

class MobileTearSheet extends React.Component<IProps, IState> {

  render() {
    // const {
    //   prepareStyles,
    // } = this.context.muiTheme;

    const styles = {
      root: {
        marginBottom: 24,
        marginRight: 24,
        maxWidth: 360,
        width: '100%',
      },
      container: {
        border: 'solid 1px #d9d9d9',
        overflow: 'hidden',
      },
      bottomTear: {
        display: 'block',
        position: 'relative',
        marginTop: -10,
        maxWidth: 360,
      },
    };

    return (
      // <div style={prepareStyles(styles.root)}>
      //   <div style={prepareStyles(styles.container)}>
      //     {this.props.children}
      //   </div>
      // </div>
      <div style={styles.root}>
        <div style={styles.container}>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default MobileTearSheet;