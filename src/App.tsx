import * as React from 'react';
import { connect } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { History } from 'history';
import { ThemeProvider } from 'emotion-theming';

import Routes from './routes';
import { ApplicationState } from './store';
import * as themes from './styles/theme';
import { ThemeColors } from './types/layout';

// Separate props from state and props from dispatch to their own interfaces.
interface PropsFromState {
    theme: ThemeColors;
}

interface PropsFromDispatch {
    [key: string]: any;
}

// Any additional component props go here.
interface OwnProps {
    history: History;
}

// Create an intersection type of the component props and our Redux props.
type AllProps = PropsFromState & PropsFromDispatch & OwnProps;

class App extends React.Component<AllProps> {
    public render() {
        const { history, theme } = this.props;

        return (
            <ConnectedRouter history={history}>
                <ThemeProvider theme={themes[theme]}>
                    <Routes />
                </ThemeProvider>
            </ConnectedRouter>
        );
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ layout }: ApplicationState) => ({
    theme: layout.theme,
});

// Normally you wouldn't need any generics here (since types infer from the passed functions).
// But since we pass some props from the `index.js` file, we have to include them.
// For an example of a `connect` function without generics, see `./containers/LayoutContainer`.
export default connect(mapStateToProps)(App);
