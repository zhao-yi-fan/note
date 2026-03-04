import React from 'react';
import RemoteApp from '@remote/App';
import test from '@remote/test';
console.log(1);
console.log(test);
console.log(2);
const App = () => {
  return <div>
    <span>HOST</span>
    <hr />
    {React.createElement(RemoteApp)}
  </div>
};
export default App;
