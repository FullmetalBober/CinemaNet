export interface ICinema {
  _id: string;
  name: string;
  imageCover: string;
  location: {
    city: string;
    address?: string;
    description?: string;
    coordinates?: [number, number];
  };
}
