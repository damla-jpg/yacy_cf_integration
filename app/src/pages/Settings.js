import * as React from 'react';
import { useEffect, useState } from 'react';
import { DOMParser } from 'xmldom';
import Contacts from '../components/DropdownContacts';
import axios from 'axios';
import AlertDialogSlide from '../components/PopUpAlert';
import { Button } from '@mui/material';
const apiPort = process.env.REACT_APP_API_PORT;

function Settings() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [contacts, setContacts] = useState([]);
    const [selectedContact, setSelectedContact] = useState('');
    const [peers, setPeers] = useState([]);
    const [whitelist, setWhitelist] = useState([]);

    function handleContactChange(e) {
        // console.log("selected contact", e.target.value);
        setSelectedContact(e.target.value);
    }

    function disagreeAction() {
        console.log('Disagree');
        // clear selected contact
        setSelectedContact('');
    }

    const getIPFSHash = () => {
        if (selectedContact && peers.length > 0) {
            const selectedPeer = peers.find(peer => peer.Hash === selectedContact);
            console.log('Selected peer:', selectedPeer);

            const agreeAction = async () => {
                console.log("Agree", selectedPeer);
                await axios.post(`http://localhost:${apiPort}/api/create_whitelist?ip=${selectedPeer.IP}&port=${selectedPeer.Port}&hash=${selectedPeer.Hash}`)
                    .then(response => {
                        setLoading(false);
                        console.log(response);
                    })
                    .catch(error => {
                        console.error('Error:', error);
                    });
            };

            return (
                <AlertDialogSlide title={"Are you sure you want to add this peer to your whitelist?"}
                    content={
                        "Name: " + selectedPeer.Name + " - " +
                        "Hash: " + selectedPeer.Hash + " - " +
                        "IP: " + selectedPeer.IP + " - " +
                        "Port: " + selectedPeer.Port
                    }
                    buttonLabel={"ADD PEER"}
                    agreeAction={agreeAction}
                    disagreeAction={disagreeAction} />
            )

        }
    }

    function parseContacts(document) {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(document, 'text/html');
            const selectElement = doc.getElementById('peers');
            const optionsArray = [];

            if (selectElement) {
                const options = selectElement.getElementsByTagName('option');
                for (let i = 0; i < options.length; i++) {
                    // console.log('Option text:', options[i].childNodes[0].nodeValue, 'Value:', options[i].attributes[0].nodeValue);
                    optionsArray.push({
                        hash: options[i].attributes[0].nodeValue,
                        name: options[i].childNodes[0].nodeValue
                    });
                }

            } else {
                console.error('Select element not found');
            }

            const jsonData = {
                peers: optionsArray
            };
            return jsonData;

        } catch (error) {
            console.error('Parsing error:', error);
        }

    }

    function delete_peer(hash) {
        axios.delete(`http://localhost:${apiPort}/api/delete_peer_from_whitelist?hash=${hash}`)
            .then(response => { 
            console.log("sending", response); 
            setLoading(false); })
            .catch(error => { 
            console.error('Error:', error); 
            })
    }

    function displayWhitelist() {
        if (whitelist.length > 0) {
            return (
                <div>
                    <h2>Whitelist:</h2>
                    <div style={{ textAlign: "left" }}>

                        {whitelist.map((peer, index) => {
                            return (
                                <div style={{display:"flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                                <p key={index} style={{ marginBottom: "10px" }}>
                                    Hash: {peer.hash} - IP: {peer.ip} - Port: {peer.port}
                                </p>
                                <Button variant="contained" color="error" onClick={() => delete_peer(peer.hash)}>Delete</Button>
                                </div>
                            )
                        })}
                        
                    </div>

                </div>
            )
        }
        else {
            return (
                <div>
                    <h2>Whitelist:</h2>
                    <p>No peers added to whitelist</p>
                </div>
            )
        }
    }

    useEffect(() => {
        fetch(`http://localhost:${apiPort}/api/get_contact_list`)
            .then(response => response.text())
            .then(data => {
            data = parseContacts(data);
            // console.log("contacts", data.peers);
            setContacts(data.peers);
            })
            .catch(error => {
            console.error('Error:', error);
            });
    }, []);

    useEffect(() => {
        function getPeers() {
            axios.get(`http://localhost:${apiPort}/getPeers`)
                .then(response => {
                    // console.log(response.data.peers);
                    setPeers(response.data.peers);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError(error);
                });
        }
        getPeers();
    }, [contacts]);

    useEffect(() => {
        function getWhitelist() {
            axios.get(`http://localhost:${apiPort}/api/get_whitelist`)
                .then(response => {
                    console.log(response.data);
                    setWhitelist(response.data.whitelist);
                    setLoading(true);
                })
                .catch(error => {
                    console.error('Error:', error);
                    setError(error);
                    setLoading(true);
                });
        }
        getWhitelist();
    }, [loading]);

    return (
        <div>
            <h1>Settings</h1>

            <div style={{ width: "50%", float: "left", display: "flex", flexDirection: "column", alignItems: 'center' }}>
                <h2>Add peers to whitelist:</h2>

                <Contacts options={contacts} selectedValue={selectedContact} onChange={handleContactChange} name="Select Contact" />
                {selectedContact && getIPFSHash()}
            </div>
            <div style={{ width: "50%", float: "right" }}>
                {displayWhitelist()}
            </div>



        </div>
    );
}

export default Settings;