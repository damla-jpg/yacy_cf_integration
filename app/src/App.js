import logo from './logo.svg';
import './App.css';
import * as React from 'react';

const LOCALHOST_URL = "https://localhost:";
const LOCALHOST_URL_SECURE = "https://localhost:";
const YACY_DEFAULT_PORT = 8090;
const YACY_BLOG_URL = "/Blog.html";
const YACY_INCOMING_NEWS_URL = "/News.html?page=1";
const YACY_CRAWLER_URL = "/Crawler_p.html?";
const YACY_CRAWL_URL_ARG = "crawlingURL=";
const YACY_CRAWL_REQUEST_START_ARG = "crawlingstart=";
const YACY_CRAWL_DEPTH_ARG = "crawlingDepth=";
const YACY_DEFAULT_CRAWLING_DEPTH = 2;
const YACY_CRAWL_MODE_ARG = "crawlingMode=";
const YACY_DEFAULT_CRAWLING_MODE = "url";
const YACY_CRAWL_Q_ARG = "crawlingQ=";
const YACY_DEFAULT_CRAWLING_Q = "on";
const YACY_MESSAGES_URL = "/Messages_p.html";
const YACY_MESSAGE_SEND_URL_START = "/MessageSend_p.html?hash=";
const YACY_MESSAGE_SEND_URL_FINISH = "&submit=Compose";
const YACY_DEFAULT_MESSAGE_SIZE = 10240000;
const YACY_DEFAULT_ATTACHMENT_SIZE = 0;
const TIME_TO_KILL_MESSAGE = 3600000
const DEFAULT_USER_HISTORY = [];
const DEFAULT_PEER_LIST = "";
const DEFAULT_MESAGE_HISTORY = [["Date",], ["From", ,], ["To",], ["Subject",], ["Action", "view", , "reply", , "delete",]];
const DEFAULT_CONTACT_LIST = ["", "", true];
const DATE_INDEX = 0;
const DATE_CONTENT_INDEX = 1;
const FROM_INDEX = 1;
const FROM_NAME_INDEX = 1;
const FROM_LINK_INDEX = 2;
const TO_INDEX = 2;
const TO_CONTENT_INDEX = 1;
const SUBJECT_INDEX = 3;
const SUBJECT_CONTENT_INDEX = 1;
const ACTION_INDEX = 4;
const ACTION_VIEW_INDEX = 1;
const ACTION_VIEW_LINK_INDEX = 2;
const ACTION_REPLY_INDEX = 3;
const ACTION_REPLY_LINK_INDEX = 4;
const ACTION_DELETE_INDEX = 5;
const ACTION_DELETE_LINK_INDEX = 6;
const ALIVE_MESSAGE = "extension_user_alive";

let userPort = YACY_DEFAULT_PORT;
var peerNamesAndHashes = peerListGet();

async function createPeerTxtFile(){
  console.log("DEBUG: Obtaining peer list");
  var peerNamesAndHashes = peerListGet();

  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var cors_api_url = 'https://' + cors_api_host + '/';

  console.log("Url check: " + LOCALHOST_URL + userPort + YACY_MESSAGES_URL);

  fetch(LOCALHOST_URL + userPort + YACY_MESSAGES_URL)
    .then(function(response) {
        // When the page is loaded convert it to text
        return response.text();
    })
    .catch(function(err){
      console.log("Failed to load message page: " + err + "\nAttempting secure https");
    })
}

async function logMessages() {
  const response = await fetch("http://localhost:8091/Messages_p.html");
  const message = await response.json();
  console.log(message);
}

async function peerListSet() {
  console.log("Url check: " + cors_api_url + LOCALHOST_URL + userPort + YACY_MESSAGES_URL);
  var cors_api_host = 'cors-anywhere.herokuapp.com';
  var cors_api_url = 'https://' + cors_api_host + '/';
  fetch(cors_api_url + LOCALHOST_URL + userPort + YACY_MESSAGES_URL)
    .then(function(response) {
        return response.text();
    })
    .catch(function(err){
      console.log("Failed to load message page: " + err);
    })
    .then(function(html) {
      var parser = new DOMParser();
      var doc = parser.parseFromString(html, "text/html");
      var peerList = doc.getElementById('peers');

      peerNamesAndHashes = [...peerList.options].map(o => [o.text, o.value]);
      console.log("Peer list stored: ");
      console.log(peerNamesAndHashes);
      localStorage.setItem("peerList", JSON.stringify(peerNamesAndHashes));
  })
    .catch(function(err) {  
      console.log('Failed to fetch peer list: ', err);
  });
}

function peerListGet() {
  let storedPeerList = localStorage.getItem("peerList");
  if (storedPeerList === null){
    console.log("No peer list stored");
    return DEFAULT_PEER_LIST;
  }
  else {
    console.log("Peer list loaded: ")
    console.log(JSON.parse(storedPeerList));
    return JSON.parse(storedPeerList);
  }
}

function peerListClear() {
  localStorage.removeItem("peerList");
  console.log("Peer list cleared");
}




async function testFunction() {
  console.log("[[TEST]]");
  try {
    //let res = await readMessage("http://localhost:8090/Messages_p.html?action=view&object=remote______2024041706105201");
    //let historyLinks = parseMessage(res);
    //console.log("TEST: " + historyLinks);

    // let res = await getYacyCrawler();
    let res = logMessages();
    console.log("TEST: " + res);
  }
  catch (error) {
    console.log("Test error: " + error);
  }
}

function App() {
  return (
    <div className="App">
      <button onClick={testFunction}>Hello</button>
    </div>
  );
}

export default App;
