import React from 'react';
import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import AjoutClient from './Components/AjoutClient';
import ListeClient from './Components/ListeClient';
import UpdateClient from './Components/UpdateClient';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const Routing = () => {


    return (

      <Routes>
        <Route path="/" element={<ListeClient />} />
        <Route path="listeclients" element={<ListeClient />} />
        <Route path="ajoutclient" element={<AjoutClient />} />
        <Route path="updateclient/:id" element={<UpdateClient />} />
      </Routes>

    )
  }
  return (
    <div className="App">

      <ToastContainer />
      <BrowserRouter>

        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
