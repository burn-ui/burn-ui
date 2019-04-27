import styled, { css } from 'styled-components';

export const Container = styled.div`
  position: relative;
`;

export const Backdrop = styled.div`
  z-index: 99;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  ${useBackdrop};
  ${useTransition};
`;

export const ContainerFloat = styled.div`
  z-index: 100;

  position: absolute;
  width: ${props => props.width}px;
  padding: 10px;
  background-color: #f3f3f3;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  transform: translate(${props => props.offset}px, 6px);
  box-shadow: 0px 3px 7px -2px rgba(108, 108, 108, 0.5);

  ${useTransition};
`;

export const Arrow = styled.div`
  z-index: 100;

  position: absolute;
  border-left: 7.5px solid transparent;
  border-right: 7.5px solid transparent;
  border-bottom: 7.5px solid #f3f3f3;
  transform: translate(50%, 100%);
  bottom: 0%;
  right: 50%;

  ${useTransition};
`;

function useTransition({ on }) {
  if (on) {
    return css`
      transition: visibility 0s ease 0s, opacity 0.3s ease;
      visibility: visible;
      opacity: 1;
    `;
  }

  return css`
    transition: visibility ease 0.5s, opacity 0.3s ease;
    visibility: hidden;
    opacity: 0;
  `;
}

function useBackdrop({ backdropOpacity }) {
  if (backdropOpacity) {
    return css`
      background-color: rgba(0, 0, 0, ${backdropOpacity});
    `;
  }

  return css`
    display: none;
    visibility: hidden;
  `;
}
