import axios from 'axios';
import * as React from 'react';
import { useState, useEffect } from 'react';
const apiPort = process.env.REACT_APP_API_PORT;
const backendUrl = process.env.REACT_APP_BACKEND_ADDRESS;

function Profile() {
    let [peerInfo, setPeerInfo] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    function detectBrowserAndGetHistory() {
        let browser = '';
        if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) !== -1) {
            browser = 'Opera';
        }
        else if (navigator.userAgent.indexOf("Chrome") !== -1) {
            browser = 'Chrome';
        }
        else if (navigator.userAgent.indexOf("Safari") !== -1) {
            browser = 'Safari';
        }
        else if (navigator.userAgent.indexOf("Firefox") !== -1) {
            browser = 'Firefox';
        }
        else if ((navigator.userAgent.indexOf("MSIE") !== -1) || (!!document.documentMode === true)) {
            browser = 'IE';
        }
        else {
            browser = 'unknown';
        }
        return browser;
    }

    function getPeerInfo() {
        axios.get(`http://${backendUrl}:${apiPort}/profile`)
            .then(response => {
                setPeerInfo(response.data);
                // console.log(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                console.error('Error:', error);
                setLoading(false);
            });
    }


    function displayPeerInfo() {

        let parser = new DOMParser();
        let xmlDoc = parser.parseFromString(peerInfo,"text/xml");

        let profile = xmlDoc.getElementsByTagName("your")[0];

        return (
            <div>
                <h1>Profile</h1>
                <div className='profile-box'>
                    <p>Peer Name: {profile.getElementsByTagName("name")[0].childNodes[0].nodeValue}</p>
                    <p>Hash: {profile.getElementsByTagName("hash")[0].childNodes[0].nodeValue}</p>
                    <p>Peer type: {profile.getElementsByTagName("type")[0].childNodes[0].nodeValue}</p>
                    <p>Browser: {detectBrowserAndGetHistory()}</p>
                </div>
                
            </div>
        );
    }

    useEffect(() => {
        getPeerInfo();
    }, []);

    if (loading) {
        return <div className='App'><h1>Loading...</h1></div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {peerInfo && displayPeerInfo()}
        </div>
    );
    }
export default Profile;