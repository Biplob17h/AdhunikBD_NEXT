// components/VendorExpertManage.js
import { useState } from 'react';
import { FaUser, FaPhone, FaIdCard, FaImage, FaCalendar, FaBriefcase, FaEdit, FaTrash } from 'react-icons/fa';
import hostPhoto from "../../../../../utils/hostPhoto/hostPhoto";

const VendorExpertManage = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [nid, setNid] = useState('');
  const [age, setAge] = useState('');
  const [workExperience, setWorkExperience] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoUrl, setPhotoUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [experts, setExperts] = useState([
    {
      id: 1,
      name: 'John Doe',
      number: '1234567890',
      nid: '1234567890123',
      age: '30',
      workExperience: '5 years',
      photoUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'Jane Smith',
      number: '0987654321',
      nid: '9876543210987',
      age: '28',
      workExperience: '4 years',
      photoUrl: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'Alice Johnson',
      number: '1122334455',
      nid: '1122334455667',
      age: '35',
      workExperience: '10 years',
      photoUrl: 'https://via.placeholder.com/150',
    },
  ]);
  const [editExpertId, setEditExpertId] = useState(null);

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const photoUrl = await hostPhoto(photo);
      setPhotoUrl(photoUrl);

      const newExpert = {
        id: experts.length + 1,
        name,
        number,
        nid,
        age,
        workExperience,
        photoUrl,
      };

      setExperts([...experts, newExpert]);
      alert('Expert added successfully!');
      resetForm();
    } catch (error) {
      console.error('Error adding expert:', error);
      alert('Failed to add expert.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (expert) => {
    setEditExpertId(expert.id);
    setName(expert.name);
    setNumber(expert.number);
    setNid(expert.nid);
    setAge(expert.age);
    setWorkExperience(expert.workExperience);
    setPhotoUrl(expert.photoUrl);
  };

  const handleUpdate = () => {
    const updatedExperts = experts.map((expert) =>
      expert.id === editExpertId
        ? {
            ...expert,
            name,
            number,
            nid,
            age,
            workExperience,
            photoUrl,
          }
        : expert
    );
    setExperts(updatedExperts);
    setEditExpertId(null);
    resetForm();
    alert('Expert updated successfully!');
  };

  const handleDelete = (id) => {
    const filteredExperts = experts.filter((expert) => expert.id !== id);
    setExperts(filteredExperts);
    alert('Expert deleted successfully!');
  };

  const resetForm = () => {
    setName('');
    setNumber('');
    setNid('');
    setAge('');
    setWorkExperience('');
    setPhoto(null);
    setPhotoUrl('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-green-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Add Expert Form */}
        <div className="bg-white rounded-lg shadow-2xl p-8 mb-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-blue-600">
              {editExpertId ? 'Edit Expert' : 'Add an Expert'}
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              {editExpertId
                ? 'Update the expert details below.'
                : 'Please fill in the details to add a new expert.'}
            </p>
          </div>
          <form className="mt-6 space-y-4" onSubmit={editExpertId ? handleUpdate : handleSubmit}>
            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaPhone className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="number"
                  name="number"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Phone Number"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaIdCard className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="nid"
                  name="nid"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="NID Card Number"
                  value={nid}
                  onChange={(e) => setNid(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaCalendar className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="age"
                  name="age"
                  type="number"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaBriefcase className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="workExperience"
                  name="workExperience"
                  type="text"
                  required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Work Experience (in years)"
                  value={workExperience}
                  onChange={(e) => setWorkExperience(e.target.value)}
                />
              </div>
              <div className="relative">
                <FaImage className="absolute left-3 top-3 text-gray-400" />
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  required={!editExpertId}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  onChange={handlePhotoChange}
                />
              </div>
            </div>

            {/* Submit/Update Button */}
            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-300"
              >
                {isLoading
                  ? editExpertId
                    ? 'Updating...'
                    : 'Adding...'
                  : editExpertId
                  ? 'Update Expert'
                  : 'Add Expert'}
              </button>
            </div>
          </form>
        </div>

        {/* Expert List */}
        <div className="bg-white rounded-lg shadow-2xl p-8">
          <h2 className="text-2xl font-bold text-blue-600 mb-6">Expert List</h2>
          <div className="space-y-4">
            {experts.map((expert) => (
              <div
                key={expert.id}
                className="flex flex-col md:flex-row items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={expert.photoUrl}
                    alt={expert.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{expert.name}</h3>
                    <p className="text-sm text-gray-600">{expert.number}</p>
                  </div>
                </div>
                <div className="flex space-x-4 mt-4 md:mt-0">
                  <button
                    onClick={() => handleEdit(expert)}
                    className="text-blue-600 hover:text-blue-800 transition-colors"
                  >
                    <FaEdit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(expert.id)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <FaTrash className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorExpertManage; 