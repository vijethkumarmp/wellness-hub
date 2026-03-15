import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, Heart, Brain, Activity } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HealthArticles } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArticlesPage() {
  const [articles, setArticles] = useState<HealthArticles[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<HealthArticles[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  const categories = ['all', 'physical health', 'mental health', 'nutrition', 'fitness', 'sleep'];

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'physical health':
        return Heart;
      case 'mental health':
        return Brain;
      case 'fitness':
        return Activity;
      default:
        return Heart;
    }
  };

  useEffect(() => {
    loadArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [articles, searchTerm, selectedCategory]);

  const loadArticles = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<HealthArticles>('healtharticles', {}, { limit: 50, skip });
      setArticles(result.items);
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading articles:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await BaseCrudService.getAll<HealthArticles>('healtharticles', {}, { limit: 50, skip });
      setArticles([...articles, ...result.items]);
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading more articles:', error);
    }
  };

  const filterArticles = () => {
    let filtered = articles;

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.articleTitle?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.topic?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.healthArea?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredArticles(filtered);
  };

  return (
    <div className="min-h-screen bg-primary pt-20">
      <Header />

      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="font-heading text-5xl lg:text-7xl text-primary-foreground uppercase mb-4">
            HEALTH ARTICLES
          </h1>
          <p className="font-paragraph text-xl text-primary-foreground/80">
            Evidence-based insights for your holistic wellbeing journey
          </p>
        </motion.div>

        {/* Search and Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-br from-secondary/20 to-secondary/10 border border-secondary/40 p-6 mb-12 backdrop-blur-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Search */}
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-foreground/60 group-focus-within:text-accentmintgreen transition-colors" />
              <input
                type="text"
                placeholder="Search articles by title, topic, or health area..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-primary/50 text-primary-foreground font-paragraph pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accentmintgreen/50 border border-secondary/30 focus:border-accentmintgreen transition-all"
              />
            </div>

            {/* Category Filter */}
            <div className="relative group">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-primary-foreground/60 group-focus-within:text-accentmintgreen transition-colors" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-primary/50 text-primary-foreground font-paragraph pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-accentmintgreen/50 border border-secondary/30 focus:border-accentmintgreen appearance-none cursor-pointer transition-all"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedCategory !== 'all') && (
            <div className="mt-4 flex flex-wrap gap-2">
              {searchTerm && (
                <span className="inline-block bg-secondary/30 px-3 py-1 font-paragraph text-sm text-primary-foreground border border-secondary/50">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedCategory !== 'all' && (
                <span className="inline-block bg-secondary/30 px-3 py-1 font-paragraph text-sm text-primary-foreground border border-secondary/50">
                  Category: {selectedCategory.toUpperCase()}
                </span>
              )}
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="inline-block bg-accentmintgreen text-primary px-3 py-1 font-paragraph text-sm hover:opacity-90 transition-opacity"
              >
                Clear Filters
              </button>
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-paragraph text-primary-foreground">
            Showing {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Articles Grid */}
        <div className="min-h-[600px]">
          {isLoading ? null : filteredArticles.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredArticles.map((article, index) => {
                  const CategoryIcon = getCategoryIcon(article.category || '');
                  return (
                    <motion.div
                      key={article._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <Link to={`/articles/${article._id}`} className="block group">
                        <motion.div 
                          className="bg-gradient-to-br from-secondary/30 to-secondary/10 border border-secondary/40 overflow-hidden h-full flex flex-col hover:border-accentmintgreen/50 transition-all duration-300"
                          whileHover={{ y: -4 }}
                        >
                          {article.coverImage && (
                            <div className="relative h-64 overflow-hidden">
                              <Image
                                src={article.coverImage}
                                alt={article.articleTitle || 'Article cover'}
                                width={400}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
                            </div>
                          )}
                          <div className="p-6 flex-1 flex flex-col">
                            {article.category && (
                              <div className="flex items-center gap-2 mb-3">
                                <CategoryIcon className="w-5 h-5 text-accentmintgreen" />
                                <span className="font-heading text-xs text-accentmintgreen uppercase tracking-widest">
                                  {article.category}
                                </span>
                              </div>
                            )}
                            <h3 className="font-heading text-xl text-primary-foreground uppercase mb-3 group-hover:text-accentmintgreen transition-colors">
                              {article.articleTitle}
                            </h3>
                            {article.topic && (
                              <p className="font-paragraph text-sm text-primary-foreground/70 mb-4">
                                {article.topic}
                              </p>
                            )}
                            {article.healthArea && (
                              <div className="mt-auto">
                                <span className="inline-block border border-accentmintgreen/60 text-accentmintgreen font-paragraph text-xs px-3 py-1 hover:bg-accentmintgreen/10 transition-colors">
                                  {article.healthArea}
                                </span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {hasNext && (
                <div className="mt-12 text-center">
                  <button
                    onClick={loadMore}
                    className="bg-accentmintgreen text-primary font-heading text-lg uppercase px-12 py-4 hover:opacity-90 transition-opacity"
                  >
                    LOAD MORE ARTICLES
                  </button>
                </div>
              )}
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-secondary rounded-full mb-6">
                <Search className="w-10 h-10 text-secondary" />
              </div>
              <h2 className="font-heading text-3xl text-primary-foreground uppercase mb-4">
                NO ARTICLES FOUND
              </h2>
              <p className="font-paragraph text-primary-foreground mb-6">
                Try adjusting your search or filter criteria
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-accentmintgreen text-primary font-heading text-lg uppercase px-8 py-3 hover:opacity-90 transition-opacity"
              >
                CLEAR FILTERS
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
