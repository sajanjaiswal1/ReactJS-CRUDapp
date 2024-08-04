import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";

const Read = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(5);
  const navigate = useNavigate();


  useEffect(() => {
    const fetchProfiles = () => {
      const storedProfiles = JSON.parse(localStorage.getItem("formData")) || [];
      setProfiles(storedProfiles);
    };

    fetchProfiles();
  }, []);

  const totalPages = Math.ceil(profiles.length / profilesPerPage);

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = profiles.slice(
    indexOfFirstProfile,
    indexOfLastProfile
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
    localStorage.setItem("formData", JSON.stringify(updatedProfiles));
  };

  const handleClick = (e) => {
    e.preventDefault();
    navigate("/profiles");
  };

  return (
    <div>
      <div className="container mx-auto mt-4 bg-rose-50 p-8">
        <Link to="/">
          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded">
            Add profile
          </button>
        </Link>
        <button
                    type="button"
                    onClick={handleClick}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded float-end"
                  >
                    View Profiles
            </button>
        <h1 className="font-bold text-2xl my-4 text-center">Profiles</h1>
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">City</th>
              <th className="border border-gray-500 px-4 py-2">Country</th>
              <th className="border border-gray-500 px-4 py-2 col-span-2">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentProfiles.map((data) => (
              <tr key={data.id}>
                <td className="border border-gray-500 px-4 py-2">
                  {data.name}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {data.city}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  {data.country}
                </td>
                <td className="border border-gray-500 px-4 py-2">
                  <Link
                    className="text-white px-2 py-1 mr-1 bg-blue-600 rounded hover:bg-blue-700"
                    to={`/update/${data.id}`}
                  >
                    Edit
                  </Link>
                  <button
                    className="text-white px-2 py-1 mt-2 bg-red-600 rounded hover:bg-red-700"
                    onClick={() => handleDelete(data.id)}
                  >
                    Delete
                  </button>
                 
                </td>
              </tr>
            ))}
            
          </tbody>
        </table>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Read;
