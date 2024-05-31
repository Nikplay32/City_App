export class Salon {
    id: string;
    name: string;
    description: string;
    image: string;
    highlights: string[];
    priceList: string[];
  
    constructor(id: string, name: string, description: string, image: string, highlights: string[], priceList: string[]) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.image = image;
      this.highlights = highlights;
      this.priceList = priceList;
    }
  }