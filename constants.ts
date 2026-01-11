
import { DB } from './types';

export const db: DB = {
    about: {
        title: "Welcome to Left-Sided Studios",
        subtitle: "Explore our creations, updates, and fan content, including unique experiences inspired by popular franchises.",
        featuredImage: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true",
        featuredImageLight: "https://github.com/leftsideddev/web/blob/main/images/studios/leftsided1920_white.png?raw=true",
        text: "Here at Left-Sided Studios, we are dedicated to independent game development, sharing original games and projects on GameJolt and other platforms.",
        quoteAuthor: "Vermetra, Co-Founder",
        philosophy: "We leverage the 'Left Side' of the brain—our creative, intuitive, and unconventional core—to build games that bridge the gap between niche fan culture and polished interactive media.",
        mission: "To deliver high-fidelity, experimental experiences that respect player agency and the spirit of the franchises that inspire us."
    },
    siteMap: {
        home: "https://sites.google.com/view/leftsidedstudios/home?authuser=0",
        games: "https://sites.google.com/view/leftsidedstudios/games?authuser=0",
        subsidiaries: "https://sites.google.com/view/leftsidedstudios/subsidiaries?authuser=0",
        partners: "https://sites.google.com/view/leftsidedstudios/partners?authuser=0",
        contact: "https://sites.google.com/view/leftsidedstudios/contact?authuser=0",
    },
    timeline: [
        { year: "2023", event: "Studio Foundation", description: "The studio was born during a summer week at Vermetra's house. While messing around, the founders conceptualized a project inspired by Nintendo's Pikmin, sparking the LSS journey." },
        { year: "2024", event: "Project Rollout", description: "ANdE, Gotch-ya, and Bomb Banana labels joined the umbrella to diversify our output." },
        { year: "2025", event: "Digital Hub Launch", description: "Official launch of our unified web platform and centralization of all studio resources." }
    ],
    pressAssets: [
        { label: "Main Logo (White PNG)", type: "Logo", url: "https://github.com/leftsideddev/web/blob/main/images/studios/leftsided1920_white.png?raw=true" },
        { label: "Main Logo (Black PNG)", type: "Logo", url: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true" },
        { label: "Studio Press Kit (.zip)", type: "Brand Package", url: "#" }
    ],
    people: [
        { 
            name: "Vermetra", 
            role: "Co-Founder", 
            bio: "", 
            image: "", 
            links: [
                { icon: "youtube", url: "https://youtube.com/@vermetra", label: "YouTube" },
                { icon: "twitter", url: "https://x.com/vermetra", label: "X (Twitter)" }
            ] 
        },
        { 
            name: "DaRealSansYT", 
            role: "Co-Founder", 
            bio: "", 
            image: "", 
            links: [
                { icon: "youtube", url: "https://youtube.com/@SansYT4Real", label: "YouTube" },
                { icon: "twitter", url: "https://x.com/@darealsansyt", label: "X (Twitter)" }
            ] 
        },
        { 
            name: "RocketBlasts", 
            role: "Co-Founder", 
            bio: "", 
            image: "", 
            links: [
                { icon: "youtube", url: "https://www.youtube.com/@Rocketblast1843", label: "YouTube" },
                { icon: "twitter", url: "https://x.com/Rocketblastss", label: "X (Twitter)" }
            ] 
        }
    ],
    teamDetails: {
        vermetra: {
            name: "Vermetra",
            role: "Co-Founder & Lead Developer",
            bio: "Gamer, Game Dev, and Co-Founder of Left-Sided Studios. Huge VλLVᴱ, FNaF, and Robot 64 Fan.",
            image: "https://github.com/leftsideddev/web/blob/main/images/vermetra.jpg?raw=true",
            links: [
                { icon: "youtube", url: "https://youtube.com/@vermetra", label: "YouTube" },
                { icon: "twitter", url: "https://x.com/vermetra", label: "X (Twitter)" },
            ]
        },
        darealsansyt: {
            name: "DaRealSansYT",
            role: "Co-Founder & Content Creator",
            bio: "Nerd, YouTuber, Anime enjoyer.",
            image: "https://github.com/leftsideddev/web/blob/main/images/sansyt.jpg?raw=true",
            links: [
                { icon: "youtube", url: "https://youtube.com/@SansYT4Real", label: "YouTube" },
                { icon: "twitter", url: "https://x.com/@darealsansyt", label: "X (Twitter)" },
            ]
        },
        rocketblasts: {
            name: "RocketBlasts",
            role: "Co-Founder & Creative Designer",
            bio: "Co-Founder and Creative Designer for LSS.",
            image: "https://github.com/leftsideddev/web/blob/main/images/rocket.jpg?raw=true",
            links: [
                { icon: "youtube", url: "https://www.youtube.com/@Rocketblast1843", label: "YouTube" },
                { icon: "twitter", url: "https://x.com/Rocketblastss", label: "X (Twitter)" },
            ]
        }
    },
    news: [
        {
            id: "news_cardamania_delay",
            title: "Cardamania Release Schedule Update",
            date: "November 2025",
            content: "We have an important update regarding Cardamania. The release window has been officially shifted to 2028.",
            postId: "cardamania-update-2025"
        },
        {
            id: "news_studio_welcome",
            title: "Welcome to the New Website",
            date: "September 2025",
            content: "We are officially launching our new centralized hub for all things Left-Sided Studios.",
            postId: "welcome-to-lss"
        }
    ],
    blogPosts: [
        {
            id: "cardamania-update-2025",
            title: "Cardamania Release Schedule Update",
            date: "November 15, 2025",
            excerpt: "An official statement regarding the shift in development timelines for Cardamania.",
            content: "We have an important update regarding Cardamania. The release window has been officially shifted to 2028. This decision stems from necessary adjustments due to background reasons that we are unable to disclose fully at this moment. We remain committed to delivering the best possible experience and appreciate your patience as we navigate these internal shifts.\n\nDeveloping an online TCG with the depth of Magic: The Gathering Commander is a massive undertaking for an independent team. We want to ensure that the balance, networking infrastructure, and visual fidelity meet the high standards our community expects.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/cardamania_promo_image.png?raw=true",
            relatedGameIds: ["game_cardamania"]
        },
        {
            id: "welcome-to-lss",
            title: "A New Era: Welcome to Left-Sided Studios",
            date: "September 01, 2025",
            excerpt: "A deep dive into our studio's history, mission, and the launch of our digital headquarters.",
            content: "Today marks a significant milestone for Left-Sided Studios. After years of operating across various platforms and social media channels, we are finally centralizing our identity with this new digital hub.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true",
            relatedGameIds: ["game_cardamania", "game_bumbl"]
        }
    ],
    games: [
        {
            id: "game_cardamania",
            title: "Cardamania",
            description: "Lead your Academy to Victory.",
            fullText: "A TCG battle game inspired by Magic the Gathering Commander. Build your deck and conquer other academies.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/cardamania_promo_image.png?raw=true",
            releaseDate: "2028",
            status: "In Development",
            genres: ["TCG", "Strategy"],
            platforms: ["PC"],
            link: "https://gamejolt.com/games/cardamania/1028689",
            isFeatured: true,
            roadmap: [
                { label: "Core Deck Engine", date: "2024", completed: true },
                { label: "Multiplayer Netcode", date: "2025", completed: false, description: "Setting up dedicated servers for academy battles." },
                { label: "V1.0 Launch", date: "2028", completed: false }
            ]
        },
        {
            id: "game_bumbl",
            title: "Bumbl",
            description: "Action-adventure strategy on Planet SL-3.",
            fullText: "Explore a colorful planet hosting a cast of little 'Buggies' that help you solve puzzles and battle foes.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/wander_logo_bumbl.png?raw=true",
            releaseDate: "TBA",
            status: "In Development",
            genres: ["Adventure", "Strategy"],
            platforms: ["PC"],
            link: "https://gamejolt.com/games/bumbl/825643",
            roadmap: [
                { label: "Started Development", date: "Q2 2023", completed: true },
                { label: "Buggy AI Systems", date: "Q3 2025", completed: false }
            ]
        },
        {
            id: "game_cod_battlegrounds",
            title: "Create or Destroy: Battlegrounds",
            description: "A sandbox combat experience.",
            fullText: "A physics-based sandbox combat arena where building is as important as fighting.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/codb.png?raw=true",
            releaseDate: "TBA",
            status: "Paused",
            genres: ["Sandbox", "Action"],
            platforms: ["PC"],
            link: "https://gamejolt.com/games/createordestroy/760772"
        }
    ],
    subsidiaries: [
        {
            id: "sub_ande",
            name: "ANdE Studios",
            type: "Founder Imprint",
            owner: "Vermetra",
            tagline: "Experimental & Fan Projects",
            description: "Personal project label of Vermetra, specializing in high-intensity simulation.",
            fullText: "A specialized brand used by Vermetra to explore high-intensity simulation and experimental horror experiences, including Five Shifts at Fazbear's.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/ande_banner.png?raw=true",
            games: [
                {
                    id: "game_ande_fnaf",
                    title: "Five Shifts at Fazbear's",
                    description: "Survival horror fan-game.",
                    fullText: "Work as a security guard at the local Pizza Parlor.",
                    image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/fsaf.png?raw=true",
                    releaseDate: "2026",
                    status: "In Development",
                    genres: ["Horror", "Survival"],
                    platforms: ["PC"],
                    link: "https://gamejolt.com/games/fsaf/989425"
                }
            ]
        },
        {
            id: "sub_gotchya",
            name: "Gotch-ya Studios",
            type: "Founder Imprint",
            owner: "DaRealSansYT",
            tagline: "Enriching RPGs",
            description: "DaRealSansYT's creative label for narrative-driven RPGs.",
            fullText: "The primary creative vehicle for DaRealSansYT, focusing on deep RPG systems and atmospheric dark fantasy.",
            image: "https://placehold.co/800x400/3e0909/fecaca?text=GOTCH-YA+STUDIOS",
            games: [
                {
                    id: "game_gotchya_shadow",
                    title: "Shadow of The Sanctified",
                    description: "Dark fantasy RPG adventure.",
                    fullText: "A world shrouded in darkness, combining classic RPG mechanics with modern storytelling.",
                    image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/sots1.png?raw=true",
                    releaseDate: "TBA",
                    status: "Alpha",
                    genres: ["RPG", "Fantasy"],
                    platforms: ["PC"],
                    link: "https://gamejolt.com/games/SOTF1/1027993"
                }
            ]
        },
        {
            id: "sub_bomb_banana",
            name: "Bomb Banana Studios",
            type: "Founder Imprint",
            owner: "RocketBlasts",
            tagline: "Quirky & Energetic",
            description: "RocketBlasts' label for vibrant, quirky gameplay.",
            fullText: "The personal project label for RocketBlasts, bringing high energy and unique character designs to the LSS family.",
            image: "https://placehold.co/800x400/ffaa00/1f2937?text=BOMB+BANANA+STUDIOS",
            games: [
                {
                    id: "game_bomb_eyebo",
                    title: "Eyebo",
                    description: "Hack-and-slash platformer.",
                    fullText: "Navigate a monster-filled world as a warrior eye.",
                    image: "https://placehold.co/800x600/1e40af/bfdbfe?text=EYEBO+PLATFORMER",
                    releaseDate: "TBA",
                    status: "In Development",
                    genres: ["Platformer", "Action"],
                    platforms: ["PC", "Web"],
                    link: "https://sites.google.com/view/leftsidedstudios/subsidiaries/bomb-banana-studios/eyebo?authuser=0"
                }
            ]
        },
        {
            id: "sub_skullix",
            name: "Skullix Media Group",
            type: "Production Unit",
            tagline: "Media & Production",
            description: "Supporting media production for Left-Sided projects.",
            fullText: "Ensuring high-quality visual and audio delivery across the studio network.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/skullix.png?raw=true",
            games: [],
            series: [
                {
                    id: "series_fnaf_on_the_clock",
                    title: "Five Nights at Freddy's - On the Clock",
                    description: "Founding of Fazbear Entertainment.",
                    fullText: "A deep-dive cinematic series exploring the early days of Fazbear Entertainment, the rise of William Afton and Henry Emily, and the dark secrets that set the foundation for the entire franchise.",
                    image: "https://placehold.co/800x450/111/fff?text=FNaF+-+On+the+Clock",
                    releaseDate: "2027",
                    status: "In Development",
                    roadmap: [
                        { label: "Scripting Phase", date: "2024", completed: true },
                        { label: "Storyboarding", date: "2025", completed: false, description: "Mapping out the visual narrative for the pilot episode." },
                        { label: "Voice Acting & Animation", date: "2026", completed: false },
                        { label: "Full Premiere", date: "2027", completed: false }
                    ]
                }
            ]
        },
        {
            id: "sub_endgame",
            name: "Endgame Studios",
            type: "Official Subsidiary",
            tagline: "Innovative Gameplay",
            description: "Focused on large-scale innovative multiplayer experiences.",
            fullText: "Pushing boundaries with innovative multiplayer mechanics and dedicated large-team projects.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/endgamestudios.png?raw=true",
            games: []
        }
    ],
    partners: [
        {
            id: "partner_citadel",
            name: "Citadel Studios",
            type: "Strategic Partner",
            description: "Collaborating on shared development goals.",
            fullText: "A strategic alliance to expand the reach and infrastructure of indie projects.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/cs_banner.png?raw=true",
            website: "https://gamejolt.com/@CitadelStudiosOfficial",
            tags: ["Development", "Infrastructure"]
        }
    ]
};