import { Reducer } from 'redux';
import { TeamsActionTypes, TeamsState } from '../types/teams';

// Type-safe initialState!
const initialState: TeamsState = {
    data: [],
    errors: undefined,
    loading: false,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const teamsReducer: Reducer<TeamsState> = (state = initialState, action) => {
    switch (action.type) {
        case TeamsActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true };
        }
        case TeamsActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload };
        }
        case TeamsActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

// Instead of using default export, we use named exports. That way we can group these exports
// inside the `index.js` folder.
export default teamsReducer;
