import * as React from 'react';
import { useEffect,  useState } from 'react';


function Peers({sendPeers}) {
    const [peers, setPeers] = useState([]);


    const getPeers = async () => {
        try {
        const response  = await fetch('http://localhost:8090/yacy/seedlist.json');
        const data = await response.json();
        // console.log(data.peers[0]);
        setPeers(data.peers);
        } catch(error) {
            console.error('There was an error!', error);
        }
    }

    useEffect(() => {
        getPeers();
    }, []);

    return (
        <div>
            <h1>Peers</h1>
            
            
        </div>
    );


}
export default Peers;