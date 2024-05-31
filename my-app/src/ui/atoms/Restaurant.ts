export class Restaurant {
    id: string;
    name: string;
    description: string;
    image: string;
    highlights: string[];
  
    constructor(id: string, name: string, description: string, image: string, highlights: string[]) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.image = image;
      this.highlights = highlights;
    }
  }