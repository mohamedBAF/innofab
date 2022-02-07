import React, { useEffect, useState } from "react";
import "./ListeClient.css";

import SearchIcon from "@mui/icons-material/Search";

import PropTypes from "prop-types";
import MultiSelectUnstyled from "@mui/base/MultiSelectUnstyled";
import { selectUnstyledClasses } from "@mui/base/SelectUnstyled";
import OptionUnstyled, {
  optionUnstyledClasses,
} from "@mui/base/OptionUnstyled";
import PopperUnstyled from "@mui/base/PopperUnstyled";
import { styled } from "@mui/system";
import FilterListIcon from "@mui/icons-material/FilterList";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import db from "../config/config";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BasicModal from "./popup";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Alert from "@mui/material/Alert";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function ListeClient() {
  const [StaticListe, setStaticListe] = useState([]);
  const [clients, setclients] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState();
  const [clientToDelete, setClientToDelete] = useState();

  const [openAlerte, setOpenAlerte] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    db.collection("clients")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setclients(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        setStaticListe(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }, []);
  console.log(StaticListe);

  useEffect(() => {
    setclients(
      StaticListe.filter((client) =>
        client.data.statut.toLowerCase().includes(filter?.toLowerCase())
      )
    );
  }, [filter]);

  const navigate = useNavigate();
  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleChangeFilter = (event) => {
    setFilter(event.target.value);
  };
  function edit(clientId) {
    navigate(`/updateclient/${clientId}`);
  }

  function Remove() {
    db.collection("clients")
      .doc(clientToDelete)
      .delete()
      .then(() => {
        setOpen(false);
        setClientToDelete("");
      });
  }

  function Restaurer() {
    db.collection("clients")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setclients(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
        setStaticListe(
          snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }))
        );
      });
  }

  console.log(filter);

  return (
    <div className="containerr">
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Supprimer ce client ?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Attention ! si ce client est supprimé il ne pourra pas être restauré
            de nouveau
          </Typography>
          <Button style={{ float: "right" }} color="error" onClick={Remove}>
            Supprimer
          </Button>
          {/*  <Button  style={{float: 'right'}} color="secondary" onClick={()=>setOpen(false)}>Retour</Button> */}
        </Box>
      </Modal>

      <div className="first">
        <div className="title">
          <h2>Gestion des Clients</h2>
        </div>

        <div className="elements">
          <div className="inputs">
            <SearchIcon style={{ fill: "#808080" }} />
            <input
              type="text"
              placeholder="rechercher"
              onChange={handleChangeSearch}
            />
          </div>

          <div className="filter">
            <select
              value={filter}
              className="select"
              onChange={handleChangeFilter}
            >
              <option style={{ color: "black" }} value="true">
                actif
              </option>
              <option style={{ color: "black" }} value="false">
                bloqué
              </option>
            </select>
          </div>
          <button
            className="buttonChoice"
            onClick={() => {
              Restaurer();
            }}
          >
            Restaurer
          </button>
        </div>
        <p>{clients.length} elements affiché</p>
      </div>

      <div
        className="second"
        style={{ overflowY: "scroll", height: "calc(90vh - 127px)" }}
      >
        <table class="table">
          <thead>
            <tr>
              <th>id</th>
              <th>Nom</th>
              <th>Statut</th>
              <th>Date</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {clients && clients.length > 0
              ? clients
                  .filter((val) => {
                    if (
                      val.data.Name.toLowerCase().includes(
                        search?.toLowerCase()
                      )
                    ) {
                      return val;
                    } else if (
                      val.data.Name.toLowerCase().includes(
                        search?.toLowerCase()
                      )
                    ) {
                      return val;
                    } else if (
                      val.id.toLowerCase().includes(search?.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      new Date(val.data.timestamp?.toDate())
                        .toUTCString()
                        .toLowerCase()
                        .includes(search?.toLowerCase())
                    ) {
                      return val;
                    } else if (
                      val.data.statut
                        .toLowerCase()
                        .includes(search?.toLowerCase())
                    ) {
                      return val;
                    }
                  })
                  .map((client) => (
                    <tr>
                      <td>{client.id}</td>
                      <td>{client.data.Name}</td>
                      <td>
                        {client.data.statut === "true" ? "Actif" : "bloqué"}
                      </td>
                      <td>
                        {new Date(
                          client.data.timestamp?.toDate()
                        ).toLocaleString()}
                      </td>
                      <td>
                        <EditIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => edit(client.id)}
                        />
                      </td>
                      <td>
                        <DeleteIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            setClientToDelete(client.id);
                            setOpen(true);
                          }}
                        />
                      </td>
                    </tr>
                  ))
              : "Loading"}
          </tbody>
        </table>
      </div>

      <div className="last">
        <button
          className="buttonAjout"
          onClick={() => {
            navigate("/ajoutclient");
          }}
        >
          <AddIcon style={{ marginRight: "15px" }} />
          Ajouter un client
        </button>
      </div>
    </div>
  );
}

export default ListeClient;
