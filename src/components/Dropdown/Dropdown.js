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

  const [state, handlers] = useDropdownState();

  useOnClickInside(backdropRef, handlers.close);

  const Toggler = React.isValidElement(Component)
    ? Component
    : Component(state);

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
        on={state.visible}
        backdropOpacity={backdropOpacity}
      />
      {React.cloneElement(
        Toggler,
        {
          ref: togglerRef,
          onClick: handleTogglerClick,
          style: { ...Toggler.props.style, position: 'relative', zIndex: 100 },
        },
        [...TogglerChildren, <Arrow key="arrow" on={state.visible} />]
      )}
      <ContainerFloat
        ref={contentRef}
        width={width}
        offset={offset}
        on={state.visible}
      >
        {children({ ...state, close: handlers.close })}
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
