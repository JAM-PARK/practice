// src/pages/UsersPage.tsx
import React, { useState } from 'react';
import { DefaultService } from '../api'; // OpenAPI Codegen으로 생성된 기본 서비스 객체

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<{ id: number; name: string }[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch all users
  const fetchUsers = () => {
    setError(null); // Reset error state
    DefaultService.getApiUsers()
      .then(response => {
        setUsers(response);
      })
      .catch(err => {
        setError('Error fetching users');
        console.error(err);
      });
  };

  // Fetch user by ID
  const fetchUserById = (id: number) => {
    setError(null); // Reset error state
    DefaultService.getApiUsers1(id)
      .then(response => {
        setUsers([response]);
      })
      .catch(err => {
        setError('User not found');
        console.error(err);
      });
  };

  // Create a new user
  const createUser = () => {
    const newUser = { name: 'Charlie' };
    setError(null); // Reset error state
    DefaultService.postApiUsers(newUser)
      .then(response => {
        setUsers(prev => [...prev, response]);
      })
      .catch(err => {
        setError('Error creating user');
        console.error(err);
      });
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-center mb-4">Users Page</h1>
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
          onClick={fetchUsers}
        >
          Get All Users
        </button>
        <button
          className="px-4 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600"
          onClick={() => fetchUserById(1)} // setstate
        >
          Get User by ID (1)
        </button>
        <button
          className="px-4 py-2 bg-purple-500 text-white rounded shadow hover:bg-purple-600"
          onClick={createUser}
        >
          Create New User
        </button>
      </div>
      {error && <div className="text-red-500 text-center mb-4">{error}</div>}
      <ul className="bg-white rounded shadow p-4">
        {users.map(user => (
          <li
            key={user.id}
            className="border-b last:border-none py-2 px-4 text-gray-700"
          >
            {user.id}: {user.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
