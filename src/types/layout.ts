// Example for using discriminated union types.
export type ThemeColors = 'light' | 'dark';

// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const LayoutActionTypes = { SET_THEME: '@@layout/SET_THEME' };

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability

export interface LayoutState {
    readonly theme: ThemeColors;
}
