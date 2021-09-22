import { gql } from '@apollo/client'

const GetPassengerList = gql`
query MyQuery {
    anggota {
      id
      nama
      umur
      jenis_kelamin
    }
  }
`
const GetPassengerById = gql`
query MyQuery($id: Int!) {
    anggota(where: {id: {_eq: $id}}) {
      id
      nama
      umur
      jenis_kelamin
    }
  }
`

export { GetPassengerList, GetPassengerById }