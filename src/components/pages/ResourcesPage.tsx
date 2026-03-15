import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, User, BookOpen, Video, FileText } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { WellnessResources } from '@/entities';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ResourcesPage() {
  const [resources, setResources] = useState<WellnessResources[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedType, setSelectedType] = useState('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);

  const resourceTypes = ['all', 'article', 'video', 'guide', 'tool', 'course'];

  const getResourceIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'video':
        return Video;
      case 'guide':
        return BookOpen;
      case 'article':
        return FileText;
      default:
        return BookOpen;
    }
  };

  useEffect(() => {
    loadResources();
  }, []);

  const loadResources = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<WellnessResources>('wellnessresources', {}, { limit: 50, skip });
      setResources(result.items);
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading resources:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadMore = async () => {
    try {
      const result = await BaseCrudService.getAll<WellnessResources>('wellnessresources', {}, { limit: 50, skip });
      setResources([...resources, ...result.items]);
      setHasNext(result.hasNext);
      setSkip(result.nextSkip || 0);
    } catch (error) {
      console.error('Error loading more resources:', error);
    }
  };

  const filteredResources = selectedType === 'all'
    ? resources
    : resources.filter(resource => resource.resourceType?.toLowerCase() === selectedType.toLowerCase());

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
            WELLNESS RESOURCES
          </h1>
          <p className="font-paragraph text-xl text-primary-foreground">
            Curated tools, guides, and materials to support your health journey
          </p>
        </motion.div>

        {/* Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-secondary p-6 mb-12"
        >
          <div className="flex flex-wrap gap-3">
            {resourceTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`font-heading text-sm uppercase px-6 py-3 transition-all ${
                  selectedType === type
                    ? 'bg-accentmintgreen text-primary'
                    : 'bg-primary text-primary-foreground hover:bg-accentmintgreen hover:text-primary'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="font-paragraph text-primary-foreground">
            Showing {filteredResources.length} resource{filteredResources.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Resources Grid */}
        <div className="min-h-[600px]">
          {isLoading ? null : filteredResources.length > 0 ? (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredResources.map((resource, index) => {
                  const ResourceIcon = getResourceIcon(resource.resourceType || '');
                  return (
                    <motion.div
                      key={resource._id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-secondary overflow-hidden hover:bg-opacity-90 transition-all"
                    >
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                        {/* Image Column */}
                        {resource.thumbnailImage && (
                          <div className="lg:col-span-1 h-64 lg:h-auto">
                            <Image
                              src={resource.thumbnailImage}
                              alt={resource.resourceTitle || 'Resource thumbnail'}
                              width={300}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}
                        
                        {/* Content Column */}
                        <div className={`p-6 flex flex-col ${resource.thumbnailImage ? 'lg:col-span-2' : 'lg:col-span-3'}`}>
                          {resource.resourceType && (
                            <div className="flex items-center gap-2 mb-3">
                              <ResourceIcon className="w-5 h-5 text-accentmintgreen" />
                              <span className="font-heading text-xs text-accentmintgreen uppercase">
                                {resource.resourceType}
                              </span>
                            </div>
                          )}
                          
                          <h3 className="font-heading text-2xl text-primary-foreground uppercase mb-3">
                            {resource.resourceTitle}
                          </h3>
                          
                          {resource.description && (
                            <p className="font-paragraph text-primary-foreground mb-4 flex-1">
                              {resource.description}
                            </p>
                          )}
                          
                          <div className="space-y-3 mt-auto">
                            {resource.authorSource && (
                              <div className="flex items-center gap-2 text-primary-foreground">
                                <User className="w-4 h-4" />
                                <span className="font-paragraph text-sm">
                                  {resource.authorSource}
                                </span>
                              </div>
                            )}
                            
                            {resource.dateAdded && (
                              <div className="flex items-center gap-2 text-primary-foreground">
                                <Calendar className="w-4 h-4" />
                                <span className="font-paragraph text-sm">
                                  Added {new Date(resource.dateAdded).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                  })}
                                </span>
                              </div>
                            )}
                            
                            {resource.resourceLink && (
                              <a
                                href={resource.resourceLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 bg-accentmintgreen text-primary font-heading text-sm uppercase px-6 py-3 hover:opacity-90 transition-opacity"
                              >
                                ACCESS RESOURCE
                                <ExternalLink className="w-4 h-4" />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
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
                    LOAD MORE RESOURCES
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
                <BookOpen className="w-10 h-10 text-secondary" />
              </div>
              <h2 className="font-heading text-3xl text-primary-foreground uppercase mb-4">
                NO RESOURCES FOUND
              </h2>
              <p className="font-paragraph text-primary-foreground mb-6">
                Try selecting a different resource type
              </p>
              <button
                onClick={() => setSelectedType('all')}
                className="bg-accentmintgreen text-primary font-heading text-lg uppercase px-8 py-3 hover:opacity-90 transition-opacity"
              >
                SHOW ALL RESOURCES
              </button>
            </motion.div>
          )}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 bg-secondary p-8 lg:p-12 text-center"
        >
          <h2 className="font-heading text-3xl lg:text-5xl text-primary-foreground uppercase mb-4">
            HAVE A HEALTH QUESTION?
          </h2>
          <p className="font-paragraph text-lg text-primary-foreground mb-8 max-w-2xl mx-auto">
            Submit your questions or topics you'd like to learn more about, and our team will create resources to help
          </p>
          <a
            href="/contact"
            className="inline-block bg-accentmintgreen text-primary font-heading text-lg uppercase px-10 py-4 hover:opacity-90 transition-opacity"
          >
            SUBMIT A QUESTION
          </a>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
}
