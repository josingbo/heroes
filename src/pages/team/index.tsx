import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import styled from '../../styles/styled';

import LoadingOverlay from '../../common/Spinner/LoadingOverlay';
import LoadingOverlayInner from '../../common/Spinner/LoadingOverlayInner';
import LoadingSpinner from '../../common/Spinner/LoadingSpinner';
import Container from '../../components/layout/Container';
import Page from '../../components/layout/Page';

import { darken, transparentize } from 'polished';
import { Dispatch } from 'redux';
import { fetchRequest } from '../../actions/team';
import DataTable from '../../components/layout/DataTable';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { Player, Team } from '../../types/team';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean;
    players: Player[];
    team: Team;
    errors?: string;
}

interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest;
}

interface RouteParams {
    id: string;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
    PropsFromDispatch &
    RouteComponentProps<RouteParams> &
    ConnectedReduxProps;

const formatPlayerIcon = (accountId: number) =>
    `https://www.opendota.com/assets/images/dota2/players/${accountId}.png`;

class MyTeam extends React.Component<AllProps> {
    public componentDidMount() {
        const { match } = this.props;

        this.props.fetchRequest(match.params.id);
    }

    public render() {
        const { team, players, loading } = this.props;

        return (
            <Page>
                <Container>
                    <Wrapper>
                        {loading && (
                            <LoadingOverlay>
                                <LoadingOverlayInner>
                                    <LoadingSpinner />
                                </LoadingOverlayInner>
                            </LoadingOverlay>
                        )}
                        {team && (
                            <React.Fragment>
                                <TeamInfobox>
                                    <TeamInfoboxInner>
                                        {team.logo_url && (
                                            <TeamLogo src={team.logo_url} alt={team.tag} />
                                        )}
                                        <TeamInfoboxHeading>
                                            <TeamName>{team.name}</TeamName>
                                        </TeamInfoboxHeading>
                                        <TeamStats>
                                            <TeamStatsInner>
                                                <StatItem>
                                                    <StatHeading>Wins</StatHeading>
                                                </StatItem>
                                                <StatItem>
                                                    <StatHeading>Rating</StatHeading>
                                                    <StatNumber>
                                                        {team.rating.toFixed(0)}
                                                    </StatNumber>
                                                </StatItem>
                                            </TeamStatsInner>
                                        </TeamStats>
                                    </TeamInfoboxInner>
                                </TeamInfobox>
                                {players && (
                                    <TableWrapper>
                                        <h2>Current players</h2>
                                        <DataTable
                                            columns={['Name', 'Games', 'Winrate']}
                                            widths={['auto', '', '']}
                                        >
                                            {players
                                                .filter(
                                                    player => player.is_current_team_member === true
                                                )
                                                .map(player => (
                                                    <tr key={player.account_id}>
                                                        <PlayerDetail>
                                                            <PlayerIcon
                                                                src={formatPlayerIcon(
                                                                    player.account_id
                                                                )}
                                                                alt={player.name}
                                                            />
                                                            <PlayerName>{player.name}</PlayerName>
                                                        </PlayerDetail>
                                                        <td>{player.games_played}</td>
                                                        <td>{player.wins}</td>
                                                    </tr>
                                                ))}
                                        </DataTable>
                                    </TableWrapper>
                                )}
                            </React.Fragment>
                        )}
                    </Wrapper>
                </Container>
            </Page>
        );
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ team }: ApplicationState) => ({
    errors: team.errors,
    loading: team.loading,
    players: team.players,
    team: team.team,
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRequest: (teamId: string) => dispatch(fetchRequest(teamId)),
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyTeam);

const Wrapper = styled('div')`
    position: relative;
`;

const TeamInfobox = styled('div')`
    position: relative;
    background: ${props => transparentize(0.1, props.theme.colors.black)};
    overflow: hidden;
    border-radius: 8px;
    color: ${props => darken(0.25, props.theme.colors.white)};
`;

const TeamInfoboxInner = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    padding: 3rem;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 125px inset;
    z-index: 2;

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        flex-direction: row;
    }
`;

const TeamLogo = styled('img')`
    display: block;
    flex-shrink: 0;
    width: 180px;
    height: 128px;
    padding: 1rem;
    background-color: ${props => transparentize(0.25, props.theme.colors.tableOdd)};
    box-shadow: rgba(0, 0, 0, 0.3) 0px 12px 32px;
    object-fit: contain;
    border-radius: 16px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    border-image: initial;
`;

const TeamInfoboxHeading = styled('div')`
    flex: 1 1 100%;
    margin: 1.5rem 0 0;
    text-align: center;

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        margin: 0 1.5rem;
        text-align: left;
    }
`;

const TeamName = styled('h1')`
    margin: 0;
    color: ${props => props.theme.colors.white};
    font-weight: 500;
`;

const TeamStats = styled('div')`
    display: block;
    max-width: 340px;
    margin: 1.5rem 0 0;
    background: rgba(0, 0, 0, 0.45);
    border-radius: 8px;
    padding: 12px;

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        margin: 0;
        flex: 1 0 340px;
    }
`;

const TeamStatsInner = styled('div')`
    display: flex;
`;

const StatItem = styled('div')`
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1 1 0;
    padding: 0 1rem;
    font-size: 0.8rem;
`;

const StatHeading = styled('h4')`
    margin: 0;
    margin-bottom: 0.2rem;
    font-size: 1rem;
`;

interface StatNumberProps {
    attr?: 'win' | 'loss';
}

const StatNumber = styled('p')`
    margin: 0;
    font-size: 1.5rem;
`;

const TableWrapper = styled('div')`
    position: relative;
    max-width: ${props => props.theme.widths.md};
    margin: 0 auto;
    margin-top: 3rem;
    min-height: 200px;
`;

const PlayerDetail = styled('td')`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const PlayerIcon = styled('img')`
    width: 32px;
    height: 32px;
`;

const PlayerName = styled('div')`
    flex: 1 1 auto;
    height: 100%;
    margin-left: 1rem;

    a {
        color: ${props => props.theme.colors.brand};
    }
`;
