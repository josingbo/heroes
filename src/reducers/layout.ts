import { Reducer } from 'redux';
import { LayoutActionTypes, LayoutState } from '../types/layout';

// Type-safe initialState!
const initialState: LayoutState = {
    theme: 'light',
};

// Thanks to Redux 4's much simpler typings, we can take away a lot of typings on the reducer side,
// everything will remain type-safe.
const LayoutReducer: Reducer<LayoutState> = (state = initialState, action: any) => {
    switch (action.type) {
        case LayoutActionTypes.SET_THEME: {
            return { ...state, theme: action.payload };
        }
        default: {
            return state;
        }
    }
};

export default LayoutReducer;
