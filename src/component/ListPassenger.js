import ListItem from './ListItem';
import { gql, useQuery, useLazyQuery, useMutation } from '@apollo/client';
import Loader from 'react-loader-spinner'
import { useState } from 'react';
import useSubscribePassenger from "../hooks/useSubscribePassenger";
import useGetPassenger, { useGetPassengerById } from "../hooks/useGetPassenger";

const ListPassenger = props => {

    const {data, loading, error} = useSubscribePassenger();
    const {getPassenger, lazyData, lazyLoading, lazyError} = useGetPassengerById();

    const [passengerId, setPassengerId] = useState('');
    const [list, setList] = useState(data?.anggota);
    const [byId, setById] = useState(false)
    console.log("data anggota", data?.anggota)

    if (loading || lazyLoading) {
        return (
            <>
                <Loader type="Circles" color="#00BFFF" height={80} width={80}/>
            </>
        )
    }
    
    if (error || lazyError) {
        console.log(lazyError)
        return null
    }

    const onChangeId = (e) => {
        // if (e.target) {
            console.log(e.target.value)
            setPassengerId(e.target.value)
        // }
    }

    const onGetData = () => {
        setById(true)
        getPassenger({variables: {
            id: passengerId
        }})
        console.log("lazyData", lazyData)
        setList(lazyData?.anggota)
    }

    return (
        <div>
            <table cellPadding="5px" cellSpacing="0" style={{margin: "auto"}}>
                <thead bgcolor="red">
                    <td>Nama</td>
                    <td>Umur</td>
                    <td>Jenis Kelamin</td>
                    <td bgcolor="white" className="removeBorder"></td>
                </thead>
                {console.log("list?", lazyData?.anggota)}
                {data?.anggota.map(item => (
                    <ListItem
                        key={item.id}
                        data={item}
                        hapusPengunjung={props.hapusPengunjung}
                        handleEdit={props.handleEdit}
                    />
                ))}
                {console.log("getById", byId)}
            </table>
            {console.log('props data', list)}
            {list?.length === 0 ? <h5>Id pengguna {passengerId} tidak ditemukan</h5> : null}
            <br/>
            <input value={passengerId} onChange={onChangeId} placeholder="Input your id here"/>
            <button type="submit" onClick={onGetData}>Get Passenger by Id</button>
        </div>
    )
  }

export default ListPassenger;