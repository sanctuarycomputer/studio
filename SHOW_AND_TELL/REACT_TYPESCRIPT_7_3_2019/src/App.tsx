import React, { createRef } from 'react';
import { AllPurposeButton, RegularButton, IndividuallyTypedButton } from 'components';
import { Link } from 'react-router-dom';

class App extends React.Component {
  onClickButtonRef = createRef<HTMLButtonElement>();
  reactLinkRef = createRef<Link>();
  externalLinkRef = createRef<HTMLAnchorElement>();

  render() {
    return (
      <div className="App p1 flex flex-col justify-center items-center">
        <h1>Using Typescript with React</h1>
        <h2 className="mb2">A Button Rendering Demo</h2>
        <div className="flex flex-col items-center mb2">
          <p>This component can render a button, anchor, or Link.</p>
          <AllPurposeButton
            className="Button pointer mb1"
            ariaLabel="Click to alert hola mundo"
            onClick={() => alert('hola mundo!')}
            elemRef={this.onClickButtonRef}
          >
            <p>AllPurposeButton with onClick</p>
          </AllPurposeButton>
          <AllPurposeButton
            className="mb1"
            ariaLabel="Go to GitHub"
            to="https://www.github.com"
            elemRef={this.externalLinkRef}
          >
            <p>External link</p>
          </AllPurposeButton>
        </div>
        <div className="flex flex-col items-center mb2">
          <p>This component can also render a button, anchor, or Link, with stricter typing.</p>
          <IndividuallyTypedButton
            type="button"
            className="Button pointer mb1"
            ariaLabel="Click to alert hola mundo"
            onClick={() => alert('hola mundo!')}
            elemRef={this.onClickButtonRef}
          >
            <p>IndividuallyTypedButton</p>
          </IndividuallyTypedButton>
          <IndividuallyTypedButton
            className="Button pointer mb1"
            ariaLabel="Go to Google.com"
            externalTo="http://www.google.com"
            // This would error:
            // onClick={() => {}}
            elemRef={this.externalLinkRef}
          >
            <p>IndividuallyTypedButton</p>
          </IndividuallyTypedButton>
        </div>
        <div className="flex flex-col items-center mb2">
          <p>This component can only render a button.</p>
          <RegularButton
            type="button"
            className="Button pointer mb1"
            ariaLabel="Click to alert hola mundo"
            onClick={() => alert('hola mundo!')}
            elemRef={this.onClickButtonRef}
          >
            <p>Regular Button</p>
          </RegularButton>
        </div>
      </div>
    );
  };
};

export default App;
