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
  movie: IMovie;
  hall: IHall;
  time: {
    start: Date;
    end?: Date;
  };
  price: {
    standard: number;
    lux: number;
  };
}

export interface IMovie {
  _id: string;
  name: string;
  duration: number;
  imageCover: string;
  trailer?: string;
  ageRating?: number;
  releaseYear?: number;
  originalName?: string;
  director?: string;
  rentalPeriod: {
    start?: Date;
    end?: Date;
  };
  language?: string;
  genres?: string[];
  production?: string[];
  studio?: string[];
  scenario?: string[];
  starring?: string[];
  description?: string;
  price?: number;
  slug: string;
}
