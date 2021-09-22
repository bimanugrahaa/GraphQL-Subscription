import { gql } from '@apollo/client'

export const SubscriptionPassenger = gql`
subscription MySubscription {
    anggota {
      id
      nama
      umur
      jenis_kelamin
    }
  }  
`
