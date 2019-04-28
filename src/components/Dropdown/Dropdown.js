import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import useHorizontalPosition from './useHorizontalPosition';
import useOnClickInside from './useOnClickInside';
import useDropdownState from './useDropdownState';

import { Container, ContainerFloat, Arrow, Backdrop } from './styles';

function Dropdown({ of: Component, backdropOpacity, width, children }) {
  const togglerRef = useRef();
  const contentRef = useRef();
  const backdropRef = useRef();

  const offset = useHorizontalPosition(togglerRef, contentRef);

  const [isVisible, handlers] = useDropdownState();

  useOnClickInside(backdropRef, handlers.close);

  const Toggler = React.isValidElement(Component)
    ? Component
    : Component(isVisible);

  const DropdownChildren =
    React.isValidElement(children) || Array.isArray(children)
      ? children
      : children(handlers.close);

  const TogglerChildren = React.Children.map(
    Toggler.props.children,
    child => child
  );

  function handleTogglerClick(e) {
    handlers.toggle();

    if (Toggler.props.onClick) {
      Toggler.props.onClick(e);
    }
  }

  return (
    <Container>
      <Backdrop
        ref={backdropRef}
        on={isVisible}
        backdropOpacity={backdropOpacity}
      />
      {React.cloneElement(
        Toggler,
        {
          ref: togglerRef,
          onClick: handleTogglerClick,
          style: {
            ...Toggler.props.style,
            position: 'relative',
            zIndex: isVisible ? 100 : 'auto',
          },
        },
        [...TogglerChildren, <Arrow key="arrow" on={isVisible} />]
      )}
      <ContainerFloat
        ref={contentRef}
        width={width}
        offset={offset}
        on={isVisible}
      >
        {DropdownChildren}
      </ContainerFloat>
    </Container>
  );
}

Dropdown.defaultProps = {
  backdropOpacity: 0.75,
  width: 250,
};

Dropdown.propTypes = {
  backdropOpacity: PropTypes.number,
  width: PropTypes.number,
};

export default Dropdown;
