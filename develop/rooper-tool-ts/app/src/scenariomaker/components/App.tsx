import * as React from 'react';
import SecretCardContainer from '../containers/SecretCardContainer';
import OpenCardContainer from '../containers/OpenCardContainer';
import InputForm from './InputForm/index';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import * as injectTapEventPlugin from 'react-tap-event-plugin';

const App = () => (
  <div>
    <InputForm />
    <div style={{display:"flex", flexWrap:"wrap"}} >
        <SecretCardContainer />
        <OpenCardContainer />
    </div>
  </div>
);

// Needed for onTouchTap
injectTapEventPlugin();

const MuiApp =()=>(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);

export default MuiApp;


