
export type GameStatus = 'In Development' | 'Released' | 'Paused' | 'Alpha' | 'Beta' | 'Canceled';

export interface Milestone {
    label: string;
    date: string;
    completed: boolean;
    description?: string;
}

export interface Game {
    id: string;
    title: string;
    description: string;
    fullText: string;
    image: string;
    releaseDate: string;
    link: string | null;
    status: GameStatus;
    genres: string[];
    platforms: string[];
    isFeatured?: boolean;
    roadmap?: Milestone[];
}

export interface Series {
    id: string;
    title: string;
    description: string;
    fullText: string;
    image: string;
    releaseDate: string;
    status: string;
    link?: string;
    roadmap?: Milestone[];
}

export type SubsidiaryType = 'Founder Imprint' | 'Official Subsidiary' | 'Production Unit';

export interface Subsidiary {
    id: string;
    name: string;
    tagline: string;
    type: SubsidiaryType;
    owner?: string; // Name of the founder who owns the imprint
    description: string;
    fullText: string;
    image: string;
    games: Game[];
    series?: Series[];
}

export interface Partner {
    id: string;
    name: string;
    type: string;
    description: string;
    fullText: string;
    image: string;
    website?: string;
    tags: string[];
}

export interface TimelineEvent {
    year: string;
    event: string;
    description: string;
}

export interface PressAsset {
    label: string;
    type: 'Logo' | 'Screenshot' | 'Brand Package';
    url: string;
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
    philosophy: string;
    mission: string;
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
    postId?: string;
}

export interface BlogPost {
    id: string;
    title: string;
    date: string;
    excerpt: string;
    content: string;
    image?: string;
    relatedGameIds?: string[];
}

export interface DB {
    about: AboutData;
    siteMap: SiteMap;
    people: TeamMember[];
    teamDetails: Record<string, TeamMember>;
    games: Game[];
    subsidiaries: Subsidiary[];
    partners: Partner[];
    news: NewsItem[];
    blogPosts: BlogPost[];
    timeline: TimelineEvent[];
    pressAssets: PressAsset[];
}