export interface Sport {
  _id?: string;
  updatedAt?: Date;
  createdAt?: Date;
  sportName: string;
  image?: string;
}

export interface SportsReducerInital {
  loading: boolean;
  err: boolean | string;
  sport: Sport | null;
  sports: Sport[] | null;
}
