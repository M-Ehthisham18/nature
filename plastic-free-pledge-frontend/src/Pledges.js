import { useEffect, useState } from 'react';
import axios from 'axios';

function Pledges() {
    const [pledges, setPledges] = useState([]);
    
    // Function to format the date
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
        // Confirm deletion with the user
        const confirmDelete = window.confirm("Are you sure you want to delete this pledge?");
        
        if (confirmDelete) {
            try {
                const response = await axios.delete(`http://127.0.0.1:8000/api/pledges/${id}/`);
                if (response.status === 204) {  // A successful deletion returns status code 204 (No Content)
                    setPledges(pledges.filter(pledge => pledge.id !== id));
                }
            } catch (error) {
                console.error("Error deleting pledge:", error);
            }
        } else {
            // If the user cancels, do nothing
            console.log("Delete operation cancelled");
        }
    };

    return (
        <div className="container mx-auto p-4 my-5">
            <h1 className="text-2xl font-bold mb-8 p-2 border-b-2 border-gray-500">My Pledges</h1>
            {/* Reverse the pledges array only for rendering */}
            {[...pledges].reverse().map(pledge => (
                <div key={pledge.id} className="p-4 mb-4 bg-white rounded-lg shadow-md">
                    <p className="text-lg font-semibold capitalize">{pledge.author}</p>
                    
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
                    <p className="text-lg font-semibold">{pledge.description}</p>
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
