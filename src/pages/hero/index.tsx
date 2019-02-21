import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';

import Container from '../../components/layout/Container';
import Page from '../../components/layout/Page';

import LoadingOverlay from '../../common/Spinner/LoadingOverlay';
import LoadingOverlayInner from '../../common/Spinner/LoadingOverlayInner';
import LoadingSpinner from '../../common/Spinner/LoadingSpinner';

import { darken } from 'polished';
import { Dispatch } from 'redux';
import { fetchRequest } from '../../actions/heroes';
import { ApplicationState, ConnectedReduxProps } from '../../store';
import styled from '../../styles/styled';
import { Hero } from '../../types/heroes';

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
    loading: boolean;
    data: Hero[];
    errors?: string;
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
    fetchRequest: typeof fetchRequest;
}

interface RouteParams {
    name: string;
}

interface State {
    selected?: Hero;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState &
    PropsFromDispatch &
    RouteComponentProps<RouteParams> &
    ConnectedReduxProps;

const API_ENDPOINT = 'https://api.opendota.com';

class MyHero extends React.Component<AllProps, State> {
    constructor(props: AllProps) {
        super(props);

        this.state = {
            selected: undefined,
        };
    }

    public componentDidMount() {
        const { data } = this.props;

        if (!data || data.length === 0) {
            this.props.fetchRequest();
        }
    }

    public render() {
        const { data, loading, match } = this.props;
        const selected = data.find(hero => hero.name === match.params.name);

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
                        {selected && (
                            <HeroInfobox>
                                <HeroInfoboxBlurBackground src={API_ENDPOINT + selected.img} />
                                <HeroInfoboxInner>
                                    <HeroInfoboxImage src={API_ENDPOINT + selected.img} />
                                    <HeroInfoboxHeading>
                                        <HeroName>{selected.localized_name}</HeroName>
                                        <HeroDetails>
                                            {selected.attack_type} -{' '}
                                            <span>{selected.roles.join(', ')}</span>
                                        </HeroDetails>
                                    </HeroInfoboxHeading>
                                    <HeroStats>
                                        <HeroStatsInner />
                                    </HeroStats>
                                </HeroInfoboxInner>
                            </HeroInfobox>
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
const mapStateToProps = ({ heroes }: ApplicationState) => ({
    data: heroes.data,
    errors: heroes.errors,
    loading: heroes.loading,
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
)(MyHero);

const Wrapper = styled('div')`
    position: relative;
`;

const HeroInfobox = styled('div')`
    position: relative;
    background: rgba(0, 0, 0, 0.9);
    overflow: hidden;
    border-radius: 8px;
    color: ${props => darken(0.25, props.theme.colors.white)};
`;

const HeroInfoboxBlurBackground = styled('img')`
    position: absolute;
    top: -12.5%;
    left: -12.5%;
    width: 125%;
    height: 125%;
    filter: blur(25px);
    object-fit: cover;
    opacity: 0.35;
    background-repeat: no-repeat;
    z-index: 1;
`;

const HeroInfoboxInner = styled('div')`
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

const HeroInfoboxImage = styled('img')`
    display: block;
    flex-shrink: 0;
    width: 180px;
    height: 128px;
    box-shadow: rgba(0, 0, 0, 0.3) 0px 12px 32px;
    object-fit: cover;
    border-radius: 16px;
    border-width: 1px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0.3);
    border-image: initial;
`;

const HeroInfoboxHeading = styled('div')`
    flex: 1 1 100%;
    margin: 1.5rem 0 0;
    text-align: center;

    @media (min-width: ${props => props.theme.breakpoints.lg}) {
        margin: 0 1.5rem;
        text-align: left;
    }
`;

const HeroName = styled('h1')`
    margin: 0;
    color: ${props => props.theme.colors.white};
    font-weight: 500;
`;

const HeroDetails = styled('p')`
    margin: 0.5rem 0 0;
    color: ${props => props.theme.colors.white};
    font-size: 0.8rem;
    letter-spacing: 1px;
    text-transform: uppercase;

    & span {
        color: ${props => darken(0.25, props.theme.colors.white)};
    }
`;

const HeroStats = styled('div')`
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

const HeroStatsInner = styled('div')`
    display: flex;
`;

interface StatAttributeProps {
    attr: 'str' | 'agi' | 'int';
    isPrimaryAttr?: boolean;
}

const StatAttribute = styled('div')`
    display: flex;
    align-items: center;
    flex: 1 1 0;
    padding: 0 1rem;
    font-size: 0.8rem;
`;

interface BulletProps {
    attr: 'str' | 'agi' | 'int';
}

const Bullet = styled('div')`
    flex-shrink: 0;
    height: 0.5rem;
    width: 0.5rem;
    margin-right: 8px;
    border-radius: 50%;
`;
