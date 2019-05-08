// import withRoot from './modules/withRoot';
// --- Post bootstrap -----
// import compose from 'recompose/compose';
// import AppAppBar from '../../components/modules/views/AppAppBar';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import { Field, Form, FormSpy } from 'react-final-form';
import Typography from '../../components/Material/modules/components/Typography';
import AppFooter from '../../components/Material/modules/views/AppFooter';
import AppForm from '../../components/Material/modules/views/AppForm';
import RFTextField from '../../components/Material/modules/form/RFTextField';
import FormButton from '../../components/Material/modules/form/FormButton';
import FormFeedback from '../../components/Material/modules/form/FormFeedback';
import { Navbar } from '../../components';
import API from "../../utils/API";

const styles = theme => ({
  form: {
    marginTop: theme.spacing.unit * 6,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
  },
  feedback: {
    marginTop: theme.spacing.unit * 2,
  },
});

class SignIn extends React.Component {
  state = {
    sent: false,
  };

  handleSubmit = values => {
    const user = {username: values.username, password: values.password};
    API.login(user)
      .then(res => this.props.history.push('/dashboard/user'))
      .catch(err => console.log(err));
  };

  render() {
    const { classes } = this.props;
    const { sent } = this.state;

    return (
      <React.Fragment>
        <Navbar />
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Sign In
            </Typography>
            <Typography variant="body2" align="center">
              {'Not a member yet? '}
              <Link href="/signup" align="center" underline="always">
                Sign Up here
              </Link>
            </Typography>
          </React.Fragment>
          <Form
            onSubmit={this.handleSubmit}
            subscription={{ submitting: true }}
            validate={this.validate}
          >
            {({ handleSubmit, submitting }) => (
              <form onSubmit={handleSubmit} className={classes.form} noValidate>
                <Field
                  autoComplete="username"
                  autoFocus
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="User Name"
                  margin="normal"
                  name="username"
                  required
                  size="large"
                />
                <Field
                  fullWidth
                  size="large"
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormSpy subscription={{ submitError: true }}>
                  {({ submitError }) =>
                    submitError ? (
                      <FormFeedback className={classes.feedback} error>
                        {submitError}
                      </FormFeedback>
                    ) : null
                  }
                </FormSpy>
                <FormButton
                  className={classes.button}
                  disabled={submitting || sent}
                  size="large"
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? 'In progress…' : 'Sign In'}
                </FormButton>
              </form>
            )}
          </Form>
          <Typography align="center">
            <Link underline="always" href="/">
              Forgot password?
            </Link>
          </Typography>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignIn);