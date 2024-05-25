export class Activity {
  id: string;
  category: string;
  coordinates: [string, string];
  date: string;
  description: string;
  highlights: string[];
  images: string[];
  location: string;
  price: number;
  title: string;
  url: string;

  constructor(id: string, category: string, coordinates: [string, string], date: string, description: string, highlights: string[], images: string[], location: string, price: number, title: string, url: string) {
      this.id = id;
      this.category = category;
      this.coordinates = coordinates;
      this.date = date;
      this.description = description;
      this.highlights = highlights;
      this.images = images;
      this.location = location;
      this.price = price;
      this.title = title;
      this.url = url;
  }
}