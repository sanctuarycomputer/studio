import React from "react";
import { Machine, interpret, assign } from "xstate";

const passwordFlow = Machine({
  id: "passwordFlow",
  initial: "welcoming",
  states: {
    welcoming: {
      on: {
        CONTINUE_INITIATED: "enteringPassword"
      }
    },
    enteringPassword: {
      on: {
        PASSWORD_CONFIRMED: "enterCompleted",
        PASSWORD_REJECTED: [
          {
            target: "enteringPassword",
            cond: context => context.passwordAttempts < 3,
            actions: assign(context => {
              return { passwordAttempts: context.passwordAttempts + 1 };
            })
          },
          {
            target: "resettingPassword"
          }
        ]
      }
    },
    resettingPassword: {
      on: {
        ENTER_INITIATED: {
          target: "enteringPassword",
          actions: assign(context => {
            return { passwordAttempts: 0 };
          })
        },
        RESET_INITIATED: "resetInitiating"
      }
    },
    resetInitiating: {
      on: {
        EXIT_INITIATED: "resetCompleted"
      }
    },
    enterCompleted: {
      type: "final",
      onEntry: "handleEnterPasswordCompleted"
    },
    resetCompleted: {
      type: "final",
      onEntry: "handleResetPasswordCompleted"
    }
  }
});

class PasswordFlow extends React.Component {
  state = {
    current: this.stateMachineWithProps.initialState
  };

  stateMachineWithProps = fetchMachine.withConfig({
    actions: {
      handleEnterPasswordCompleted: this.props.navigateAway,
      handleResetPasswordCompleted: this.props.navigateAway
    }
  });

  fetchService = interpret(this.stateMachineWithProps).onTransition(current =>
    this.setState({ current })
  );

  componentDidMount() {
    this.fetchService.start();
  }

  componentWillUnmount() {
    this.fetchService.stop();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.status.confirmPassword === "PENDING" &&
      this.props.status.confirmPassword === "FULFILLED"
    ) {
      this.fetchService.send("PASSWORD_CONFIRMED");
    }

    if (
      prevProps.status.confirmPassword === "PENDING" &&
      this.props.status.confirmPassword === "REJECTED"
    ) {
      this.fetchService.send("PASSWORD_REJECTED");
    }
  }

  render() {
    const attemptsRemaining = 3 - this.fetchService.context.passwordAttempts;

    return (
      <>
        {this.state.current.matches("welcoming") && (
          <button onClick={() => this.fetchService.send("CONTINUE_INITIATED")}>
            welcome!
          </button>
        )}

        {this.state.current.matches("enteringPassword") && (
          <>
            <div>{`${attemptsRemaining} attempts remaining`}</div>
            <form
              onSubmit={e => {
                e.preventDefault();
                this.props.confirmPassword(e.target.value);
              }}
            >
              <button type="submit">enter password</button>
              <input type="text" />
            </form>
          </>
        )}

        {this.state.current.matches("resettingPassword") && (
          <form
            onSubmit={e => {
              e.preventDefault();
              this.props.resetPassword(e.target.value);
            }}
          >
            <button type="submit">reset password</button>
            <button onClick={() => this.fetchService.send("ENTER_INITIATED")}>
              attempt enter again
            </button>
            <input type="text" />
          </form>
        )}

        {this.state.current.matches("resetInitiating") && (
          <>
            <div>Check your email for your reset password link</div>
            <button onClick={() => this.fetchService.send("EXIT_INITIATED")}>
              exit
            </button>
          </>
        )}
      </>
    );
  }
}
