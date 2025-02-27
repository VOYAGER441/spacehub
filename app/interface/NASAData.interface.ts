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
}
