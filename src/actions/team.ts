import { action } from 'typesafe-actions';
import { Player, Team, TeamActionTypes } from './../types/team';

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchRequest = (teamId: string) => action(TeamActionTypes.FETCH_REQUEST, teamId);
export const fetchSuccess = (team: Team, players: Player[]) =>
    action(TeamActionTypes.FETCH_SUCCESS, { team, players });
export const fetchError = (message: string) => action(TeamActionTypes.FETCH_ERROR, message);
