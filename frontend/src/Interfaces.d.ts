export interface ICinema {
  _id: string;
  name: string;
  location: {
    city: string;
    address?: string;
    description?: string;
    coordinates?: [number, number];
  };
}
