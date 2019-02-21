// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /teams
// https://docs.opendota.com/#tag/teams%2Fpaths%2F~1teams%2Fget
export interface Team {
    team_id: number;
    rating: number;
    wins: number;
    losses: number;
    last_match_time: number;
    name: string;
    tag?: string;
    logo_url?: string;
}

// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const TeamsActionTypes = {
    FETCH_ERROR: '@@teams/FETCH_ERROR',
    FETCH_REQUEST: '@@teams/FETCH_REQUEST',
    FETCH_SUCCESS: '@@teams/FETCH_SUCCESS',
};

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface TeamsState {
    readonly loading: boolean;
    readonly data: Team[];
    readonly errors?: string;
}
