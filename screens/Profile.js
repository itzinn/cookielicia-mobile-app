import React from 'react';
import { View } from 'react-native';
import Header from '../components/Header';
import ReactDOM from 'react-dom';
import CookieCard from '../components/CookieCart';

export default function App() {
  return (
    <View>
      <Header />
      {/* O resto do seu aplicativo */}
      <CookieCard />
    </View>
  );
}
ReactDOM.render(<App />, document.getElementById('root'));