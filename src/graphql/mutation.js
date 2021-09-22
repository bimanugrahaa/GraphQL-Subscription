import { gql } from '@apollo/client'

const InsertPassenger = gql`
mutation MyMutation($object: anggota_insert_input!) {
    insert_anggota_one(object: $object) {
        id
        nama
        umur
        jenis_kelamin
    }
  }
  `
const DeletePassenger = gql`
mutation MyMutation($id: Int!) {
    delete_anggota_by_pk(id: $id) {
      id
      nama
      umur
      jenis_kelamin
    }
  }
  `
const EditPassenger = gql`
mutation MyMutation($id: Int!, $jenis_kelamin: String!, $nama: String!, $umur: Int!) {
    update_anggota(where: {id: {_eq: $id}}, _set: {nama: $nama, jenis_kelamin: $jenis_kelamin, umur: $umur}) {
      affected_rows
    }
  }
  `

export { InsertPassenger, DeletePassenger, EditPassenger }