import { Machine } from "xstate";

const trafficLightMachine = Machine({
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
      }
    }
  }
});

const trafficLightService = interpret(trafficLightMachine).start();
// => 'green'

trafficLightService.send("TIMER_ENDED");
// => 'yellow'

trafficLightService.send("TIMER_ENDED");
// => 'red'

trafficLightService.send("TIMER_ENDED");
// => 'green'

trafficLightService.send("ASFKJLASF");
// => 'green'

// SIDE EFFECTS

const trafficLightService = interpret(trafficLightMachine)
  .onTransition(state => console.log(state.value))
  .start();

// IMMUTABLE

lightMachine.transition("green", "TIMER_ENDED").value;
// => 'yellow'
