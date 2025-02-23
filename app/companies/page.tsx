"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';

interface Company {
  id: number;
  name: string;
  description?: string;
  website?: string;
  created_at: string;
  updated_at: string;
}

const CompanyList: React.FC = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [loading, setLoading] = useState(true);

  const supabase = createClient();

  useEffect(() => {
    const fetchCompanies = async () => {
      const { data, error } = await supabase
        .from('companies')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching companies:', error);
      } else {
        setCompanies(data || []);
      }
      setLoading(false);
    };

    fetchCompanies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">企業一覧</h1>
      <ul className="space-y-4">
        {companies.map((company) => (
          <li key={company.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{company.name}</h2>
            {company.description && <p>{company.description}</p>}
            {company.website && (
              <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500">
                {company.website}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CompanyList;
