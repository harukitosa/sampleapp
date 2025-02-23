"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '../../../utils/supabase/client';

const supabase = createClient();

const CompanyDetails = () => {
  const router = useRouter();
  const { id } = useParams();
  type Company = {
  id: number;
  name: string;
  description?: string;
  website?: string;
  created_at: string;
  updated_at: string;
};

const [company, setCompany] = useState<Company | null>(null);
type Recruitment = {
  id: number;
  title: string;
  description: string;
  created_at: string;
};

const [recruitments, setRecruitments] = useState<Recruitment[]>([]);

  useEffect(() => {
    if (id) {
      const fetchCompany = async () => {
        const { data, error } = await supabase
          .from('companies')
          .select('*')
          .eq('id', id)
          .single();

        if (error) {
          console.error('Error fetching company:', error);
        } else {
          setCompany(data);
        }
      };

      fetchCompany();
    }
    if (id) {
      const fetchRecruitments = async () => {
        const { data, error } = await supabase
          .from('recruitments')
          .select('*')
          .eq('company_id', id);

        if (error) {
          console.error('Error fetching recruitments:', error);
        } else {
          setRecruitments(data);
        }
      };

      fetchRecruitments();
    }
  }, [id]);

  if (!company) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{company.name}</h1>
      <p className="text-lg mb-4">{company.description}</p>
      {company.website && (
        <a
          href={company.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline mb-4 block"
        >
          Visit Website
        </a>
      )}
      <button
        onClick={() => router.push(`/companies/${id}/edit`)}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Edit Company
      </button>
      <button
        onClick={() => router.push(`/companies/${id}/create-job`)}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
      >
        Create Job
      </button>
      <h2 className="text-2xl font-bold mt-8 mb-4">Recruitment Listings</h2>
      {recruitments.length === 0 ? (
        <p>No recruitments available.</p>
      ) : (
        <ul>
          {recruitments.map((recruitment) => (
            <li key={recruitment.id} className="mb-4">
              <h3 className="text-xl font-semibold">{recruitment.title}</h3>
              <p>{recruitment.description}</p>
              <p className="text-sm text-gray-500">
                Posted on: {new Date(recruitment.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CompanyDetails;
