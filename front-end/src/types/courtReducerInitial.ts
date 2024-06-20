export interface Court {
  _id?: string;
  courtName?: string;
  sportId?: string;
  normalcost?: {
    price?: number;
    day?: {
      from?: string;
      to?: string;
    };
    time?: {
      from?: string;
      to?: string;
    };
  };
  specialcost?: {
    category?: "day" | "time";
    price?: number;
    diff?: {
      from?: string;
      to?: string;
    };
  };
  sport?: string;
  updatedAt?: Date;
  createdAt?: Date;
  sportdetail?: {
    _id: string;
  };
}

export interface CourtInitial {
  loading: boolean;
  err: boolean | string;
  court: Court | null;
  courts: Court[] | null;
}
