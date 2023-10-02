import React from 'react';
import { Link , BrowserRouter } from 'react-router-dom'
import '../static/css/Blog.css';
import {useQuery,} from 'react-query'

const Blog = () => {
    const { isLoading, error, data } = useQuery({
      queryKey: ['repoData'],
      queryFn: () =>
        fetch('/api/post/').then(
          (res) => res.json(),
        ),
        refetchOnWindowFocus:false,
        
    })

  
  if (error) {
    return <div>Error loading data... {error} </div>;
  }

  if (isLoading) {
    return <div> Loading Blogs... </div>;
  }

  return (
    <div className="content">
      {data?.map((blog) => (
        <div key={blog.id} className="cocktail-card">
          <h2 className="cocktail-name">{blog.title}</h2>
          <p>{blog.text}</p>
          <p className="date">{blog.created_date} - Yazan : {blog.author}</p>
          {blog.image && (
          <img src={blog.image} width="250px" height="250px" ></img>
          )}
          <p>
          <Link to={`/blog/${blog.id}`}>
            Take me to {blog.id === '' ? "home" : blog.id}
          </Link>
          </p>
          <p>------------------------------------------------------------------------------------------------------------------</p>
        </div>
      ))}
    </div>
  );
};



export default Blog;