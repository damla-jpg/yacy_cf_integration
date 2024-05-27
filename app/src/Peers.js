import * as React from 'react';
import { useEffect,  useState } from 'react';


function Peers() {
    const [peers, setPeers] = useState([]);

    function displayPeers() {
        console.log(peers);
        // return peers.map((peer, index) => {
        //     return (
        //         <div key={index}>
        //             <h2>{peer}</h2>
        //         </div>
        //     );
        // });
    }

    const getPeers = async () => {
        try {
        const response  = await fetch('http://localhost:8090/yacy/seedlist.json');
        const data = await response.json();
        console.log(data.peers[0]);
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
            {displayPeers()}
        </div>

    );
}
export default Peers;