// This file holds our state type, as well as any other types related to this Redux store.

// Response object for GET /heroes
// https://docs.opendota.com/#tag/heroes%2Fpaths%2F~1heroes%2Fget
export interface Hero extends ApiResponse {
    id: number;
    name: string;
    localized_name: string;
    primary_attr: string;
    attack_type: string;
    roles: string[];
    img: string;
    icon: string;
    legs: number;
}

// This type is basically shorthand for `{ [key: string]: any }`. Feel free to replace `any` with
// the expected return type of your API response.
type ApiResponse = Record<string, any>;

// Define however naming conventions you'd like for your action types, but
// personally, I use the `@@context/ACTION_TYPE` convention, to follow the convention
// of Redux's `@@INIT` action.
export const HeroesActionTypes = {
    FETCH_ERROR: '@@heroes/FETCH_ERROR',
    FETCH_REQUEST: '@@heroes/FETCH_REQUEST',
    FETCH_SUCCESS: '@@heroes/FETCH_SUCCESS',
    SELECTED: '@@heroes/SELECTED',
    SELECT_HERO: '@@heroes/SELECT_HERO',
};

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface HeroesState {
    readonly loading: boolean;
    readonly data: Hero[];
    readonly errors?: string;
}
