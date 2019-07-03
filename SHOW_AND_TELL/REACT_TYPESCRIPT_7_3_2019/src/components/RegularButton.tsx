import React, { Component, RefObject } from 'react';
type Props = {
  className: string;
  type: 'button' | 'submit' | 'reset';
  ariaLabel: string;
  children?: React.ReactNode;
  text?: string;
  onClick: () => void;
  elemRef?: RefObject<HTMLButtonElement>;
}

const defaultProps = {
  className: '',
  type: 'button',
  onClick: () => {}
};

class RegularButton extends Component<Props> {
  static defaultProps = defaultProps;

  render() {
    const {
      className,
      type,
      ariaLabel,
      children,
      text,
      onClick,
      elemRef
    } = this.props;

    return (
      <button
        className={className}
        aria-label={ariaLabel}
        onClick={onClick}
        type={type}
        ref={elemRef as RefObject<HTMLButtonElement>}
      >
        {text ? text : children}
      </button>
    );
  }
}

export default RegularButton;
