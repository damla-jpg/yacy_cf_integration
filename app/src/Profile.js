/*global chrome*/
import * as React from 'react';

function Profile() {
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

    return (
        <div>
        <h1>{detectBrowserAndGetHistory()}</h1>
        </div>
    );
    }
export default Profile;