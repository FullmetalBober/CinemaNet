export interface ICinema {
  _id: string;
  name: string;
  imageCover: string;
  halls: string[] | IHall[];
  location: {
    city: string;
    address?: string;
    description?: string;
    coordinates?: [number, number];
  };
}

export interface IShowtime {
  _id: string;
  movie: string | IMovie;
  hall: string | IHall;
  time: {
    start: Date;
    end?: Date;
  };
  price: {
    standard: number;
    lux: number;
  };
}
