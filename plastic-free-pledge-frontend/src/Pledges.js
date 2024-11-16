import { useEffect, useState } from 'react';
import axios from 'axios';

function Pledges() {
    const [pledges, setPledges] = useState([]);
    const formatDate = (date) => {
        const d = new Date(date);
        const year = d.getFullYear();
        const month = (d.getMonth() + 1).toString().padStart(2, '0');  // Add leading zero
        const day = d.getDate().toString().padStart(2, '0');           // Add leading zero
        return `${day}-${month}-${year}`;
    };
    useEffect(() => {
        // Fetch the initial pledges data
        axios.get('http://127.0.0.1:8000/api/pledges/')
            .then(response => setPledges(response.data))
            .catch(error => console.error(error));
    }, []);

    const handleDelete = async (id) => {
        // alert('clicked')
        try {
            const response = await axios.delete(`http://127.0.0.1:8000/api/pledges/${id}/`);
            if (response.status === 200) {
                setPledges(pledges.filter(pledge => pledge.id !== id));
                alert("Pledge deleted successfully!");
            }
        } catch (error) {
            console.error("Error deleting pledge:", error);
        }
        finally{
            window.location.reload(); 

        }
    };

    return (
        <div className="container mx-auto p-4 my-5">
            <h1 className="text-2xl font-bold mb-4">My Pledges</h1>
            {pledges.map(pledge => (
                <div key={pledge.id} className="p-4 mb-4 bg-white rounded-lg shadow-md">
                    <p className="text-lg font-semibold">{pledge.description}</p>
                    {/* Display the image if it exists */}
                    {pledge.image && (
                        <img
                            src={pledge.image}
                            alt="Pledge"
                            width="400"
                            height="350"
                            className="object-cover rounded-lg mb-4"
                        />
                    )}
                    <p className="text-sm text-gray-500">Date: {formatDate(pledge.date)}</p>

                    {/* Delete Button */}
                    <button 
                        onClick={() => handleDelete(pledge.id)} 
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
}

export default Pledges;
