import * as React from 'react';
import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';


function Peers() {
    const [peers, setPeers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    function getPeers() {
        fetch('http://localhost:8090/yacy/seedlist.json')
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Failed to fetch peers');
            })
            .then(data => {
                setPeers(data.peers);
                console.log('peers:', data.peers);
                setLoading(false);
            })
            .catch(error => {
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
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            <h1>Peers</h1>
            <Grid className='results' container spacing={2}>
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
                    <Grid className='results' key={index} container spacing={2}>
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