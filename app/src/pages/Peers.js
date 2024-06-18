import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import axios from 'axios';

function Peers() {
    const [peers, setPeers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    function getPeers() {
        axios.get('http://localhost:3001/getPeers')
            .then(response => {
                // console.log(response.data.peers);
                setPeers(response.data.peers);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setError(error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getPeers();
    }, []);

    if (loading) {
        return <div className='App'><h1>Loading...</h1></div>;
    }

    if (error) {
        return <div className='App'>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Peers</h1>
            
            <Grid container spacing={2}>
                <Grid item xs={1}>
                    <h2>Index</h2>
                </Grid>
                <Grid item xs={2}>
                    <h2>Name</h2>
                </Grid>
                <Grid item xs={2}>
                    <h2>Peer Type</h2>
                </Grid>
                <Grid item xs={2}>
                    <h2>Hash</h2>
                </Grid>
                <Grid item xs={5}>
                    <h2>Address</h2>
                </Grid>
            </Grid>
            <>
                {peers && peers.map((peer, index) => (
                    <Grid key={index} container spacing={2}>
                        <Grid item xs={1}>
                            <p>{index}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p>{peer.Name}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p>{peer.PeerType}</p>
                        </Grid>
                        <Grid item xs={2}>
                            <p>{peer.Hash}</p>
                        </Grid>
                        <Grid item xs={5}>
                            <p>{peer.Address}</p>
                        </Grid>
                    </Grid>
                ))}
            </>
        </div>
    );


}
export default Peers;