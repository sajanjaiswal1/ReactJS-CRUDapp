import React, { useEffect, useState } from 'react';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [profilesPerPage] = useState(5);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProfiles = () => {
      const storedProfiles = JSON.parse(localStorage.getItem('formData')) || [];
      setProfiles(storedProfiles);
    };

    fetchProfiles();
  }, []);

  // Filter profiles based on the search query
  const filteredProfiles = profiles.filter(profile =>
    profile.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.dob.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.province.toLowerCase().includes(searchQuery.toLowerCase()) ||
    profile.district.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProfiles.length / profilesPerPage);

  const indexOfLastProfile = currentPage * profilesPerPage;
  const indexOfFirstProfile = indexOfLastProfile - profilesPerPage;
  const currentProfiles = filteredProfiles.slice(indexOfFirstProfile, indexOfLastProfile);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (id) => {
    const updatedProfiles = profiles.filter(profile => profile.id !== id);
    setProfiles(updatedProfiles);
    localStorage.setItem('formData', JSON.stringify(updatedProfiles));
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <div className="container mx-auto mt-4 bg-rose-50 p-8">
        <Link to="/">
          <button className='bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded'>Add profile</button>
        </Link>
        <h1 className="font-bold text-2xl my-4 text-center">Profiles</h1>

        <div className="mb-4 text-center">
          <input
            type="text"
            placeholder="Search profiles..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="border rounded-sm p-2 w-1/2 bg-neutral-200"
          />
        </div>

        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">Email</th>
              <th className="border border-gray-500 px-4 py-2">Phone</th>
              <th className="border border-gray-500 px-4 py-2">Date of Birth</th>
              <th className="border border-gray-500 px-4 py-2">Country</th>
              <th className="border border-gray-500 px-4 py-2">City</th>
              <th className="border border-gray-500 px-4 py-2">Province</th>
              <th className="border border-gray-500 px-4 py-2">District</th>
              <th className="border border-gray-500 px-4 py-2 col-span-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {currentProfiles.length > 0 ? (
              currentProfiles.map((data) => (
                <tr key={data.id}>
                  <td className="border border-gray-500 px-4 py-2">{data.name}</td>
                  <td className="border border-gray-500 px-4 py-2">{data.email}</td>
                  <td className="border border-gray-500 px-4 py-2">{data.phone}</td>
                  <td className="border border-gray-500 px-4 py-2">{data.dob}</td>
                  <td className="border border-gray-500 px-4 py-2">{data.country}</td>
                  <td className="border border-gray-500 px-4 py-2">{data.city}</td>
                  <td className="border border-gray-500 px-4 py-2">{data.province}</td>
                  <td className="border border-gray-500 px-4 py-2">{data.district}</td>
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
              ))
            ) : (
              <tr>
                <td colSpan="9" className="border border-gray-500 px-4 py-2 text-center">
                  No profiles found
                </td>
              </tr>
            )}
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

export default Profiles;
