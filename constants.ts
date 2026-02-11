
import { DB } from './types';

// Points to our local Netlify function bridge
export const BACKEND_URL = "/.netlify/functions/db-sync";

export const ALLOWED_ADMINS = [
    "vermetra@gmail.com",
    "baddudepvp1126@gmail.com",
    "rktspencer@gmail.com"
];

export const db: DB = {
    about: {
        title: "Welcome to Left-Sided Studios",
        subtitle: "Explore our creations, updates, and more!",
        featuredImage: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true",
        featuredImageLight: "https://github.com/leftsideddev/web/blob/main/images/studios/leftsided1920_white.png?raw=true",
        text: "Here at Left-Sided Studios, we are dedicated to independent game development, sharing original games and projects on GameJolt and other platforms. Founded 2023.",
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
        { year: "2025", event: "Citadel Alliance", description: "In August 2025, LSS entered a strategic partnership with Citadel Studios to co-produce high-fidelity horror and cinematic content." }
    ],
    pressAssets: [
        { label: "Main Logo (White PNG)", type: "Logo", url: "https://github.com/leftsideddev/web/blob/main/images/studios/leftsided1920_white.png?raw=true" },
        { label: "Main Logo (Black PNG)", type: "Logo", url: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true" },
        { label: "Studio Press Kit (Drive)", type: "Brand Package", url: "https://drive.google.com/drive/folders/15xJ78cDwmnJIIqkjCyqkuzcUuM_zOMWs?usp=drive_link" }
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
            bio: "Co-Founder and Creative Designer for LSS.", 
            image: "https://github.com/leftsideddev/web/blob/main/images/rocket.jpg?raw=true", 
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
            id: "godot-migration-news",
            title: "LSS Goes All-In on Godot 4.6",
            date: "January 30, 2026",
            content: "We are officially moving all our projects into Godot 4.6, migrating legacy builds from Unity and Unreal.",
            postId: "godot-migration",
            isPublic: true
        },
        {
            id: "rise-reveal",
            title: "Project RISE Officially Revealed",
            date: "February 20, 2026",
            content: "We are thrilled to pull back the curtain on RISE, our upcoming roguelike tower-climber.",
            postId: "rise-announcement",
            isPublic: false
        },
        {
            id: "cardamania-delay-news",
            title: "Cardamania Release Schedule Update",
            date: "November 15, 2025",
            content: "We have an important update regarding Cardamania. The release window has been officially shifted to 2028.",
            postId: "cardamania-update",
            isPublic: true
        }
    ],
    blogPosts: [
        {
            id: "godot-migration",
            title: "The Godot Leap: Why We’re Moving Everything to 4.6",
            date: "January 30, 2026",
            excerpt: "As a small team of three, we need tools that keep us agile. Here is why we're bringing our entire catalog into Godot 4.6.",
            content: "Today marks a pivotal shift in the technical history of Left-Sided Studios. As many of you know, our small team consisting of **Vermetra**, **Rocket**, and **DaRealSansYT** has always been about finding the most intuitive way to build the experiences we love.\n\n### The Discovery\nWhile we are currently deep in the development of **Cardamania**, we’ve had a massive realization. Although Cardamania isn't out yet, the experience of building our flagship from the ground up in the **Godot Engine** has been eye-opening. The progress we've made has shown us that Godot 4.6 is exactly the engine we’ve been looking for.\n\nUp until now, our projects have been spread across several different environments:\n\n*   **Bumbl:** Currently living in **Unity**.\n*   **BREAKPOINT:** Built on the foundations of **Unreal Engine 4**.\n*   **Cardamania:** Our Godot flagship (In Progress).\n\n### Why We're Switching\nBeing a 3-person team means we have to be smart with our time. Managing multiple rendering pipelines and distinct coding environments takes away from what matters: the games themselves. \n\nWe decided that instead of keeping these projects separate, we are going all-in. We are officially porting *Bumbl* and *BREAKPOINT* over to Godot 4.6. This allows us to share code, shaders, and UI systems across every single LSS project. If we build a cool feature for *Cardamania*, we can now bring it into *BREAKPOINT* with minimal friction.\n\nWe believe this move will let us work faster, polish our games harder, and stay true to the 'Left-Sided' philosophy of unconventional, intuitive design. We can't wait to show you the results!",
            image: "https://github.com/leftsideddev/web/blob/main/images/leftsidedgodot.png?raw=true",
            relatedGameIds: ["cardamania", "bumbl", "breakpoint"],
            tags: ["Tech", "Development", "Godot", "Engine"],
            isPublic: true
        },
        {
            id: "rise-announcement",
            title: "Introducing Project RISE: The Ultimate Tower Climber",
            date: "February 20, 2026",
            excerpt: "Prepare for a high-octane roguelike experience. RISE is officially in development!",
            content: "We are incredibly excited to announce our latest flagship project: **RISE**. \n\nRISE represents a significant technical leap for Left-Sided Studios. Inspiration comes from high-speed masterpieces like [Pizza Tower](https://store.steampowered.com/app/2231450/Pizza_Tower/) and [DIVE](https://www.roblox.com/games/102464178326906/DIVE-v0-2a?), but we are injecting a deep roguelike progression system that ensures no two climbs are ever the same.\n\n***\n\n**Notice:** Left-Sided Studios does not own *Pizza Tower* or *DIVE*. These projects are the intellectual property of their respective creators.",
            image: "https://github.com/leftsideddev/web/blob/main/images/games/rise_logo.png?raw=true",
            relatedGameIds: ["rise"],
            tags: ["Announcement", "RISE", "Platformer"],
            isPublic: false
        },
        {
            id: "cardamania-update",
            title: "Cardamania Release Schedule Update",
            date: "November 15, 2025",
            excerpt: "An official statement regarding the shift in development timelines for Cardamania.",
            content: "We have an important update regarding **Cardamania**. The release window has been officially shifted to **2028**.\n\n### Why 2028?\nOur 'Commander Engine' requires a level of networking stability that matches industry leaders. With multi-player 'Academy Battles' being the core experience, we cannot afford latency issues that disrupt tactical planning. This extension allows us to double-down on balance testing and infrastructure.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/cardamania_promo_image.png?raw=true",
            relatedGameIds: ["cardamania"],
            tags: ["Development", "Cardamania", "TCG"],
            isPublic: true
        },
        {
            id: "welcome",
            title: "The Genesis of Left-Sided: From a Summer Hangout to a Studio Hub",
            date: "November 10, 2025",
            excerpt: "How a summer week at Vermetra's house sparked a multi-label development network featuring Cardamania and Bumbl.",
            content: "Every great studio has a 'founding spark,' and for Left-Sided Studios, that spark was ignited in the summer of 2023. \n\n### The Summer of 2023\nIt started with a simple week-long hangout. Founders **DaRealSansYT** and **RocketBlasts** arrived at **Vermetra's** house with no intention other than gaming and messaging around. However, the energy was infectious. \n\n> \"We were just messing around, but we ended up conceptualizing a project inspired by the core mechanics of Pikmin. That was the moment we realized we could actually build something together.\"\n\nFrom those informal sessions, the 'Left-Sided' philosophy was born. What began as three friends at a kitchen table has since evolved into a multi-faceted digital hub.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true",
            gallery: [
                "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/ande_banner.png?raw=true",
                "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/cs_banner.png?raw=true",
                "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/skullix.png?raw=true"
            ],
            relatedGameIds: ["cardamania", "bumbl"],
            tags: ["Studio", "Origins", "Ecosystem"],
            isPublic: true
        }
    ],
    games: [
        {
            id: "cardamania",
            title: "Cardamania",
            description: "Lead your Academy to Victory.",
            fullText: "A TCG battle game inspired by Magic the Gathering Commander. Build your deck and conquer other academies.\n\n### Features:\n* **Commander-Style Gameplay:** Deep tactical depth.\n* **Online Multiplayer:** Battle friends across the globe.\n* **Academy System:** Represent your faction.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/cardamania_promo_image.png?raw=true",
            releaseDate: "2028", 
            status: "In Development",
            genres: ["TCG", "Strategy"],
            platforms: ["PC"],
            developer: "LSS",
            link: null,
            isFeatured: true,
            roadmap: [
                { label: "Core Deck Engine", date: "2024", completed: true },
                { label: "Multiplayer Netcode", date: "2025", completed: false, description: "Setting up dedicated servers for academy battles." },
                { label: "V1.0 Launch", date: "2028", completed: false }
            ],
            isPublic: true
        },
        {
            id: "rise",
            title: "RISE",
            description: "Race against the clock in this roguelike tower-climber.",
            fullText: "RISE is a **Roguelike platformer** inspired by games like *Pizza Tower* and *Dive* where you have to race against the clock to the top of the tower!\n\n### What to expect:\n1. **8 Characters:** Unique skills for every climb.\n2. **Roguelike Progression:** Every run is different.\n3. **Tight Controls:** Built for speed-running.",
            image: "https://github.com/leftsideddev/web/blob/main/images/games/rise_logo.png?raw=true",
            releaseDate: "February 20, 2026",
            status: "In Development",
            genres: ["Platformer", "Roguelike"],
            platforms: ["PC"],
            developer: "LSS",
            link: "https://gamejolt.com/games/rise/1041134",
            isPublic: false
        },
        {
            id: "bumbl",
            title: "Bumbl",
            description: "Action-adventure strategy on Planet SL-3.",
            fullText: "Explore a colorful planet hosting a cast of little 'Buggies' that help you solve puzzles and battle foes.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/wander_logo_bumbl.png?raw=true",
            releaseDate: "TBA",
            status: "In Development",
            genres: ["Adventure", "Strategy"],
            platforms: ["PC"],
            developer: "LSS",
            link: "https://gamejolt.com/games/bumbl/825643",
            roadmap: [
                { label: "Started Development", date: "Q2 2023", completed: true },
                { label: "Buggy AI Systems", date: "Q3 2025", completed: false }
            ],
            isPublic: true
        },
        {
            id: "breakpoint",
            title: "BREAKPOINT",
            description: "A story-driven tactical shooter.",
            fullText: "BREAKPOINT is a narrative-heavy tactical shooter that follows the last survivors of a collapsed society. Navigate through a decaying world where your decisions dictate the fate of the remaining resistance.\n\n### Features:\n* **Story-Driven Campaign:** A cinematic experience focusing on character growth and consequence.\n* **Tactical Combat:** High-stakes gunplay where strategy outweighs brute force.\n* **Immersive Atmosphere:** Experience a world meticulously crafted for storytelling.",
            image: "https://github.com/leftsideddev/web/blob/main/images/games/breakpointlogo.png?raw=true",
            releaseDate: "TBA",
            status: "Paused",
            genres: ["Shooter", "Action"],
            platforms: ["PC"],
            developer: "LSS",
            link: "https://gamejolt.com/games/createordestroy/760772",
            isPublic: true
        }
    ],
    subsidiaries: [
        {
            id: "ande",
            name: "ANdE Studios",
            type: "Founder Imprint",
            owner: "Vermetra",
            tagline: "Experimental & Fan Projects",
            description: "Personal project label of Vermetra, specializing in high-intensity simulation.",
            fullText: "A specialized brand used by Vermetra to explore high-intensity simulation and experimental horror experiences, including Five Shifts at Fazbear's.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/ande_banner.png?raw=true",
            games: [
                {
                    id: "ande-fnaf",
                    title: "Five Shifts at Fazbear's",
                    description: "Survival horror fan-game.",
                    fullText: "Work as a security guard at the local Pizza Parlor.",
                    image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/fsaf.png?raw=true",
                    releaseDate: "2026",
                    status: "In Development",
                    genres: ["Horror", "Survival"],
                    platforms: ["PC"],
                    developer: "ande",
                    link: "https://gamejolt.com/games/fsaf/989425",
                    isPublic: true
                }
            ],
            isPublic: true
        },
        {
            id: "gotchya",
            name: "Gotch-ya Studios",
            type: "Founder Imprint",
            owner: "DaRealSansYT",
            tagline: "Enriching RPGs",
            description: "DaRealSansYT's creative label for narrative-driven RPGs.",
            fullText: "The primary creative vehicle for DaRealSansYT, focusing on deep RPG systems and atmospheric dark fantasy.",
            image: "https://placehold.co/800x400/3e0909/fecaca?text=GOTCH-YA+STUDIOS",
            games: [
                {
                    id: "gotchya-shadow",
                    title: "Shadow of The Sanctified",
                    description: "Dark fantasy RPG adventure.",
                    fullText: "A world shrouded in darkness, combining classic RPG mechanics with modern storytelling.\n\n***\n\n**Notice:** Development has been officially terminated due to a critical loss of project files.",
                    image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/sots1.png?raw=true",
                    releaseDate: "TBA",
                    status: "Canceled",
                    genres: ["RPG", "Fantasy"],
                    platforms: ["PC"],
                    developer: "gotchya",
                    link: "https://gamejolt.com/games/SOTF1/1027993",
                    isPublic: true
                }
            ],
            isPublic: true
        },
        {
            id: "bomb-banana",
            name: "Bomb Banana Studios",
            type: "Founder Imprint",
            owner: "RocketBlasts",
            tagline: "Quirky & Energetic",
            description: "RocketBlasts' label for vibrant, quirky gameplay.",
            fullText: "The personal project label for RocketBlasts, bringing high energy and unique character designs to the LSS family.",
            image: "https://github.com/leftsideddev/web/blob/main/images/studios/bombbanana.png?raw=true",
            games: [
                {
                    id: "eyebo",
                    title: "Eyebo",
                    description: "Hack-and-slash platformer.",
                    fullText: "Navigate a monster-filled world as a warrior eye.",
                    image: "https://placehold.co/800x600/1e40af/bfdbfe?text=EYEBO+PLATFORMER",
                    releaseDate: "TBA",
                    status: "In Development",
                    genres: ["Platformer", "Action"],
                    platforms: ["PC", "Web"],
                    developer: "bomb-banana",
                    link: "https://sites.google.com/view/leftsidedstudios/subsidiaries/bomb-banana-studios/eyebo?authuser=0",
                    isPublic: true
                }
            ],
            isPublic: true
        },
        {
            id: "skullix",
            name: "Skullix Media Group",
            type: "Production Unit",
            tagline: "Media & Production",
            description: "Supporting media production for Left-Sided projects.",
            fullText: "Ensuring high-quality visual and audio delivery across the studio network.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/skullix.png?raw=true",
            games: [],
            series: [
                {
                    id: "fnaf-otc",
                    title: "Five Nights at Freddy's - On the Clock",
                    description: "Founding of Fazbear Entertainment.",
                    fullText: "A deep-dive cinematic series exploring the early days of Fazbear Entertainment.",
                    image: "https://github.com/leftsideddev/web/blob/main/images/games/fsaf_otc.png?raw=true",
                    releaseDate: "2027",
                    status: "In Development",
                    developer: "skullix",
                    roadmap: [
                        { label: "Scripting Phase", date: "2024", completed: true },
                        { label: "Storyboarding", date: "2025", completed: false, description: "Mapping out the visual narrative for the pilot episode." },
                        { label: "Voice Acting & Animation", date: "2026", completed: false },
                        { label: "Full Premiere", date: "2027", completed: false }
                    ],
                    isPublic: true
                }
            ],
            isPublic: true
        },
        {
            id: "endgame",
            name: "Endgame Studios",
            type: "Official Subsidiary",
            tagline: "Innovative Gameplay",
            description: "Focused on large-scale innovative multiplayer experiences.",
            fullText: "Pushing boundaries with innovative multiplayer mechanics and dedicated large-team projects.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/endgamestudios.png?raw=true",
            games: [],
            isPublic: true
        }
    ],
    partners: [
        {
            id: "citadel",
            name: "Citadel Studios",
            type: "Strategic Partner",
            description: "Collaborating on shared development goals.",
            fullText: "A strategic alliance reached in August 2025 to expand the reach and infrastructure of indie projects.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/cs_banner.png?raw=true",
            website: "https://citadelstudios.netlify.app/",
            tags: ["Development", "Infrastructure", "Horror"],
            isPublic: true
        }
    ]
};
