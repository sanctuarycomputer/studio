import React, { Component, RefObject } from 'react';
import * as H from 'history';
import { Link } from 'react-router-dom';

type SharedContentProps = {
  children?: React.ReactNode;
} | {
  text?: string;
}

type SharedProps = SharedContentProps & {
  className: string,
  ariaLabel: string,
};

type ButtonProps = {
  onClick: () => void;
  elemRef?: RefObject<HTMLButtonElement>;
  type: 'button' | 'submit' | 'reset';
}

type InternalLinkProps = {
  internalTo: H.LocationDescriptor;
  onClick?: undefined;
  elemRef?: RefObject<Link>;
}

type ExternalLinkProps = {
  externalTo: string;
  onClick?: undefined;
  elemRef?: RefObject<HTMLAnchorElement>;
}

type UniqueProps = ButtonProps | InternalLinkProps | ExternalLinkProps;

type Props = SharedProps & UniqueProps;

class IndividuallyTypedButton extends Component<Props> {
  render() {
    if ('internalTo' in this.props) {
      return (
        <Link
          to={this.props.internalTo}
          aria-label={this.props.ariaLabel}
          ref={this.props.elemRef}
        >
          <div className={this.props.className}>
            {('text' in this.props) ? this.props.text : this.props.children}
          </div>
        </Link>
      );
    };

    if ('externalTo' in this.props) {
      return (
        <a
          href={this.props.externalTo}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={this.props.ariaLabel}
          ref={this.props.elemRef}
        >
          <div className={this.props.className}>
            {('text' in this.props) ? this.props.text : this.props.children}
          </div>
        </a>
      );
    };

    if ('onClick' in this.props) {
      return (
        <button
          onClick={this.props.onClick}
          type={this.props.type}
          className={this.props.className}
          aria-label={this.props.ariaLabel}
          ref={this.props.elemRef}
        >
          {('text' in this.props) ? this.props.text : this.props.children}
        </button>
      );
    }

    return null;
  }
}

export default IndividuallyTypedButton;
