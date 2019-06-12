const lightMachine = Machine({
  id: "light",
  initial: "green",
  states: {
    green: {
      on: {
        TIMER_ENDED: "yellow"
      }
    },
    yellow: {
      on: {
        TIMER_ENDED: "red"
      }
    },
    red: {
      on: {
        TIMER_ENDED: "green"
      },
      initial: "walk",
      states: {
        walk: {
          on: {
            PEDESTRIAN_TIMER_ENDED: "wait"
          }
        },
        wait: {
          on: {
            PEDESTRIAN_TIMER_ENDED: "stop"
          }
        },
        stop: {}
      }
    }
  }
});

const trafficLightService = interpret(trafficLightMachine).start();
// => 'green'

trafficLightService.send("TIMER_ENDED");
// => 'yellow'

trafficLightService.send("TIMER_ENDED");
// {
//   red: 'walk'
// }

trafficLightService.send("PEDESTRIAN_TIMER_ENDED");
// {
//   red: 'wait'
// }

trafficLightService.send("PEDESTRIAN_TIMER_ENDED");
// {
//   red: 'stop'
// }

trafficLightService.send("TIMER_ENDED");
// => 'green'
