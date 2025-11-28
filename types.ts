export interface Game {
    id: string;
    title: string;
    description: string;
    fullText: string;
    image: string;
    releaseDate: string;
    link: string | null;
}

export interface Subsidiary {
    id: string;
    name: string;
    tagline: string;
    description: string;
    fullText: string;
    image: string;
    games: Game[];
}

export interface Partner {
    id: string;
    name: string;
    type: string;
    description: string;
    fullText: string;
    image: string;
    website?: string;
}

export interface SocialLink {
    icon: 'youtube' | 'twitter' | 'gamepad-2' | 'zap' | 'user';
    url: string;
    label: string;
}

export interface TeamMember {
    name: string;
    role: string;
    bio: string;
    image: string;
    links: SocialLink[];
}

export interface AboutData {
    title: string;
    subtitle: string;
    featuredImage: string;
    featuredImageLight: string;
    text: string;
    quoteAuthor: string;
}

export interface SiteMap {
    home: string;
    games: string;
    subsidiaries: string;
    partners: string;
    contact: string;
}

export interface NewsItem {
    id: string;
    title: string;
    date: string;
    content: string;
    link?: string;
}

export interface DB {
    about: AboutData;
    siteMap: SiteMap;
    people: TeamMember[]; // Simplified for footer
    teamDetails: Record<string, TeamMember>; // Detailed for Home
    games: Game[];
    subsidiaries: Subsidiary[];
    partners: Partner[];
    news: NewsItem[];
}