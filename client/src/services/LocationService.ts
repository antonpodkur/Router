
export type LatLng = [number, number];
export type LngLat = [string, string];

export interface Place {
  name: string;
  position: [number, number];
}

class LocationService {
  private nominatimUrl = 'http://localhost:8080'
  private orsUrl = 'http://localhost:8081'

  public async searchPlace(searchText: string): Promise<Array<any>> {
    const params = {
      q: searchText,
      format: 'json',
      addressdetails: '1',
      polygon_geojson: '0',
    };

    const queryString = new URLSearchParams(params).toString();
    const requestOptions: RequestInit = {
      method: 'GET',
      redirect: 'follow'
    };

    const result = await fetch(`${this.nominatimUrl}/search?${queryString}`, requestOptions);
    return await result.json();
  }

  public async calculateRoute(coordinates: Array<LngLat>): Promise<Array<number[]>> {
    const response = await fetch(`${this.orsUrl}/ors/v2/directions/driving-car/geojson`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      redirect: 'follow',
      body: JSON.stringify({ coordinates: coordinates })
    });
    const data = await response.json();
    console.log(data)
    return data.features[0].geometry.coordinates;
  }
}

export default new LocationService();
