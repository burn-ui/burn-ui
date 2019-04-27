import { useReducer } from 'react';

export const dropDownEnum = {
  OPEN: 'OPEN',
  CLOSE: 'CLOSE',
  TOGGLE: 'TOGGLE',
  OPEN_ACTION: 'open',
  CLOSE_ACTION: 'closed',
};

function useDropdownState() {
  const [state, dispatch] = useReducer(reducer, {
    visible: false,
    lastAction: null,
  });

  function close() {
    dispatch({ type: dropDownEnum.CLOSE });
  }

  function toggle() {
    dispatch({ type: dropDownEnum.TOGGLE });
  }

  return [state, { close, toggle }];
}

function toggleAction(ref) {
  return ref === dropDownEnum.OPEN_ACTION
    ? dropDownEnum.CLOSE_ACTION
    : dropDownEnum.OPEN_ACTION;
}

function reducer(state, action) {
  switch (action.type) {
    case dropDownEnum.OPEN:
      return { ...state, visible: true, lastAction: dropDownEnum.OPEN_ACTION };
    case dropDownEnum.CLOSE:
      return {
        ...state,
        visible: false,
        lastAction: dropDownEnum.CLOSE_ACTION,
      };
    case dropDownEnum.TOGGLE:
      return {
        ...state,
        visible: !state.visible,
        lastAction: toggleAction(state.lastAction),
      };
    default:
      throw new Error('TypeError: unknown action type');
  }
}

export default useDropdownState;
