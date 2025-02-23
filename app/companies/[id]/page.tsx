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
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      {company.website && (
        <a href={company.website} target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      )}
    </div>
  );
};

export default CompanyDetails;
