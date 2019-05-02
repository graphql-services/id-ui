import * as React from 'react';

import { Alert, Button, Input, Modal } from 'antd';
import { Form, FormField } from 'webpanel-antd';
import { Mutation, MutationFn } from 'react-apollo';

import { CONFIRM_INVITATION_MUTATION } from 'src/graphql/mutations/invitation';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';

export interface InvitationConfirmFormProps {
  requestID: string;
}
export interface InvitationConfirmFormState {
  sending: boolean;
  error?: Error;
}

export class InvitationConfirmForm extends React.Component<
  InvitationConfirmFormProps,
  InvitationConfirmFormState
> {
  public state: InvitationConfirmFormState = { sending: false };

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
      <Mutation mutation={CONFIRM_INVITATION_MUTATION}>
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
            }}
            render={context => (
              <Modal
                visible={true}
                title="Finish your registration"
                closable={false}
                footer={
                  <Button
                    loading={sending}
                    onClick={() => context.formComponent.submit()}
                    type="primary"
                  >
                    Create my account
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
