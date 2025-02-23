"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '../../../../../utils/supabase/client';
import { useParams, useRouter } from 'next/navigation';

const RecruitmentDetailPage = () => {
  const { recruitmentId, id: companyId } = useParams();
  const [recruitmentDetails, setRecruitmentDetails] = useState<{
    job_title: string;
    description: string;
    // Add more fields as necessary
  } | null>(null);

  useEffect(() => {
    const fetchRecruitmentDetails = async () => {
      const supabase = createClient();
      const { data, error } = await supabase
        .from('recruitments')
        .select('*')
        .eq('id', recruitmentId)
        .eq('company_id', companyId)
        .single();

      if (error) {
        console.error('Error fetching recruitment details:', error);
      } else {
        setRecruitmentDetails(data);
      }
    };

    fetchRecruitmentDetails();
  }, [recruitmentId, companyId]);

  // Placeholder for fetching recruitment details
  // This should be replaced with actual data fetching logic
  if (!recruitmentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">{recruitmentDetails.job_title}</h1>
      <p className="text-gray-700 mb-6">{recruitmentDetails.description}</p>
      {/* Add more details as necessary */}
      <a href={`/companies/${companyId}`} className="inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
        Back to List
      </a>
    </div>
  );
};

export default RecruitmentDetailPage;
