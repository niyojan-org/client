'use client';

import api from '@/lib/api';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Organization() {
  const router = useRouter();

  const [orgData, setOrgData] = useState(null);
  const [organizationList, setOrganizationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // --- FETCH ORGANIZATION DATA ---
  useEffect(() => {
    const fetchOrgDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get('/org/me');
        setOrgData(res.data.org);
        setOrganizationList([]);
        setError('');
      } catch {
        try {
          const orgListRes = await api.get('/org/public');
          const data = orgListRes.data.data || [];
          setOrganizationList(data);
          setOrgData(null);
          setError('');
        } catch (err) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error fetching organization list:', err);
          }
          setError('Failed to fetch organization details');
          setOrgData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrgDetails();
  }, []);

  const renderField = (label, value) => (
    <div className="flex justify-between border-b border-gray-200 py-3">
      <span className="font-semibold text-gray-600">{label}</span>
      <span className="text-gray-800 break-words max-w-[60%]">{value || '—'}</span>
    </div>
  );

  return (
    <main className="min-h-screen pt-24 px-6 md:px-16 bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
        {loading ? (
          <p className="text-lg font-medium text-indigo-600 animate-pulse">Loading...</p>
        ) : error ? (
          <p className="text-red-600 font-semibold text-center">{error}</p>
        ) : orgData ? (
          <>
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-8 border-b pb-4">
              Manage Your Organization
            </h1>
            <div className="space-y-3 text-sm md:text-base">
              {renderField('Name', orgData.name)}
              {renderField('Email', orgData.email)}
              {renderField('Phone', orgData.phone)}
              {renderField('Alternative Phone', orgData.alternativePhone)}
              {renderField('Category', orgData.category)}
              {renderField('Website', orgData.website || 'Not Provided')}
              {renderField('Description', orgData.description || 'Not Provided')}
              {renderField('Verified', orgData.verified ? 'Yes' : 'No')}
              {renderField('Active', orgData.active ? 'Yes' : 'No')}
              {renderField(
                'Created At',
                orgData.createdAt
                  ? new Date(orgData.createdAt).toLocaleString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })
                  : '—'
              )}
            </div>
            <div className="mt-8 flex justify-end">
              <Link
                href={`${process.env.NEXT_PUBLIC_ADMIN_URL}?token=${localStorage.getItem(
                  'token'
                )}&orgId=${orgData._id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-xl font-semibold shadow-md hover:bg-indigo-700 transition"
                aria-label="Manage in Admin Panel"
              >
                Manage in Admin Panel
              </Link>
            </div>
          </>
        ) : organizationList.length > 0 ? (
          <>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-6 gap-4">
              <h1 className="text-4xl font-extrabold text-indigo-900">Organizations</h1>
              <Link
                href="/org/create"
                className="bg-indigo-600 text-white py-2 px-6 rounded-lg font-semibold shadow hover:bg-indigo-700 transition"
                aria-label="Create New Organization"
              >
                Create New Organization
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {organizationList.map((org) => (
                <div
                  key={org._id}
                  className="group bg-white rounded-xl shadow-md p-5 cursor-pointer hover:shadow-xl transition-shadow flex flex-col justify-between"
                  tabIndex={0}
                  role="button"
                  onClick={() => router.push(`/org/${org.slug}`)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') router.push(`/org/${org.slug}`);
                  }}
                >
                  <div>
                    <h2 className="text-xl font-bold text-indigo-900 mb-1 truncate">{org.name}</h2>
                    <p className="text-sm text-gray-600 mb-1">
                      Category: <span className="font-medium text-gray-800">{org.category} / {org.subCategory}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-1 truncate">
                      Admin: {org.admin?.name} ({org.admin?.email})
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Rating: <span className="font-semibold text-indigo-600">{org.rating?.averageRating ?? 0} ({org.rating?.totalRatings ?? 0} ratings)</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-1">
                      Created: <span className="font-medium">{org.createdAt ? new Date(org.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) : '—'}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-1 truncate">
                      Address: <span className="font-medium">{org.address?.street}, {org.address?.city}, {org.address?.state}, {org.address?.country} {org.address?.zipCode}</span>
                    </p>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-sm">
                    {org.socialLinks?.facebook && (
                      <Link href={org.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Facebook</Link>
                    )}
                    {org.socialLinks?.instagram && (
                      <Link href={org.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 underline">Instagram</Link>
                    )}
                    {org.socialLinks?.linkedin && (
                      <Link href={org.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-800 underline">LinkedIn</Link>
                    )}
                    <Link href={`/org/${org.slug}`} className="text-indigo-700 underline">View Details</Link>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-16">
            <h1 className="text-4xl font-extrabold text-indigo-900 mb-6">No Organizations Found</h1>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              You haven’t created an organization yet. Get started by creating one now.
            </p>
            <Link
              href="/org/create"
              className="inline-block bg-indigo-600 text-white py-3 px-8 rounded-xl font-semibold shadow hover:bg-indigo-700 transition"
              aria-label="Create Organization"
            >
              Create Organization
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
