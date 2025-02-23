"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';

const ProfileInputPage = () => {
  const [userType, setUserType] = useState('corporate');
  const [name, setName] = useState('');
  const router = useRouter();

const handleSubmit = async (event: React.FormEvent) => {
  event.preventDefault();
  try {
    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      console.error('User not logged in or error fetching user:', userError);
      return;
    }

    const { error } = await supabase.from('profiles').insert([{ id: user.id, user_type: userType, name }]);
    if (error) throw error;
    console.log('Profile data inserted successfully');
    // Redirect to another page after submission
    router.push('/');
  } catch (error) {
    console.error('Error inserting profile data:', error);
  }
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Complete Your Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">User Type</label>
          <select
            value={userType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setUserType(e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
          >
            <option value="corporate">Corporate</option>
            <option value="engineer">Engineer</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <Input
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            required
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default ProfileInputPage;
