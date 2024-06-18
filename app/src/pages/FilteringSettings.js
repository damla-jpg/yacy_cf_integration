import * as React from 'react';
import { useEffect, useState } from 'react';


function FilteringSettings() {
    const [filteringSettings, setFilteringSettings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    return (
        <div>
            <h1>Filtering Settings</h1>
        </div>
    );
}

export default FilteringSettings;