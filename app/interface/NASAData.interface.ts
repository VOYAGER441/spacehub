export interface IPicOfTheDay {
  copyright: string;
  date: string;
  explanation: string;
  hdurl: string;
  media_type: string;
  service_version: string;
  title: string;
  url: string;
}

export interface IASONews {
  id: string;
  name: string;
  closeApproachDate: string;
  diameter: number;
  speed: number;
  missDistance: number;
  hazardous: boolean;
  nasaUrl: string;
}

export interface EpicImageData {
  identifier: string;
  image: string;
  caption: string;
  date: string;
  centroid_coordinates?: { lat: number; lon: number };
  dscovr_j2000_position?: { x: number; y: number; z: number };
  lunar_j2000_position?: { x: number; y: number; z: number };
  sun_j2000_position?: { x: number; y: number; z: number };
}
export interface IMarsWeatherData {
  [sol: string]: {
    First_UTC: string;
    AT: {
      mx: number; // Maximum temperature (°F)
      mn: number; // Minimum temperature (°F)
      av: number; // Average temperature (°F)
    };
    PRE: {
      av: number; // Atmospheric pressure (Pa)
    };
    HWS: {
      av: number; // Horizontal wind speed (m/s)
    };
    WD: {
      most_common: {
        compass_point: string; // Most common wind direction
      };
    };
    Season: string;
    Northern_season: string;
    Southern_season: string;
  };
}

interface Camera {
  id: number;
  name: string;
  rover_id: number;
  full_name: string;
}

interface Rover {
  id: number;
  name: string;
  landing_date: string;
  launch_date: string;
  status: string;
}

export interface IMarsPhoto {
  id: number;
  sol: number;
  camera: Camera;
  img_src: string;
  earth_date: string;
  rover: Rover;
}

export interface INasaSearchResultItem {
  href: string;
  data: {
    title: string;
    description: string;
    media_type: string;
    nasa_id: string;
  }[];
  links?: { href: string }[];
}

export interface IProps {
  query: string;
}