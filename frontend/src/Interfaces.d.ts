interface ITimestamps {
  createdAt: Date;
  updatedAt: Date;
}

export interface ICinema extends ITimestamps {
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
  ticketsCount: number;
}

export interface IMovie extends ITimestamps {
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
  productions?: string[];
  studios?: string[];
  scenarios?: string[];
  starrings?: string[];
  description?: string;
  price: number;
  slug: string;
  showtimesCount: number;
}

export interface IHall extends ITimestamps {
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
  showtimesCount: number;
}

export interface IGenre extends ITimestamps {
  _id: string;
  name: string;
  description?: string;
  imageCover: string;
  slug: string;
  moviesCount: number;
}

export interface ITicket extends ITimestamps {
  _id: string;
  showtime: IShowtime;
  seats: ISeat[];
  user: IUser;
  cost: number;
  barOrders: IGoods[];
}

export interface ISeat {
  row: number;
  col: number;
  isLux: boolean;
  price: number;
}

export interface IBar extends ITimestamps {
  _id: string;
  cinema: string;
  name: string;
  imageCover: string;
  price: number;
}

export interface IGoods {
  bar: IBar;
  count: number;
}

export interface IUser {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
}
