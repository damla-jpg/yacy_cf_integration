import React from 'react';
import { Card, CardActionArea, CardContent, listItemButtonClasses, Typography } from '@mui/material';
const apiPort = process.env.REACT_APP_API_PORT;

const Explore = () => {
    const [queryPredictions, setQueryPredictions] = React.useState([]);

    function displayQueryPredictions() {
        const new_preds = Object.entries(queryPredictions)
        return new_preds.map((prediction, index) => {
            // purple: #4a148c
            return (
                <Card key={index} sx={{ width: 450, minHeight: 200, backgroundColor:"#616161", margin: "auto", marginBottom: "10px" }} >
                    <CardActionArea>
                        <CardContent>
                            <Typography gutterBottom variant="h4" color="white" component="h2">
                                {prediction[0]}
                            </Typography>
                            
                                {prediction[1].map((link, index) => {
                                    return (
                                        <Typography  color="textSecondary" >
                                        <a key={index} href={link} target="_blank" rel="noreferrer">{link}</a>
                                        </Typography>
                                    );
                                }
                                )}
                           
                        </CardContent>
                    </CardActionArea>
                </Card>
            );
        });
    }

    React.useEffect(() => {
        function getPredictions() {
            // get predictions from the server
            fetch(`http://localhost:${apiPort}/api/fetch_predictions`)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    setQueryPredictions(data.predictions);
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
            <div style={{ display: "grid", gridTemplateColumns: "auto auto auto", padding: "10px" }}>
                {queryPredictions && displayQueryPredictions()}
            </div>
        </div>
    );
};

export default Explore;