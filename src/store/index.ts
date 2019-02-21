import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import { Action, AnyAction, combineReducers, Dispatch } from 'redux';
import { all, fork } from 'redux-saga/effects';

import HeroesReducer from '../reducers/heroes';
import LayoutReducer from '../reducers/layout';
import TeamReducer from '../reducers/team';
import TeamsReducer from '../reducers/teams';

import { TeamState } from '../types/team';
import { TeamsState } from '../types/teams';
import { HeroesState } from './../types/heroes';
import { LayoutState } from './../types/layout';

import heroesSaga from '../sagas/heroes';
import teamSaga from '../sagas/team';
import teamsSaga from '../sagas/teams';

// The top-level state object
export interface ApplicationState {
    layout: LayoutState;
    heroes: HeroesState;
    team: TeamState;
    teams: TeamsState;
}

// Additional props for connected React components. This prop is passed by default with `connect()`
export interface ConnectedReduxProps<A extends Action = AnyAction> {
    dispatch: Dispatch<A>;
}

// Whenever an action is dispatched, Redux will update each top-level application state property
// using the reducer with the matching name. It's important that the names match exactly, and that
// the reducer acts on the corresponding ApplicationState property type.
export const rootReducer = (history: History) =>
    combineReducers({
        heroes: HeroesReducer,
        layout: LayoutReducer,
        router: connectRouter(history),
        team: TeamReducer,
        teams: TeamsReducer,
    });

// Here we use `redux-saga` to trigger actions asynchronously. `redux-saga` uses something called a
// "generator function", which you can read about here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function*
export function* rootSaga() {
    yield all([fork(heroesSaga), fork(teamsSaga), fork(teamSaga)]);
}
