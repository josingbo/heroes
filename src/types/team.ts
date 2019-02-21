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

export interface Player {
    account_id: number;
    name: string;
    games_played: number;
    wins: number;
    is_current_team_member: boolean;
}

export interface TeamSelectedPayload {
    detail: Team;
    players: Player[];
}

export const TeamActionTypes = {
    FETCH_ERROR: '@@teams/FETCH_ERROR',
    FETCH_REQUEST: '@@teams/FETCH_REQUEST',
    FETCH_SUCCESS: '@@teams/FETCH_SUCCESS',
};

export interface TeamState {
    readonly loading: boolean;
    readonly team: Team;
    readonly players: Player[];
    readonly errors?: string;
}
