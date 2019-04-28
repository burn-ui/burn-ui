import React from 'react';
import Link from './Link';

const navigationOptions = [{ label: 'Home', pathname: '/' }];

function Nav() {
  return (
    <ul>
      {navigationOptions.map(({ label, pathname }) => (
        <li key={label}>
          <Link to={pathname}>{label}</Link>
        </li>
      ))}
    </ul>
  );
}

export default Nav;
