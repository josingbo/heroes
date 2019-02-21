import { Reducer } from 'redux';
import { Team, TeamActionTypes, TeamState } from '../types/team';

export const createTeam = (): Team => ({
    name: '',
    // tslint:disable-next-line:object-literal-sort-keys
    last_match_time: -1,
    logo_url: '',
    losses: -1,
    rating: -1,
    tag: '',
    team_id: -1,
    wins: -1,
});

// Type-safe initialState!
const initialState: TeamState = {
    errors: undefined,
    loading: false,
    players: [],
    team: createTeam(),
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const teamReducer: Reducer<TeamState> = (state = initialState, action: any) => {
    switch (action.type) {
        case TeamActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true };
        }
        case TeamActionTypes.FETCH_SUCCESS: {
            return {
                ...state,
                loading: false,
                players: action.payload.players,
                team: action.payload.team,
            };
        }
        case TeamActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

export default teamReducer;
