import { useState } from "react"
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';

import "./Home.css"

function PassengerInput(props) {
  const [state, setState] = useState({
    nama: "",
    umur: "",
    jenis_kelamin: "Pria",
    editing: true,
  })

  const onChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    })
  }

  let editNama = "";
  let editUmur = "";
  let editJenisKelamin = "";
  let editId = "";
  props.listEdit?.map((list) => {
    editId = list.id
    editNama = list.nama
    editUmur = list.umur
    editJenisKelamin = list.jenis_kelamin
  })

  const handleSubmit = (e) => {
    if (state.nama.trim() && state.umur && state.jenis_kelamin) {
      const umur = state.umur
      if (umur >= 75 || umur <= 12) {
        alert("Umur tidak sesuai")
      } else {
        const newData = {
          nama: state.nama,
          umur: state.umur,
          jenis_kelamin: state.jenis_kelamin,
        }
        console.log(newData)
        props.tambahPengunjung(newData)
        setState({
          ...state,
          nama: "",
          umur: "",
          jenis_kelamin: "Pria",
        })
      }
    } else {
      alert("Data masih ada yang kosong")
    }
  }

  const handleEdit = (e) => {
    if (state.nama.trim() && state.umur && state.jenis_kelamin) {
      const umur = state.umur
      if (umur >= 75 || umur <= 12) {
        alert("Umur tidak sesuai")
      } else {
        const newData = {
          id: editId,
          nama: state.nama,
          umur: state.umur,
          jenis_kelamin: state.jenis_kelamin,
        }
        console.log(newData)
        props.editPengunjung(newData)
      }
    } else {
      alert("Data masih ada yang kosong")
    }
  }

  const handleBukaInput = () => {
    setState({
      ...state,
      editing: false,
    })
  }

  const handleTutupInput = () => {
    setState({
      ...state,
      editing: true,
    })
  }

  let viewMode = {}
  let editMode = {}

  if (state.editing && !props.editState) {
    viewMode.display = "none"
  } else {
    editMode.display = "none"
  }

  return (
    <div>
      <div onSubmit={props.editState? handleEdit : handleSubmit} style={viewMode}>
        <p>Masukkan Nama Anda</p>
        <input type="text" className="input-text" placeholder={props.editState? editNama : "Nama anda ..."} value={state.nama} name="nama" onChange={onChange} />
        <p>Masukkan Umur Anda</p>
        <input type="number" className="input-text" placeholder={props.editState? editUmur : "Umur anda ..."} value={state.umur} name="umur" onChange={onChange} />
        <p>Masukkan Jenis Kelamin Anda</p>
        <select onChange={onChange} name="jenis_kelamin" defaultValue={props.editState? editJenisKelamin : state.jenis_kelamin}>
          <option value="Pria">
            Pria
          </option>
          <option value="Wanita">Wanita</option>
        </select>
        <p></p>
        {console.log('state.editing', state.editing)}
        {console.log("listEdit", editNama)}
        {props.editState && <button onClick={handleEdit}>Edit</button>}
        {!state.editing && 
          <>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={handleTutupInput} style={{ marginLeft: "10px" }}>
              Selesai
            </button>
          </>
        }
      </div>
      <button className="inputan" onClick={handleBukaInput} style={editMode}>
        Masukkan Nama Pelanggan
      </button>
    </div>
  )
}

export default PassengerInput
