export interface Service {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  icon: string;
  image: string | null;
  businessTypes: string[];
  /** IDs of staff categories commonly hired through this service. */
  categoryIds: string[];
  featured: boolean;
  active: boolean;
}

export interface ServicesData {
  services: Service[];
}
