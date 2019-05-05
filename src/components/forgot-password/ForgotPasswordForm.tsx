import * as React from 'react';

import { Alert, Button, Input, Modal } from 'antd';
import { Form, FormField } from 'webpanel-antd';
import { Mutation, MutationFn } from 'react-apollo';

import { FORGOT_PASSWORD_MUTATION } from 'src/graphql/mutations/forgot-password';
import { FormContext } from 'webpanel-antd/lib/form/form/Form';

export interface IForgotPasswordFormProps {
  onCancel?: () => void;
  onSuccess?: () => void;
}

export interface IForgotPasswordFormState {
  sending: boolean;
  error?: Error;
}

export class ForgotPasswordForm extends React.Component<
  IForgotPasswordFormProps,
  IForgotPasswordFormState
> {
  public state: IForgotPasswordFormState = { sending: false };

  public render() {
    const { sending, error } = this.state;
    const { onCancel } = this.props;

    return (
      <Mutation mutation={FORGOT_PASSWORD_MUTATION}>
        {(confirm: MutationFn<any, any>) => (
          <Form
            onSave={async (values: any, context: FormContext) => {
              this.setState({ sending: true, error: undefined });

              try {
                await confirm({
                  variables: { email: values.email }
                });
              } catch (err) {
                this.setState({ error: err });
              }
              this.setState({ sending: false });
              if (this.props.onSuccess) {
                this.props.onSuccess();
              }
              context.form.resetFields();
            }}
            render={context => (
              <Modal
                visible={true}
                title="Reset password"
                closable={false}
                // okButtonProps={{ loading: sending }}
                okText="Reset password"
                footer={
                  <>
                    <Button onClick={onCancel}>Cancel</Button>
                    <Button
                      loading={sending}
                      onClick={() => context.formComponent.submit()}
                      type="primary"
                    >
                      Reset password
                    </Button>
                  </>
                }
              >
                {error ? <Alert type="error" message={error.message} /> : null}
                <FormField
                  name="email"
                  label="E–mail"
                  formContext={context}
                  rules={[
                    {
                      required: true,
                      type: 'email',
                      message: 'Please provide valide email of your account'
                    }
                  ]}
                >
                  <Input type="string" />
                </FormField>
              </Modal>
            )}
          />
        )}
      </Mutation>
    );
  }
}
