import React from 'react';
const apiPort = process.env.REACT_APP_API_PORT;

const Explore = () => {
    // const [queryPredictions, setQueryPredictions] = React.useState([]);

    React.useEffect(() => {
        function getPredictions() {
            // get predictions from the server
            fetch(`http://localhost:${apiPort}/api/fetch_predictions`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    return data;
                })
                .catch(error => {
                    console.error('Error:', error);
                });
        }

        getPredictions();
    }, []);

    return (
        <div>
            <h1> Explore </h1>


        </div>
    );
};

export default Explore;