import * as React from 'react';
import VisibleTodoList from '../containers/VisibleTodoList'

class App extends React.Component<any, any> {
    render() {
        return (
            <div>
                <VisibleTodoList />
            </div>            
        );
    }
}

export default App