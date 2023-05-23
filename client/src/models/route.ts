export interface Route {
  id: string | any,
  name: string,
  points: Array<Array<string>>,
  coordinates: Array<Array<number>>,
  createdAt: Date,
  userId: string
}
