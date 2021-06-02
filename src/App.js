import React from 'react';
import Signin from './components/Signin/Signin';
import { useLocalContext } from './context/context';
import Loading from './components/loading/Loading';

function App() {
  const { appState } = useLocalContext();
  return (
    <div className="App">
      {appState === 'home' && <h1>Home</h1>}
      {appState === 'login' && <Signin />}
      {appState === 'loading' && <Loading />}
    </div>
  );
}

export default App;
