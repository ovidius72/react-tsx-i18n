import React from 'react';
import { connect } from 'react-redux';
import { Route, RouteComponentProps, Switch } from 'react-router-dom';

import UserIndexPage from '../pages/users/UserIndexPage';
import { IApplicationState, IConnectedReduxProps } from '../store';
import { IUser } from '../store/users/types';

// import HeroesIndexPage from './heroes/index'
// import ShowHeroesPage from './heroes/show'
// Separate state props + dispatch props to their own interfaces.
interface IPropsFromState {
  loading: boolean;
  data: IUser[];
  errors?: string;
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = IPropsFromState & RouteComponentProps<{}> & IConnectedReduxProps;

class UsersPage extends React.Component<AllProps> {
  public render() {
    const { match } = this.props;

    return (
      <Switch>
        <Route exact path={match.path + '/'} component={UserIndexPage} />
        <Route path={match.path + '/:name'} component={() => <div>User detail</div>} />
      </Switch>
    );
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ users }: IApplicationState) => ({
  data: users.data,
  errors: users.errors,
  loading: users.loading
});

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(mapStateToProps)(UsersPage);
