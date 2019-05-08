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
import { email, required } from '../../components/Material/modules/form/validation';
import RFTextField from '../../components/Material/modules/form/RFTextField';
import FormButton from '../../components/Material/modules/form/FormButton';
import FormFeedback from '../../components/Material/modules/form/FormFeedback';
import { Navbar } from '../../components';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
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
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

class SignUp extends React.Component {
  state = {
    sent: false,
    group: ""
  };

  validate = values => {
    const errors = required(['name', 'email', 'password'], values, this.props);

    if (!errors.email) {
      const emailError = email(values.email, values, this.props);
      if (emailError) {
        errors.email = email(values.email, values, this.props);
      }
    }

    return errors;
  };

  handleGroup = (value) => {
    this.setState({
      group: value.target.value
    })
  }

  handleSubmit = (values) => {
    const user = { name: values.name, email: values.email, username: values.username, password: values.password, group: this.state.group };
    API.newUser(user)
      .then(res => this.props.history.push('/signin'))
      .catch(err => console.log(err));
  }

  render() {
    const { classes } = this.props;
    const { sent } = this.state;

    return (
      <React.Fragment>
        <Navbar />
        <AppForm>
          <React.Fragment>
            <Typography variant="h3" gutterBottom marked="center" align="center">
              Sign Up
            </Typography>
            <Typography variant="body2" align="center">
              <Link href="/signin" underline="always">
                Already have an account?
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
                  autoFocus
                  component={RFTextField}
                  autoComplete="fname"
                  fullWidth
                  label="Full Name or Business"
                  name="name"
                  required
                />
                 <Field
                  autoFocus
                  component={RFTextField}
                  autoComplete="fname"
                  fullWidth
                  label="User Name"
                  name="username"
                  required
                />
                <Field
                  autoComplete="email"
                  component={RFTextField}
                  disabled={submitting || sent}
                  fullWidth
                  label="Email"
                  margin="normal"
                  name="email"
                  required
                />
                <Field
                  fullWidth
                  component={RFTextField}
                  disabled={submitting || sent}
                  required
                  name="password"
                  autoComplete="current-password"
                  label="Password"
                  type="password"
                  margin="normal"
                />
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormLabel component="legend">Select the type of account you would like to make</FormLabel>
                  <RadioGroup
                    aria-label="Account Selection"
                    name="Account Selection"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleGroup}
                  >
                    <FormControlLabel
                      value="provider"
                      control={<Radio color="primary" />}
                      label="Individual"
                      labelPlacement="end"
                    />
                    <FormControlLabel
                      value="company"
                      control={<Radio color="primary" />}
                      label="Business"
                      labelPlacement="end"
                    />
                  </RadioGroup>
                  <FormHelperText>Individual Accounts are for users that will post ad space. Business Accounts are for users that will look for spaces to place ads.</FormHelperText>
                </FormControl>
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
                  color="secondary"
                  fullWidth
                >
                  {submitting || sent ? 'In progress…' : 'Sign Up'}
                </FormButton>
              </form>
            )}
          </Form>
        </AppForm>
        <AppFooter />
      </React.Fragment>
    );
  }
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);