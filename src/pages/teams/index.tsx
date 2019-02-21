import moment from 'moment';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import LoadingOverlay from '../../common/Spinner/LoadingOverlay';
import LoadingOverlayInner from '../../common/Spinner/LoadingOverlayInner';
import LoadingSpinner from '../../common/Spinner/LoadingSpinner';
import Container from '../../components/layout/Container';
import DataTable from '../../components/layout/DataTable';
import Page from '../../components/layout/Page';
import styled from '../../styles/styled';

import { Dispatch } from 'redux';
import { fetchRequest } from '../../actions/teams';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import { Team } from '../../types/team';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean;
    data: Team[];
    errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps;

class Teams extends React.Component<AllProps> {
    public componentDidMount() {
        const { data } = this.props;

        if (data.length === 0) {
            this.props.fetchRequest();
        }
    }

    public render() {
        const { loading } = this.props;

        return (
            <Page>
                <Container>
                    <TableWrapper>
                        {loading && (
                            <LoadingOverlay>
                                <LoadingOverlayInner>
                                    <LoadingSpinner />
                                </LoadingOverlayInner>
                            </LoadingOverlay>
                        )}
                        {this.renderData()}
                    </TableWrapper>
                </Container>
            </Page>
        );
    }

    private renderData() {
        const { data } = this.props;

        return (
            <DataTable
                columns={['Rank', 'Team', 'Rating', 'Wins / Losses', 'Last Match']}
                widths={['', 'auto', '', '', '']}
            >
                {data.slice(0, 20).map((team, i) => {
                    const lastMatch = moment(team.last_match_time * 1000);

                    return (
                        <tr key={team.team_id}>
                            <td>{i + 1}</td>
                            <TeamDetail>
                                {team.logo_url && <TeamLogo src={team.logo_url} alt={team.tag} />}
                                <TeamName>
                                    <Link to={`/teams/${team.team_id}`}>{team.name}</Link>
                                </TeamName>
                            </TeamDetail>
                            <td>{team.rating.toFixed(0)}</td>
                            <td>
                                {team.wins || 0} / {team.losses || 0}
                            </td>
                            <td>
                                <time
                                    dateTime={lastMatch.toISOString()}
                                    title={lastMatch.format('LLLL')}
                                >
                                    {lastMatch.fromNow()}
                                </time>
                            </td>
                        </tr>
                    );
                })}
            </DataTable>
        );
    }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ teams }: ApplicationState) => ({
    data: teams.data,
    errors: teams.errors,
    loading: teams.loading,
});

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
    fetchRequest: () => dispatch(fetchRequest()),
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Teams);

const TableWrapper = styled('div')`
    position: relative;
    max-width: ${props => props.theme.widths.md};
    margin: 0 auto;
    min-height: 200px;
`;

const TeamDetail = styled('td')`
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 66px;
`;

const TeamLogo = styled('img')`
    width: 50px;
    height: 50px;
`;

const TeamName = styled('div')`
    flex: 1 1 auto;
    height: 100%;
    margin-left: 1rem;

    a {
        color: ${props => props.theme.colors.brand};
    }
`;
