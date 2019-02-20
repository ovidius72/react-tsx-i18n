import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import LoadingOverlayInner from 'src/components/data/LoadingOverlayInner';
import LoadingSpinner from 'src/components/data/LoadingSpinner';
import Container from 'src/components/layout/Container';
import DataTable from 'src/components/layout/DataTable';
import Page from 'src/components/layout/Page';
import styled from 'src/utils/styled';

import LoadingOverlay from '../../components/data/LoadingOverlay';
import { IApplicationState } from '../../store';
import { fetchRequest } from '../../store/users/actions';
import { IUser } from '../../store/users/types';

type PropsFromState = {
  loading: boolean;
  data: IUser[];
  errors?: string;
};

type PropsFromDispatch = {
  fetchRequest: typeof fetchRequest;
};

type AllProps = PropsFromState & PropsFromDispatch;

class UsersIndexPage extends React.Component<AllProps, any> {
  componentDidMount() {
    this.props.fetchRequest();
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
            <p>
              <small>*in last 30 days</small>
            </p>
            {this.renderData()}
          </TableWrapper>
        </Container>
      </Page>
    );
  }

  private renderData() {
    const { loading, data } = this.props;
    return (
      <DataTable columns={['User', 'Created']} widths={['auto', '']}>
        {loading &&
        data.length === 0 && (
          <UserLoading>
            <td colSpan={3}>Loading...</td>
          </UserLoading>
        )}
        {data.map(user => (
          <tr key={user.id}>
            <UserDetail>
              <UserIcon src="http://kinecorder.com/wp-content/uploads/2017/06/avatar_male.png" />
              <UserName>
                <Link to={`/users/${user.username}`}>{user.username}</Link>
              </UserName>
            </UserDetail>
            <td>
              {new Date(user.createdAt).toLocaleDateString()} - {new Date(user.createdAt).toLocaleTimeString()}
            </td>
          </tr>
        ))}
      </DataTable>
    );
  }
}

const mapStateToProps = ({ users }: IApplicationState) => ({
  loading: users.loading,
  errors: users.errors,
  data: users.data
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest())
});

export default connect(mapStateToProps, mapDispatchToProps)(UsersIndexPage);

const UserDetail = styled.td`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const UserIcon = styled.img`
  width: 48px;
  height: 48px;
`;

const UserName = styled.div`
  flex: 1 1 auto;
  height: 100%;
  margin-left: 1rem;
  a {
    color: ${p => p.theme.colors.brand};
  }
`;

const UserLoading = styled.tr`
  td {
    height: 48px;
    text-align: 'center';
  }
`;

const TableWrapper = styled.div`
  position: relative;
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  min-height: 200px;
`;
