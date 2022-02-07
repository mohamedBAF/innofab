import React, { useEffect, useState } from "react";
import "./AjoutClient.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import DoneIcon from "@mui/icons-material/Done";
import RotateLeftIcon from "@mui/icons-material/RotateLeft";

import { useNavigate, useParams } from "react-router-dom";
import db from "../config/config";
import firebase from "firebase";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function UpdateClient() {
  const param = useParams();
  const navigate = useNavigate();

  const [status, setStatus] = useState();
  const [nom, setNom] = useState();
  const [controlSaisieNom, setControlSaisieNom] = useState(false);
  const [controlSaisieStatus, setControlSaisieStatus] = useState(false);

  const [client, setClient] = useState();

  /* const dispatch = useDispatch() */
  /* const listClient = useSelector(selectlistClient)  */

  useEffect(() => {
    db.collection("clients")
      .doc(param.id)
      .get()
      .then((snapshot) => {
        setClient(snapshot.data());

        setStatus(snapshot.data().statut);
      });
  }, []);

  console.log(client);
  const handleChange = (event) => {
    setStatus(event.currentTarget.value);
  };

  const handleChangeName = (event) => {
    setNom(event.target.value);
  };

  console.log(status);
  const update = () => {
    if (!nom) {
      setControlSaisieNom(true);
    } else {
      db.collection("clients")
        .doc(param?.id)
        .update({
          Name: nom,

          statut: status,
          timeModification: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then((res) => {
          console.log(res);
          navigate("/listeclients");
          notify();
        });
    }

    const notify = () =>
      toast.success("votre modification a été effectué", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  };

  return (
    <div className="containerr">
      <h2>Modifier un client</h2>
      <div className="Box">
        <p>information générales</p>

        <div className="champ1">
          <p>Code</p>
          <p style={{ marginLeft: "40px" }}>|</p>
          <input
            type="text"
            value={param?.id}
            disabled
            style={{ color: "gray" }}
            onChange={handleChangeName}
          />
        </div>
        <div className="champ1">
          <p>Nom</p>
          <p style={{ marginLeft: "40px" }}>|</p>
          <input
            type="text"
            defaultValue={client?.Name}
            onChange={handleChangeName}
          />
          {controlSaisieNom && (
            <p style={{ color: "red" }}>veuillez remplir tous les champs</p>
          )}
        </div>

        <div className="champ1">
          <p>Statut</p>
          <p style={{ marginLeft: "40px" }}>|</p>
          <select
            value={status ? status : client?.statut}
            className="select"
            label="Age"
            onChange={handleChange}
          >
            <option style={{ color: "black" }} value="true">
              actif
            </option>
            <option style={{ color: "black" }} value="false">
              bloqué
            </option>
          </select>
        </div>
      </div>

      <div className="box2">
        <p>Traduction</p>
        <ArrowDropDownIcon />
      </div>
      <div className="box2">
        <p style={{ color: "#bababa", fontSize: "12px" }}>
          Ajouter le{" "}
          {new Date(client?.timestamp?.toDate()).toLocaleDateString()} a{" "}
          {new Date(client?.timestamp.toDate()).toLocaleTimeString()} par Super
          Admin
        </p>

        {client?.timeModification ? (
          <p style={{ color: "#bababa", fontSize: "12px" }}>
            Modifié le{" "}
            {new Date(client?.timeModification?.toDate()).toLocaleDateString()}
          </p>
        ) : (
          <p style={{ color: "#bababa", fontSize: "12px" }}>
            Pas de modification
          </p>
        )}
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
        <button className="buttonAjout" onClick={update}>
          <DoneIcon style={{ marginRight: "15px" }} />
          Enregistrer
        </button>
      </div>
    </div>
  );
}

export default UpdateClient;
