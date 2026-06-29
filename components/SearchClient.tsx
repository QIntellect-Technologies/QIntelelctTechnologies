"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { INDUSTRIES, BLOGS, SERVICES } from '../constants';

const SearchResults: React.FC = () => {
  const searchParams = useSearchParams();
  const query = searchParams?.get('q') || '';

  const normalizedQuery = query.toLowerCase();

  const matchedServices = SERVICES.filter(
    (s) => s.title.toLowerCase().includes(normalizedQuery) || s.shortDescription.toLowerCase().includes(normalizedQuery)
  );

  const matchedIndustries = INDUSTRIES.filter(
    (i) => i.title.toLowerCase().includes(normalizedQuery) || i.shortDescription.toLowerCase().includes(normalizedQuery)
  );

  const matchedBlogs = BLOGS.filter(
    (b) => b.title.toLowerCase().includes(normalizedQuery) || b.excerpt.toLowerCase().includes(normalizedQuery)
  );

  const hasResults = matchedServices.length > 0 || matchedIndustries.length > 0 || matchedBlogs.length > 0;

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-medium text-slate-900 font-heading leading-tight mb-8">
          Search Results for <span className="text-blue-600">"{query}"</span>
        </h1>

        {!hasResults && query && (
          <p className="text-lg text-slate-600">No results found for your query. Try a different term.</p>
        )}

        {hasResults && (
          <div className="space-y-12">
            {matchedServices.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Services</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchedServices.map((service) => (
                    <Link key={service.id} href={`/service/${service.id}`} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{service.title}</h3>
                      <p className="text-slate-600">{service.shortDescription}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {matchedIndustries.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Industries</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchedIndustries.map((ind) => (
                    <Link key={ind.id} href={`/industries/${ind.id}`} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{ind.title}</h3>
                      <p className="text-slate-600">{ind.shortDescription}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {matchedBlogs.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-slate-900 mb-6">Blog Articles</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {matchedBlogs.map((post) => (
                    <Link key={post.id} href={`/blog/${post.id}`} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                      <h3 className="text-xl font-bold text-slate-900 mb-2">{post.title}</h3>
                      <p className="text-slate-600">{post.excerpt}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SearchClient: React.FC = () => {
  return (
    <Suspense fallback={<div className="pt-32 pb-20 bg-slate-50 min-h-screen text-center"><p className="text-xl">Loading...</p></div>}>
      <SearchResults />
    </Suspense>
  );
};

export default SearchClient;
