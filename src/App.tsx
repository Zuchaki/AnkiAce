import {BrowserRouter as Router, Link, Route, Routes} from 'react-router-dom';
import React from 'react';
import logo from './logo.svg';
import './App.css';
import Layout from './Layout/Layout';
import InitiallyPage from './Pages/InitiallyPage/InitiallyPage';
import Login from './Pages/Auth/Login/Login';
import Register from './Pages/Auth/Register/Register';
import MainPanel from './Pages/MainPanel/MainPanel';
import MyDecks from './Pages/MainPanel/Content/MyDecks/MyDecks';
import NewDeck from './Pages/MainPanel/Content/NewDeck/NewDeck';
import ChosenDeck from './Pages/MainPanel/Content/ChosenDeck/ChosenDeck';
import UpdateDeck from './Pages/MainPanel/Content/UpdateDeck/UpdateDeck';
import StudyPanel from './Pages/MainPanel/Content/StudyPanel/StudyPanel';
import NewFleshCard from './Pages/MainPanel/Content/ChosenDeck/NewFleshCard/NewFleshCard';

function App() {

  const content = (
    <div>
      <Routes>
      <Route path="/" element={<InitiallyPage/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/profil' element={<MainPanel/>}>
          <Route path="" element={<MyDecks/>}/>
          <Route path="nowatalia" element={<NewDeck/>}/>
          <Route path="edytujTalie/:deckId" element={<UpdateDeck/>}/>
          <Route path="talia/:deckId" element={<ChosenDeck/>}/>
          <Route path="nauka/:deckId" element={<StudyPanel/>}/>
        </Route>
      </Routes>
    </div>
  )
  return (
    <Router>
      <div className="App">
        <Layout
          content = {content}
        />
      </div>
    </Router>
  );
}

export default App;
