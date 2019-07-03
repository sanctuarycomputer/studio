import React, { Component, RefObject } from 'react';
import { Link } from 'react-router-dom';
import linkIsExternal from 'utils/linkIsExternal';

interface Props {
  className: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel: string;
  children?: React.ReactNode;
  text?: string;
  to: string;
  onClick: () => void;
  elemRef?: RefObject<HTMLAnchorElement | Link | HTMLButtonElement>;
}

const defaultProps = {
  className: '',
  type: 'button',
  to: '',
  onClick: () => {}
};

class AllPurposeButton extends Component<Props> {
  static defaultProps = defaultProps;

  render() {
    const {
      className,
      type,
      ariaLabel,
      children,
      text,
      to,
      onClick,
      elemRef
    } = this.props;

    if (to) {
      if (linkIsExternal(to)) {
        return (
          <a
            href={to}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={ariaLabel}
            ref={elemRef as RefObject<HTMLAnchorElement>}
          >
            <div className={className}>
              {text ? text : children}
            </div>
          </a>
        );
      } else {
        return (
          <Link
            to={to}
            aria-label={ariaLabel}
            ref={elemRef as RefObject<Link>}
          >
            <div className={className}>
              {text ? text : children}
            </div>
          </Link>
        );
      }
    }

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

export default AllPurposeButton;
