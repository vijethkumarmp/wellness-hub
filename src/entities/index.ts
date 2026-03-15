/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: healtharticles
 * Interface for HealthArticles
 */
export interface HealthArticles {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  articleTitle?: string;
  /** @wixFieldType text */
  contentBody?: string;
  /** @wixFieldType text */
  category?: string;
  /** @wixFieldType text */
  topic?: string;
  /** @wixFieldType text */
  healthArea?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  coverImage?: string;
}


/**
 * Collection ID: healthquestions
 * Interface for HealthQuestions
 */
export interface HealthQuestions {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  userName?: string;
  /** @wixFieldType text */
  emailAddress?: string;
  /** @wixFieldType text */
  questionOrTopic?: string;
  /** @wixFieldType datetime */
  submissionDate?: Date | string;
  /** @wixFieldType text */
  status?: string;
}


/**
 * Collection ID: wellnessresources
 * Interface for WellnessResources
 */
export interface WellnessResources {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  resourceTitle?: string;
  /** @wixFieldType text */
  description?: string;
  /** @wixFieldType text */
  resourceType?: string;
  /** @wixFieldType url */
  resourceLink?: string;
  /** @wixFieldType image - Contains image URL, render with <Image> component, NOT as text */
  thumbnailImage?: string;
  /** @wixFieldType text */
  authorSource?: string;
  /** @wixFieldType date */
  dateAdded?: Date | string;
}
