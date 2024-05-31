export class Product {
    id: string;
    category: string;
    description: string;
    images: string[];
    price: number;
    shortDescription: string;
    specification: string[];
    title: string;
    subscribers_only: string;
  
    constructor(id: string, category: string, description: string, images: string[], price: number, shortDescription: string, specification: string[], title: string, subscribers_only: string) {
      this.id = id;
      this.category = category;
      this.description = description;
      this.images = images;
      this.price = price;
      this.shortDescription = shortDescription;
      this.specification = specification;
      this.title = title;
      this.subscribers_only = subscribers_only;
    }
}