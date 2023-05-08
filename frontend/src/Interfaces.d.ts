export interface ICinema {
  _id: string;
  name: string;
  imageCover: string;
  halls: IHall[];
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
    end: Date;
  };
  price: {
    standard: number;
    lux: number;
  };
  tickets: ITicket[];
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
  rentalPeriod?: {
    start: Date;
    end: Date;
  };
  language?: string;
  genres?: (IGenre | string)[];
  production?: string[];
  studio?: string[];
  scenario?: string[];
  starring?: string[];
  description?: string;
  price: number;
  slug: string;
}

export interface IHall {
  _id: string;
  name: string;
  cinema: ICinema;
  seats: {
    standard: [
      {
        row: number;
        seats: number;
      }
    ];
    lux: number;
  };
  price: {
    standard: number;
    lux: number;
  };
}

export interface IGenre {
  _id: string;
  name: string;
  description?: string;
  slug: string;
}

export interface ITicket {
  _id: string;
  showtime: IShowtime;
  seats: ISeat[];
  user: IUser;
  barOrders: [
    {
      bar: IBar;
      count: number;
    }
  ];
}

export interface ISeat {
  row: number;
  col: number;
  isLux: boolean;
  price: number;
}

export interface IBar {
  _id: string;
  cinema: string;
  name: string;
  imageCover: string;
  price: number;
}
