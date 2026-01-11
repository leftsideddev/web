import { DB } from './types';

export const BACKEND_URL = "https://leftsidedinsiders.netlify.app/api";
export const ALLOWED_ADMINS = [
    "vermetra@gmail.com",
    "baddudepvp1126@gmail.com",
    "rktspencer@gmail.com"
];

export const db: DB = {
    about: {
        title: "Welcome to Left-Sided Studios",
        subtitle: "Explore our creations, updates, and fan content, including unique experiences inspired by popular franchises.",
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
            id: "news_rise_reveal",
            title: "Project RISE Officially Revealed",
            date: "February 20, 2026",
            content: "We are thrilled to pull back the curtain on RISE, our upcoming roguelike tower-climber.",
            postId: "rise-announcement-2026"
        },
        {
            id: "news_cardamania_delay",
            title: "Cardamania Release Schedule Update",
            date: "November 15, 2025",
            content: "We have an important update regarding Cardamania. The release window has been officially shifted to 2028.",
            postId: "cardamania-update-2025"
        }
    ],
    blogPosts: [
        {
            id: "rise-announcement-2026",
            title: "Introducing Project RISE: The Ultimate Tower Climber",
            date: "February 20, 2026",
            excerpt: "Prepare for a high-octane roguelike experience. RISE is officially in development!",
            content: "We are incredibly excited to announce our latest flagship project: **RISE**. \n\nRISE represents a significant technical leap for Left-Sided Studios. Inspiration comes from high-speed masterpieces like [Pizza Tower](https://store.steampowered.com/app/2231450/Pizza_Tower/) and [DIVE](https://www.roblox.com/games/102464178326906/DIVE-v0-2a?), but we are injecting a deep roguelike progression system that ensures no two climbs are ever the same.\n\n### The Vertical Entropy Engine\nAt the heart of RISE is our 'Vertical Entropy Engine.' Unlike static platformers, the tower shifts its architectural layout based on your current run's artifacts. Every 10 floors, the biome resets—transitioning from steampunk clockworks to bioluminescent caverns—forcing players to adapt their movement tech on the fly.\n\n### 8 Characters, 8 Playstyles\nWe aren't just giving you skins; we're giving you archetypes. \n* **The Velocity Sage:** High acceleration, momentum-based jumps.\n* **The Heavyweight:** Slower movement but capable of smashing through shortcut barriers.\n* **The Phase Shifter:** Can briefly teleport through solid architecture.\n\n### Fast-Paced Action\nThe clock is your primary antagonist. Every second spent optimizing your route is a second saved for the inevitable boss encounter at the tower's peak. Stay tuned as we share more gameplay clips of RISE over the coming months.\n\n***\n\n**Notice:** Left-Sided Studios does not own *Pizza Tower* or *DIVE*. These projects are the intellectual property of their respective creators. Our mentions serve as a tribute to the inspirations that drive our design philosophy.",
            image: "https://github.com/leftsideddev/web/blob/main/images/games/rise_logo.png?raw=true",
            relatedGameIds: ["game_rise"],
            tags: ["Announcement", "RISE", "Platformer"]
        },
        {
            id: "cardamania-update-2025",
            title: "Cardamania Release Schedule Update",
            date: "November 15, 2025",
            excerpt: "An official statement regarding the shift in development timelines for Cardamania.",
            content: "We have an important update regarding **Cardamania**. The release window has been officially shifted to **2028**.\n\n### The Depth of the Academy\nDeveloping an online TCG with the depth of *Magic: The Gathering Commander* is a massive undertaking for an independent team. We aren't just building a card game; we are building an ecosystem. Cardamania features four primary Academies, each with distinct lore, visual identity, and mechanical focus:\n\n* **Iron Citadel:** Focused on defensive fortifications and equipment cards.\n* **Void Weaver:** Masters of graveyard recursion and high-risk 'life-burn' strategies.\n* **Aether Pulse:** Specializing in spell-slinging and instant-speed responses.\n* **Wild Bloom:** Utilizing creature swarms and mana ramp logic.\n\n### Why 2028?\nOur 'Commander Engine' requires a level of networking stability that matches industry leaders. With multi-player 'Academy Battles' being the core experience, we cannot afford latency issues that disrupt tactical planning. \n\n> \"We want every Academy leader to feel like they are making choices that matter. If the balance isn't perfect at launch, we haven't done our jobs.\"\n\nThis extension allows us to double-down on balance testing and infrastructure. We appreciate the community's patience as we refine this titan of a project.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/cardamania_promo_image.png?raw=true",
            relatedGameIds: ["game_cardamania"],
            tags: ["Development", "Cardamania", "TCG"]
        },
        {
            id: "welcome-to-lss",
            title: "The Genesis of Left-Sided: From a Summer Hangout to a Studio Hub",
            date: "November 10, 2025",
            excerpt: "How a summer week at Vermetra's house sparked a multi-label development network featuring Cardamania and Bumbl.",
            content: "Every great studio has a 'founding spark,' and for Left-Sided Studios, that spark was ignited in the summer of 2023. \n\n### The Summer of 2023\nIt started with a simple week-long hangout. Founders **DaRealSansYT** and **RocketBlasts** arrived at **Vermetra's** house with no intention other than gaming and messing around. However, the energy was infectious. Between casual play sessions and long conversations about what made their favorite games great, a conceptual vision began to form. \n\n> \"We were just messing around, but we ended up conceptualizing a project inspired by the core mechanics of Pikmin. That was the moment we realized we could actually build something together.\"\n\nFrom those informal sessions, the 'Left-Sided' philosophy was born: a commitment to the creative, intuitive, and unconventional side of game design. What began as three friends at a kitchen table has since evolved into a multi-faceted digital powerhouse.\n\n[img:https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true]\n\n### Current Flagships: Cardamania and Bumbl\nAs of late 2025, our development roadmap is defined by two ambitious titles that showcase our range. \n\n**Cardamania** is our tribute to the high-stakes world of TCGs. Inspired by the 'Commander' format of Magic: The Gathering, it features a complex 'Academy' system where players must master unique elemental and tactical archetypes to dominate the battlefield. We are pouring thousands of hours into the networking and balancing to ensure that when it hits in 2028, it changes the way people play digital card games.\n\n**Bumbl**, on the other hand, represents our love for exploration and strategy. Set on the vibrant planet SL-3, it tasks players with leading a cast of 'Buggies' through environmental puzzles and tactical combat. It's a game about synergy, discovery, and the charm of a living, breathing world.\n\n### The Strategic Alliance: LSS x Citadel Studios\nIn **August 2025**, we reached our most significant milestone yet by entering a strategic partnership with **Citadel Studios**. This alliance represents a deep integration of our production capabilities. Together, we are co-producing projects that bridge the gap between sandbox survival and cinematic horror, including specialized support for the highly anticipated *FNaF '97*.\n\n### Our Multi-Label Network\nTo stay true to our roots of individual creativity while scaling our output, we now operate through specialized subsidiary imprints:\n\n1. **ANdE Studios (Vermetra):** Specializing in high-intensity simulation and experimental horror.\n2. **Gotch-ya Studios (DaRealSansYT):** Dedicated to narrative-driven RPG experiences and atmospheric dark fantasy.\n3. **Bomb Banana (RocketBlasts):** Our home for vibrant, quirky, and high-energy gameplay featuring characters like *Eyebo*.\n4. **Skullix Media Group:** Our shared production unit that ensures cinematic trailers and series like *'On the Clock'* maintain top-tier visual fidelity.\n\nWe invite you to explore the network. This hub is the living history of our collective journey.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true",
            gallery: [
                "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/ande_banner.png?raw=true",
                "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/cs_banner.png?raw=true",
                "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/skullix.png?raw=true"
            ],
            relatedGameIds: ["game_cardamania", "game_bumbl", "game_ande_fnaf", "game_gotchya_shadow", "game_bomb_eyebo", "series_fnaf_on_the_clock"],
            tags: ["Studio", "Origins", "Ecosystem"]
        }
    ],
    games: [
        {
            id: "game_cardamania",
            title: "Cardamania",
            description: "Lead your Academy to Victory.",
            fullText: "A TCG battle game inspired by Magic the Gathering Commander. Build your deck and conquer other academies.\n\n### Features:\n* **Commander-Style Gameplay:** Deep tactical depth.\n* **Online Multiplayer:** Battle friends across the globe.\n* **Academy System:** Represent your faction.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/cardamania_promo_image.png?raw=true",
            releaseDate: "November 15, 2025", // Hidden metadata to ensure it shows up in past-filter
            status: "In Development",
            genres: ["TCG", "Strategy"],
            platforms: ["PC"],
            link: null,
            isFeatured: true,
            roadmap: [
                { label: "Core Deck Engine", date: "2024", completed: true },
                { label: "Multiplayer Netcode", date: "2025", completed: false, description: "Setting up dedicated servers for academy battles." },
                { label: "V1.0 Launch", date: "2028", completed: false }
            ]
        },
        {
            id: "game_rise",
            title: "RISE",
            description: "Race against the clock in this roguelike tower-climber.",
            fullText: "RISE is a **Roguelike platformer** inspired by games like *Pizza Tower* and *Dive* where you have to race against the clock to the top of the tower in this ever-evolving experience!\n\n### What to expect:\n1. **8 Characters:** Unique skills for every climb.\n2. **Roguelike Progression:** Every run is different.\n3. **Tight Controls:** Built for speed-running.",
            image: "https://github.com/leftsideddev/web/blob/main/images/games/rise_logo.png?raw=true",
            releaseDate: "February 20, 2026",
            status: "In Development",
            genres: ["Platformer", "Roguelike"],
            platforms: ["PC"],
            link: "https://gamejolt.com/games/rise/1041134"
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
                    fullText: "A world shrouded in darkness, combining classic RPG mechanics with modern storytelling.\n\n***\n\n**Notice:** Development has been officially terminated due to a critical loss of project files. This title remains as a legacy archive of the concept.",
                    image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/sots1.png?raw=true",
                    releaseDate: "TBA",
                    status: "Canceled",
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
            fullText: "A strategic alliance reached in August 2025 to expand the reach and infrastructure of indie projects. Citadel Studios focuses on high-fidelity horror reimagining and cinematic Minecraft productions.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/cs_banner.png?raw=true",
            website: "https://citadelstudios.netlify.app/",
            tags: ["Development", "Infrastructure", "Horror"]
        }
    ]
};