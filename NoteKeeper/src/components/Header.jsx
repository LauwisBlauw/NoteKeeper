import React from "react";

const Header = React.forwardRef((props, ref) => {
  return (
    <header ref={ref}>
      <h1>Keeper</h1>
    </header>
  );
});

export default Header;
