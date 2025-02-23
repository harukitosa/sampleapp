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
    </div>
  );
};

export default CompanyDetails;
