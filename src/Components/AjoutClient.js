import React, { useState } from "react";
import "./AjoutClient.css";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DoneIcon from "@mui/icons-material/Done";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";
import { useNavigate } from "react-router-dom";
import db from "../config/config";
import firebase from "firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function AjoutClient() {
  const navigate = useNavigate();

  const [status, setStatus] = useState("true");
  const [nom, setNom] = useState();
  const [controlSaisieNom, setControlSaisieNom] = useState(false);
  /* const dispatch = useDispatch() */
  /* const listClient = useSelector(selectlistClient)  */

  const handleChange = (event) => {
    setStatus(event.currentTarget.value);
  };

  const handleChangeName = (event) => {
    setNom(event.target.value);
  };

  const notify = () =>
    toast.success("votre ajout a été effectué", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  console.log(status);
  const ajout = () => {
    if (!nom) {
      setControlSaisieNom(true);
    } else {
      db.collection("clients")
        .add({
          Name: nom,
          statut: status,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((res) => {
          console.log(res);
          notify();
          navigate("/listeclients");
        });
    }
    /* dispatch(
        AddClient({
            Name:nom,
            statut:status,

    }))
 */
  };

  return (
    <div className="containerr">
      <h2>Ajouter un client</h2>
      <div className="Box">
        <p>information générales</p>

        <div className="champ1">
          <p>Nom</p>
          <p style={{ marginLeft: "40px" }}>|</p>
          <input type="text" onChange={handleChangeName} />
          {controlSaisieNom && (
            <p style={{ color: "red" }}>veuillez remplir tous les champs</p>
          )}
        </div>

        <div className="champ1">
          <p>Statut</p>
          <p style={{ marginLeft: "40px" }}>|</p>
          <select
            value={status}
            className="select"
            label="Age"
            onChange={handleChange}
          >
            <option style={{ color: "black" }} value={true}>
              actif
            </option>
            <option style={{ color: "black" }} value={false}>
              bloqué
            </option>
          </select>
        </div>
      </div>

      <div className="box2">
        <p>Traduction</p>
        <ArrowDropDownIcon />
      </div>

      <div className="last">
        <button
          className="buttonRetour"
          onClick={() => {
            navigate("/listeclients");
          }}
        >
          <RotateLeftIcon style={{ marginRight: "15px" }} />
          Retour
        </button>
        <button className="buttonAjout" onClick={ajout}>
          <DoneIcon style={{ marginRight: "15px" }} />
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default AjoutClient;
