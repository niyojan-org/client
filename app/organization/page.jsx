"use client";

import api from "@/lib/api";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react"; // optional: star icon for ratings
import { SpinnerCustom } from "@/components/ui/spinner";

export default function Organization() {
  const router = useRouter();

  const [orgData, setOrgData] = useState(null);
  const [organizationList, setOrganizationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrgDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get("/org/me");
        setOrgData(res.data.org);
        setOrganizationList([]);
        setError("");
      } catch {
        try {
          const orgListRes = await api.get("/org/public");
          setOrganizationList(orgListRes.data.data || []);
          setOrgData(null);
          setError("");
        } catch (err) {
          if (process.env.NODE_ENV === "development") console.error(err);
          setError("Failed to fetch organization details");
          setOrgData(null);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchOrgDetails();
  }, []);

  const renderField = (label, value, highlight = false) => (
    <div className="flex justify-between border-b border-gray-200 py-2">
      <span className="font-semibold text-gray-600">{label}</span>
      <span
        className={`${
          highlight ? "font-bold text-indigo-700" : "text-gray-800"
        } break-words max-w-[60%]`}
      >
        {value || "—"}
      </span>
    </div>
  );

  const renderRating = (rating) => (
    <div className="flex items-center space-x-1">
      <Star className="w-4 h-4 text-yellow-400" />
      <span className="font-semibold text-gray-800">{rating ?? 0}</span>
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        {/* <p className="text-indigo-600 font-medium animate-pulse">Loading...</p> */}
        <SpinnerCustom />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-[calc(100vh-64px)]">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  return (
    <main className="min-h-screen pt-24 px-6 md:px-16 bg-background">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* --- User's Organization --- */}
        {orgData && (
          <Card className="rounded-2xl shadow-lg hover:shadow-2xl transition-all">
            <CardHeader>
              <CardTitle className="text-3xl text-indigo-900 font-bold">
                Your Organization
              </CardTitle>
              <CardDescription className="text-gray-600">
                Manage your organization directly from here
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700 text-sm">
              {renderField("Name", orgData.name, true)}
              {renderField("Email", orgData.email)}
              {renderField("Phone", orgData.phone)}
              {renderField("Alternative Phone", orgData.alternativePhone)}
              {renderField("Category", orgData.category, true)}
              {renderField("Website", orgData.website || "Not Provided")}
              {renderField(
                "Description",
                orgData.description || "Not Provided"
              )}
              {renderField("Verified", orgData.verified ? "Yes" : "No", true)}
              {renderField("Active", orgData.active ? "Yes" : "No")}
              {renderField(
                "Created At",
                orgData.createdAt
                  ? new Date(orgData.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "—"
              )}
              {renderField(
                "Rating",
                renderRating(orgData.rating?.averageRating),
                true
              )}
            </CardContent>
            <CardFooter className="flex justify-end">
              <Link
                href={`${
                  process.env.NEXT_PUBLIC_ADMIN_URL
                }?token=${localStorage.getItem("token")}&orgId=${orgData._id}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold">
                  Manage in Admin Panel
                </Button>
              </Link>
            </CardFooter>
          </Card>
        )}

        {/* --- Other Organizations --- */}
        {organizationList.length > 0 && (
          <div className="space-y-8 ">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h2 className="text-3xl font-extrabold text-indigo-900">
                Organizations
              </h2>
              <Link href="/org/create">
                <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold">
                  Create New Organization
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {organizationList.map((org) => (
                <Card
                  key={org._id}
                  className="group cursor-pointer hover:shadow-2xl transition-shadow rounded-2xl flex flex-col justify-between border border-gray-200"
                  onClick={() => router.push(`/org/${org.slug}`)}
                >
                  {/* Card Header */}
                  <CardHeader className="px-5 pt-5">
                    <div className="flex justify-between items-center">
                      <CardTitle className="text-xl font-bold text-indigo-900 truncate">
                        {org.name}
                      </CardTitle>
                      <span className="px-2 py-1 bg-indigo-100 text-indigo-700 text-xs font-semibold rounded-full">
                        {org.category}{" "}
                        {org.subCategory ? `/ ${org.subCategory}` : ""}
                      </span>
                    </div>
                    <CardDescription className="text-gray-600 text-sm mt-1 truncate">
                      Admin:{" "}
                      <span className="font-medium text-gray-800">
                        {org.admin?.name}
                      </span>{" "}
                      ({org.admin?.email})
                    </CardDescription>
                  </CardHeader>

                  {/* Card Content */}
                  <CardContent className="px-5 space-y-2 text-gray-700 text-sm">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-800">
                        Rating:
                      </span>
                      {renderRating(org.rating?.averageRating)}
                      <span className="text-gray-500 text-xs">
                        ({org.rating?.totalRatings ?? 0})
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-800">
                        Created:
                      </span>{" "}
                      {org.createdAt
                        ? new Date(org.createdAt).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })
                        : "—"}
                    </div>
                    <div className="truncate">
                      <span className="font-semibold text-gray-800">
                        Address:
                      </span>{" "}
                      {org.address?.street}, {org.address?.city}
                    </div>
                  </CardContent>

                  {/* Card Footer */}
                  <CardFooter className="px-5 pb-5 flex flex-wrap gap-2">
                    {org.socialLinks?.facebook && (
                      <Link
                        href={org.socialLinks.facebook}
                        target="_blank"
                        className="text-blue-600 underline text-xs font-medium"
                      >
                        Facebook
                      </Link>
                    )}
                    {org.socialLinks?.instagram && (
                      <Link
                        href={org.socialLinks.instagram}
                        target="_blank"
                        className="text-pink-600 underline text-xs font-medium"
                      >
                        Instagram
                      </Link>
                    )}
                    {org.socialLinks?.linkedin && (
                      <Link
                        href={org.socialLinks.linkedin}
                        target="_blank"
                        className="text-blue-800 underline text-xs font-medium"
                      >
                        LinkedIn
                      </Link>
                    )}
                    {/* <Link
                      href={`/org/${org.slug}`}
                      className="text-indigo-700 underline text-xs font-medium ml-auto"
                    >
                      View Details
                    </Link> */}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* --- No Data --- */}
        {!orgData && organizationList.length === 0 && (
          <div className="text-center py-16">
            <h2 className="text-4xl font-extrabold text-indigo-900 mb-6">
              No Organizations Found
            </h2>
            <p className="text-gray-600 mb-8 max-w-xl mx-auto">
              You haven’t created an organization yet. Get started by creating
              one now.
            </p>
            <Link href="/org/create">
              <Button className="bg-indigo-600 text-white hover:bg-indigo-700 transition font-semibold">
                Create Organization
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
