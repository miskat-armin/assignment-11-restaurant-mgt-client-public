import React from 'react';

const Blog = () => {
  const blogPosts = [
    {
      title: 'What is One-way Data Binding?',
      content:
        'One-way data binding is a data flow pattern where the data is bound to the UI in such a way that the changes in the UI elements do not affect the data source. It means the data flows in one direction, from the source (model) to the view (UI).',
    },
    {
      title: 'What is NPM in Node.js?',
      content:
        'NPM (Node Package Manager) is the default package manager for Node.js. It allows developers to easily install, share, and manage dependencies in their Node.js projects. NPM is used to install libraries and tools that a Node.js project needs.',
    },
    {
      title: 'Difference between MongoDB and MySQL',
      content:
        'MongoDB and MySQL are both popular databases, but they differ in their data models and storage mechanisms. MongoDB is a NoSQL, document-oriented database, while MySQL is a traditional relational database. MongoDB uses a flexible, schema-less data model, while MySQL uses a structured, table-based data model.',
    },
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      <header className="bg-blue-500 text-white py-4 text-center">
        <h1 className="text-3xl font-bold">Tech Blog</h1>
      </header>

      <div className="container mx-auto mt-8">
        {blogPosts.map((post, index) => (
          <div key={index} className="max-w-xl mx-auto my-8">
            <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
