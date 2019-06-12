import React from "react";
import { Machine, interpret } from "xstate";

const fetchMachine = Machine(
  {
    id: "trigger",
    initial: "inactive",
    states: {
      idle: {
        on: {
          FETCH_TRIGGERED: "fetching"
        }
      },
      fetching: {
        on: {
          FETCH_FULFILLED: {
            target: "idle",
            actions: "notifyFulfilled"
          },
          FETCH_REJECTED: "errored"
        },
        onEntry: ["fetchContent", "notifyFetching"]
      },
      errored: {
        on: {
          RETRY_INITIATED: "fetching"
        }
      }
    }
  },
  {
    actions: {
      fetchContent: (context, event) => {
        fetchContent();
      },
      notifyFetching: (context, event) => {
        console.log("fetching!!!");
      },
      notifyFulfilled: (context, event) => {
        console.log("fetch fulfilled!!!");
      }
    }
  }
);

class Toggle extends React.Component {
  state = {
    current: fetchMachine.initialState
  };

  fetchService = interpret(fetchMachine).onTransition(current =>
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
      prevProps.status.fetchContent === "PENDING" &&
      this.props.status.fetchContent === "FULFILLED"
    ) {
      this.fetchService.send("FETCH_FULFILLED");
    }
  }

  render() {
    return (
      <>
        {this.state.current.matches("idle") && (
          <button onClick={() => this.fetchService.send("FETCH_TRIGGERED")}>
            fetch content
          </button>
        )}

        {this.state.current.matches("fetching") && <div>fetching!</div>}

        {this.state.current.matches("errored") && (
          <button onClick={() => this.fetchService.send("RETRY_INITIATED")}>
            retry fetch
          </button>
        )}
      </>
    );
  }
}
