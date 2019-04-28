import { useState } from 'react';

function useDropdownState() {
  const [isVisible, setIsVisible] = useState(false);

  function close() {
    setIsVisible(false);
  }

  function toggle() {
    setIsVisible(prevState => !prevState);
  }

  return [isVisible, { close, toggle }];
}

export default useDropdownState;
