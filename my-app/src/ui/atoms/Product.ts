export class Product {
    id: string;
    category: string;
    description: string;
    images: string[];
    price: string;
    shortDescription: string;
    specification: string[];
    title: string;
  
    constructor(id: string, category: string, description: string, images: string[], price: string, shortDescription: string, specification: string[], title: string) {
      this.id = id;
      this.category = category;
      this.description = description;
      this.images = images;
      this.price = price;
      this.shortDescription = shortDescription;
      this.specification = specification;
      this.title = title;
    }
}