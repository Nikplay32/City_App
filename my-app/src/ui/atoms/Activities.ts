export class Activity {
    id: string;
    coordinates: [string, string];
    date: string;
    images: string[];
    price: string;
    title: string;
  
    constructor(id: string, coordinates: [string, string], date: string, images: string[], price: string, title: string) {
      this.id = id;
      this.coordinates = coordinates;
      this.date = date;
      this.images = images;
      this.price = price;
      this.title = title;
    }
  }