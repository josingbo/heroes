import { Reducer } from 'redux';
import { HeroesActionTypes, HeroesState } from '../types/heroes';

// Type-safe initialState!
const initialState: HeroesState = {
    data: [],
    errors: undefined,
    loading: false,
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const HeroesReducer: Reducer<HeroesState> = (state = initialState, action: any) => {
    switch (action.type) {
        case HeroesActionTypes.FETCH_REQUEST: {
            return { ...state, loading: true };
        }
        case HeroesActionTypes.FETCH_SUCCESS: {
            return { ...state, loading: false, data: action.payload };
        }
        case HeroesActionTypes.FETCH_ERROR: {
            return { ...state, loading: false, errors: action.payload };
        }
        default: {
            return state;
        }
    }
};

export default HeroesReducer;
