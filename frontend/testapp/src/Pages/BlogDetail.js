import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery,QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

const fetchBlogDetail = async (id) => {
  const response = await fetch(`/api/post/${id}`);
  const data = await response.json();
  return data;
};


const BlogDetail = () => {
  const { id } = useParams();

  const { data: blog, isLoading, isError } = useQuery(['blog', id], () => fetchBlogDetail(id));

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading blog detail</div>;
  }

  return (
    <div className="blog-detail">
      <h2>{blog.title}</h2>
      <p>{blog.text}</p>
      <div className="date">
      {blog.image && <img src={blog.image} alt={blog.title} width="250px" height="250px" />}
      <p>{blog.detail}</p>
      </div>
      {blog.created_date} - {blog.author}
    </div>
  );
};

export default BlogDetail