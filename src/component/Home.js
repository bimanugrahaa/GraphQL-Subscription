import { Component, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import Loader from 'react-loader-spinner'
import PassengerInput from './PassengerInput';
import ListPassenger from './ListPassenger';
import Header from './Header';
import useGetPassenger, { useGetPassengerById } from "../hooks/useGetPassenger";
import useUpdatePassenger from "../hooks/useUpdatePassenger";
import useDeletePassenger from "../hooks/useDeletePassenger";
import useInsertPassenger from "../hooks/useInsertPassenger";
import useSubscribePassenger from "../hooks/useSubscribePassenger";

function Home() {

    const [editState, setEditState] = useState(false)
    // const [getPassenger, {data: lazyData, loading: lazyLoading, error: lazyError}] = useLazyQuery(GetPassengerById)
    
    // const {passenger, loading, error, subscribePassenger} = useGetPassenger()
    const {getPassenger, lazyData, lazyLoading, lazyError} = useGetPassengerById();
    const {updatePassenger, loadingEdit} = useUpdatePassenger();
    const {deletePassenger, loadingDelete} = useDeletePassenger();
    const {insertPassenger, loadingInsert} = useInsertPassenger();
    const {data, loading, error} = useSubscribePassenger();


    //Gives loading when fetch data from hasura
    if (loading || lazyLoading || loadingInsert || loadingDelete ||loadingEdit) {
        return (
            <>
                <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
            </>
        )
    }

    //Return error when failed to fetch data from hasura
    if (error || lazyError) {
        console.log(error)
        return null
    }
    
    const hapusPengunjung = id => {
        deletePassenger({variables: {
            id: id
        }})
    };
    
    const tambahPengunjung = (newUser) => {
        console.log('newUser', newUser)
        insertPassenger({variables: {
            object: {
                nama: newUser.nama,
                umur: newUser.umur,
                jenis_kelamin: newUser.jenis_kelamin
            }
        }})
    };

    const editPengunjung = (editUser) => {
        updatePassenger({variables: {
            id: editUser.id,
            nama: editUser.nama,
            umur: editUser.umur,
            jenis_kelamin: editUser.jenis_kelamin
        }})
    }
    
    const handleEdit = (idx) => {
        console.log(!editState)
        getPassenger({variables: {
            id: idx
        }})
        setEditState(!editState)
    }
    
    return (
        <div>
            <Header/>
            <ListPassenger 
                // data={data?.anggota}
                hapusPengunjung={hapusPengunjung}
                handleEdit={handleEdit}
            />
            <PassengerInput
                tambahPengunjung={tambahPengunjung}
                editPengunjung={editPengunjung}
                editState={editState}
                listEdit={lazyData?.anggota}
            />
        </div>
    )
}

export default Home;