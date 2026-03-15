import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Heart, Brain, Activity, Calendar } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { HealthArticles } from '@/entities';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ArticleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<HealthArticles | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    loadArticle();
  }, [id]);

  const loadArticle = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<HealthArticles>('healtharticles', id);
      setArticle(data);
    } catch (error) {
      console.error('Error loading article:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary pt-20">
      <Header />

      <div className="max-w-[100rem] mx-auto px-6 lg:px-12 py-12">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link 
            to="/articles"
            className="inline-flex items-center gap-2 text-accentmintgreen hover:text-primary-foreground transition-colors font-heading uppercase"
          >
            <ArrowLeft className="w-5 h-5" />
            BACK TO ARTICLES
          </Link>
        </motion.div>

        <div className="min-h-[600px]">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingSpinner />
            </div>
          ) : !article ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <h2 className="font-heading text-4xl text-primary-foreground uppercase mb-4">
                ARTICLE NOT FOUND
              </h2>
              <p className="font-paragraph text-primary-foreground mb-8">
                The article you're looking for doesn't exist or has been removed.
              </p>
              <Link
                to="/articles"
                className="inline-block bg-accentmintgreen text-primary font-heading text-lg uppercase px-8 py-3 hover:opacity-90 transition-opacity"
              >
                BROWSE ARTICLES
              </Link>
            </motion.div>
          ) : (
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Article Header */}
              <div className="bg-secondary p-8 lg:p-12 mb-8">
                <div className="max-w-4xl">
                  {article.category && (
                    <div className="flex items-center gap-2 mb-4">
                      {(() => {
                        const CategoryIcon = getCategoryIcon(article.category);
                        return <CategoryIcon className="w-6 h-6 text-accentmintgreen" />;
                      })()}
                      <span className="font-heading text-sm text-accentmintgreen uppercase">
                        {article.category}
                      </span>
                    </div>
                  )}
                  <h1 className="font-heading text-4xl lg:text-6xl text-primary-foreground uppercase mb-6">
                    {article.articleTitle}
                  </h1>
                  {article.topic && (
                    <p className="font-paragraph text-xl text-primary-foreground mb-6">
                      {article.topic}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-4 items-center">
                    {article.healthArea && (
                      <span className="inline-block border border-accentmintgreen text-accentmintgreen font-paragraph text-sm px-4 py-2">
                        {article.healthArea}
                      </span>
                    )}
                    {article._createdDate && (
                      <div className="flex items-center gap-2 text-primary-foreground">
                        <Calendar className="w-4 h-4" />
                        <span className="font-paragraph text-sm">
                          {new Date(article._createdDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Article Cover Image */}
              {article.coverImage && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-8"
                >
                  <Image
                    src={article.coverImage}
                    alt={article.articleTitle || 'Article cover'}
                    width={1200}
                    className="w-full h-[500px] object-cover"
                  />
                </motion.div>
              )}

              {/* Article Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="bg-secondary p-8 lg:p-12"
              >
                <div className="max-w-4xl mx-auto">
                  {article.contentBody ? (
                    <div className="font-paragraph text-lg text-primary-foreground leading-relaxed whitespace-pre-wrap">
                      {article.contentBody}
                    </div>
                  ) : (
                    <p className="font-paragraph text-lg text-primary-foreground italic">
                      Article content coming soon...
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Related Topics CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-12 bg-primary border-2 border-accentmintgreen p-8 lg:p-12 text-center"
              >
                <h2 className="font-heading text-3xl text-primary-foreground uppercase mb-4">
                  WANT TO LEARN MORE?
                </h2>
                <p className="font-paragraph text-primary-foreground mb-6">
                  Explore more articles on holistic health and wellness
                </p>
                <Link
                  to="/articles"
                  className="inline-block bg-accentmintgreen text-primary font-heading text-lg uppercase px-8 py-3 hover:opacity-90 transition-opacity"
                >
                  BROWSE ALL ARTICLES
                </Link>
              </motion.div>
            </motion.article>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}
