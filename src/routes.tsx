import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

import Header from './components/layout/Header';
import Root from './components/layout/Root';
import myHero from './pages/hero';
import Heroes from './pages/heroes';
import Home from './pages/home/index';
import Team from './pages/team';
import Teams from './pages/teams';

const Routes: React.SFC = () => (
    <Root>
        <Header title="Heroes" />
        <Switch>
            <Route exact={true} path="/" component={Home} />
            <Route exact={true} path="/heroes" component={Heroes} />
            <Route exact={true} path="/heroes/:name" component={myHero} />
            <Route exact={true} path="/teams" component={Teams} />
            <Route exact={true} path="/teams/:id" component={Team} />
            {/* tslint:disable-next-line:jsx-no-lambda */}
            <Route component={() => <div>Not Found</div>} />
        </Switch>
    </Root>
);

export default Routes;
