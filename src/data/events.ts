export interface Speaker {
  name: string;
  title: string;
  affiliation: string;
}

export interface XPosureEvent {
  id: string;
  slug: string;
  title: string;
  shortDate: string;
  dateISO: string;
  location: string;
  speakers: Speaker[];
  thumbnail: string;
  excerpt: string;
  body: string[];
  tags: string[];
  registerUrl?: string;
  upcoming: boolean;
  acknowledgements?: string;
  articleImageUrls?: string[];
  category?: string;
  subPillar?: string;
  audience?: string;
}
