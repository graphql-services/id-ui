import 'moment/locale/cs';
import 'antd/dist/antd.css';

import * as React from 'react';

import { BrowserRouter, Route, RouteComponentProps } from 'react-router-dom';

// import { CommentsTable } from './components/comments-table';
// import { NotificationsMenu } from 'webpanel-notifications';
// import { INotificationData } from 'webpanel-notifications/lib/NotificationsMenu';
import { ApolloProvider } from 'react-apollo';
import { ForgotPasswordForm } from './components/forgot-password/ForgotPasswordForm';
import { InvitationConfirmForm } from './components/invitation/InvitationConfirmForm';
// import { Route } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { LoginForm } from './components/login/LoginForm';
import { ResetPasswordForm } from './components/reset-password/ResetPasswordForm';
// import { ENV } from './env';
// import { Redirect } from 'react-router';
import { client } from './graphql';
// import cs_CZ from 'antd/lib/locale-provider/cs_CZ';
import en_US from 'antd/lib/locale-provider/en_GB';

// Localization

export const App = () => {
  return (
    <ApolloProvider client={client}>
      <LocaleProvider locale={en_US}>
        <BrowserRouter>
          <Route path="/" exact={true} component={() => <LoginForm />} />
          <Route
            path="/confirm-invitation/:id"
            component={({ match }: RouteComponentProps<any>) => (
              <InvitationConfirmForm requestID={match.params.id} />
            )}
          />
          <Route
            path="/reset-password/:id"
            component={({ match }: RouteComponentProps<any>) => (
              <ResetPasswordForm requestID={match.params.id} />
            )}
          />
          <Route
            path="/forgot-password"
            component={(props: RouteComponentProps<any>) => (
              <ForgotPasswordForm onCancel={() => props.history.push('/')} />
            )}
          />
          <Route path="/register" component={() => <a>aaa</a>} />
        </BrowserRouter>
      </LocaleProvider>
    </ApolloProvider>
  );
};
