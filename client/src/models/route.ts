export interface Route {
  id: string | any,
  name: string,
  points: Array<Array<string>>,
  coordinates: Array<Array<number>>,
  created_at: Date,
  user_id: string
}

export function GetRouteStartPoint(route: Route): Array<number> {
  return [Number(route.points[0][1]), Number(route.points[0][0])] 
}