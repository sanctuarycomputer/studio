const fetchMachine = Machine({
  id: "trigger",
  initial: "idle",
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
  },
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
});
