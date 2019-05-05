import * as React from 'react';

import { Alert, Button, Input, Modal } from 'antd';
import { Form, FormField } from 'webpanel-antd';
import { Mutation, MutationFn } from 'react-apollo';

import { FormContext } from 'webpanel-antd/lib/form/form/Form';
import { RESET_PASSWORD_MUTATION } from 'src/graphql/mutations/reset-password';

export interface IResetPasswordFormProps {
  requestID: string;
  onSuccess?: () => void;
}
export interface IResetPasswordFormState {
  sending: boolean;
  error?: Error;
}

export class ResetPasswordForm extends React.Component<
  IResetPasswordFormProps,
  IResetPasswordFormState
> {
  public state: IResetPasswordFormState = { sending: false };

  public checkConfirm = (context: FormContext) => (
    rule: any,
    value: any,
    callback: any
  ) => {
    if (value && value !== context.form.getFieldValue('password')) {
      callback('Passwords do not match');
    } else {
      callback();
    }
  };

  public render() {
    const { sending, error } = this.state;
    const { requestID } = this.props;

    return (
      <Mutation mutation={RESET_PASSWORD_MUTATION}>
        {(confirm: MutationFn<any, any>) => (
          <Form
            onSave={async values => {
              this.setState({ sending: true, error: undefined });

              try {
                await confirm({
                  variables: { requestID, password: values.password }
                });
              } catch (err) {
                this.setState({ error: err });
              }
              this.setState({ sending: false });
              if (this.props.onSuccess) {
                this.props.onSuccess();
              }
            }}
            render={context => (
              <Modal
                visible={true}
                title="Reset your password"
                closable={false}
                footer={
                  <Button
                    loading={sending}
                    onClick={() => context.formComponent.submit()}
                    type="primary"
                  >
                    Reset my password
                  </Button>
                }
              >
                {error ? <Alert type="error" message={error.message} /> : null}
                <FormField
                  name="password"
                  label="Password"
                  formContext={context}
                  rules={[{ required: true }]}
                >
                  <Input type="password" />
                </FormField>
                <FormField
                  name="confirm"
                  label="Confirm password"
                  formContext={context}
                  rules={[
                    { required: true },
                    { validator: this.checkConfirm(context) }
                  ]}
                >
                  <Input type="password" />
                </FormField>
              </Modal>
            )}
          />
        )}
      </Mutation>
    );
  }
}
