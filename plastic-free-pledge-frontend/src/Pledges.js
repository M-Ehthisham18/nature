import { useEffect, useState } from 'react';
import axios from 'axios';

function Pledges() {
    const [pledges, setPledges] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/pledges/')
            .then(response => setPledges(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div className="container mx-auto p-4 my-5">
            <h1 className="text-2xl font-bold mb-4">My Pledges</h1>
            {pledges.map(pledge => (
                <div key={pledge.id} className="p-4 mb-4 bg-white rounded-lg shadow-md ">
                    <p className="text-lg font-semibold">{pledge.description}</p>
                    {/* Display the image if it exists */}
                    {pledge.image && (
                    <img
                    src={pledge.image}
                    alt="Pledge"
                    width="400"
                    height="350"
                    className=" object-cover rounded-lg mb-4"
                    />
                )}
                    <p className="text-sm text-gray-500">Date: {pledge.date}</p>
                            </div>
                        ))}
        </div>
    );
}

export default Pledges;
