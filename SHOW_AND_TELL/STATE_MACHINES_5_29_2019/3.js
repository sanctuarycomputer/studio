const wordMachine = Machine({
  id: "word",
  type: "parallel",
  states: {
    bold: {
      initial: "off",
      states: {
        on: {
          on: { TOGGLE_BOLD: "off" }
        },
        off: {
          on: { TOGGLE_BOLD: "on" }
        }
      }
    },
    underline: {
      initial: "off",
      states: {
        on: {
          on: { TOGGLE_UNDERLINE: "off" }
        },
        off: {
          on: { TOGGLE_UNDERLINE: "on" }
        }
      }
    },
    italics: {
      initial: "off",
      states: {
        on: {
          on: { TOGGLE_ITALICS: "off" }
        },
        off: {
          on: { TOGGLE_ITALICS: "on" }
        }
      }
    }
  }
});

const wordService = interpret(wordMachine).start();
// {
//   bold: 'off',
//   italics: 'off',
//   underline: 'off',
// }

wordService.send("TOGGLE_BOLD");
// {
//   bold: 'on',
//   italics: 'off',
//   underline: 'off',
// }

wordService.send("TOGGLE_ITALICS");
// {
//   bold: 'on',
//   italics: 'on',
//   underline: 'off',
// }
