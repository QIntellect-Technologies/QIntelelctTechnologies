
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BLOGS } from '../constants';
import { 
  Calendar, 
  User, 
  Clock, 
  ArrowLeft, 
  Share2, 
  ChevronRight, 
  Tag, 
  Mail, 
  TrendingUp,
  ArrowRight,
  Bookmark,
  Eye,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Search,
  Star
} from 'lucide-react';

const BlogDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const post = BLOGS.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-32 text-center bg-gray-50">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">Blog Post Not Found</h2>
          <p className="text-gray-600">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Get related posts from the same category
  const relatedPosts = BLOGS.filter(p => p.id !== post.id && p.category === post.category).slice(0, 3);
  // Get recent posts if not enough related posts
  const recentPosts = BLOGS.filter(p => p.id !== post.id).slice(0, 6);
  const sidebarPosts = relatedPosts.length >= 3 ? relatedPosts : recentPosts;

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-white min-h-screen">
      
      {/* Breadcrumb */}
      <div className="bg-gray-50 pt-32 pb-8 border-b">
        <div className="container mx-auto px-4 md:px-8">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-blue-600 font-medium">{post.category}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white">
              
              {/* Article Header */}
              <header className="mb-8">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 text-sm font-medium rounded-full">
                    {post.category}
                  </span>
                </div>
                
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  {post.title}
                </h1>
                
                <div className="flex items-center gap-6 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>By {post.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.date)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                  {post.excerpt}
                </p>
              </header>

              {/* Featured Image */}
              <div className="mb-12">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-96 object-cover rounded-2xl shadow-lg"
                />
              </div>

              {/* Article Content */}
              <div className="prose prose-lg max-w-none mb-12">
                {post.sections.map((section, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="mb-8"
                  >
                    {section.heading && (
                      <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-6">
                        {section.heading}
                      </h2>
                    )}
                    <div className="space-y-4">
                      {section.content.map((paragraph, pIndex) => (
                        <p key={pIndex} className="text-lg text-gray-700 leading-relaxed">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Additional Content Sections */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-6">
                    Implementation Best Practices
                  </h2>
                  <div className="space-y-4">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      When implementing these solutions, it's crucial to follow industry best practices and maintain security standards throughout the development process. Our team has compiled comprehensive guidelines based on years of enterprise experience.
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-lg text-gray-700 ml-4">
                      <li>Conduct thorough security assessments before deployment</li>
                      <li>Implement comprehensive testing protocols for all integrations</li>
                      <li>Establish monitoring and logging systems for operational visibility</li>
                      <li>Create detailed documentation for future maintenance</li>
                      <li>Plan for scalability and performance optimization</li>
                    </ul>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="mb-8"
                >
                  <h2 className="text-3xl font-bold text-gray-900 mb-6 border-l-4 border-blue-600 pl-6">
                    Future Considerations
                  </h2>
                  <div className="space-y-4">
                    <p className="text-lg text-gray-700 leading-relaxed">
                      As technology continues to evolve, it's important to stay ahead of emerging trends and prepare your systems for future enhancements. Consider these forward-looking strategies:
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                      Integration with artificial intelligence and machine learning capabilities will become increasingly important. Organizations should plan for API flexibility and data structure adaptability to accommodate future AI enhancements.
                    </p>
                  </div>
                </motion.div>
              </div>

              {/* Gallery Images */}
              {post.galleryImages && post.galleryImages.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Related Images</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {post.galleryImages.map((image, index) => (
                      <div key={index} className="rounded-xl overflow-hidden shadow-lg">
                        <img 
                          src={image} 
                          alt={`Gallery image ${index + 1}`}
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Specs */}
              {post.technicalSpecs && post.technicalSpecs.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-8 mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Technical Specifications</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {post.technicalSpecs.map((spec, index) => (
                      <div key={index} className="flex justify-between items-center p-4 bg-white rounded-lg border">
                        <span className="font-medium text-gray-700">{spec.label}</span>
                        <span className="text-blue-600 font-semibold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tags */}
              <div className="mb-12">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <span 
                      key={tag} 
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Info */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 mb-12">
                <div className="flex items-start gap-6">
                  <img 
                    src={post.authorImage} 
                    alt={post.author}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-white shadow-lg"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{post.author}</h3>
                    <p className="text-blue-600 font-medium mb-3">{post.authorRole}</p>
                    <p className="text-gray-600 leading-relaxed">
                      {post.author} is a seasoned expert in {post.category.toLowerCase()} with extensive experience in enterprise solutions and digital transformation. 
                      They regularly contribute insights on cutting-edge technologies and industry best practices.
                    </p>
                  </div>
                </div>
              </div>

              {/* Share Buttons */}
              <div className="border-t border-gray-200 pt-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Share this article</h3>
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                      <Facebook className="w-4 h-4" />
                      <span>Facebook</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors">
                      <Twitter className="w-4 h-4" />
                      <span>Twitter</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors">
                      <Linkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </button>
                  </div>
                </div>
              </div>

            </article>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-8">
              
              {/* Author Card */}
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <div className="text-center">
                  <img 
                    src={post.authorImage} 
                    alt={post.author}
                    className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="font-semibold text-gray-900 mb-1">{post.author}</h3>
                  <p className="text-sm text-blue-600 mb-3">{post.authorRole}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Expert in {post.category.toLowerCase()} with extensive experience.
                  </p>
                </div>
              </div>

              {/* Recent/Related Posts */}
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  {relatedPosts.length >= 3 ? 'Related Articles' : 'Recent Articles'}
                </h3>
                <div className="space-y-4">
                  {sidebarPosts.slice(0, 4).map(relatedPost => (
                    <Link 
                      key={relatedPost.id} 
                      to={`/blog/${relatedPost.id}`}
                      className="group block hover:bg-gray-50 rounded-lg p-3 transition-colors -mx-3"
                    >
                      <div className="flex gap-3">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm leading-tight mb-1">
                            {relatedPost.title}
                          </h4>
                          <p className="text-xs text-gray-500">{relatedPost.readTime}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t">
                  <Link 
                    to="/blog"
                    className="flex items-center justify-center gap-2 w-full py-2 text-blue-600 hover:text-blue-700 transition-colors font-medium text-sm"
                  >
                    View All Articles
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Newsletter Signup */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl p-6 text-white">
                <div className="text-center">
                  <Mail className="w-8 h-8 mx-auto mb-4 opacity-90" />
                  <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
                  <p className="text-blue-100 text-sm mb-4 leading-relaxed">
                    Get the latest insights and industry trends delivered to your inbox.
                  </p>
                  <button className="w-full py-3 bg-white text-blue-600 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                    Subscribe Now
                  </button>
                </div>
              </div>

              {/* Popular Tags */}
              <div className="bg-white rounded-xl shadow-lg p-6 border">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {['AI', 'Machine Learning', 'Automation', 'Cloud', 'Security', 'Integration', 'Analytics', 'Innovation'].map(tag => (
                    <span 
                      key={tag}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-600 transition-colors cursor-pointer"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* Related Articles Section */}
        {relatedPosts.length > 0 && (
          <div className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.slice(0, 3).map(relatedPost => (
                <Link 
                  key={relatedPost.id}
                  to={`/blog/${relatedPost.id}`}
                  className="group bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border"
                >
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={relatedPost.image} 
                      alt={relatedPost.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded">
                        {relatedPost.category}
                      </span>
                      <span className="text-xs text-gray-500">{relatedPost.readTime}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-3 line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                      {relatedPost.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default BlogDetail;
