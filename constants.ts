import { DB } from './types';

export const db: DB = {
    about: {
        title: "Welcome to Left-Sided Studios",
        subtitle: "Explore our creations, updates, and fan content, including unique experiences inspired by popular franchises.",
        featuredImage: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/leftsided1920.png?raw=true",
        featuredImageLight: "https://github.com/leftsideddev/web/blob/main/images/studios/leftsided1920_white.png?raw=true",
        text: "Here at Left-Sided Studios, we are dedicated to independent game development, sharing original games and projects on GameJolt and other platforms. We build unique experiences ranging from original IPs to fan-inspired media.",
        quoteAuthor: "Vermetra, Co-Founder and Head of Left-Sided Studios"
    },
    siteMap: {
        home: "https://sites.google.com/view/leftsidedstudios/home?authuser=0",
        games: "https://sites.google.com/view/leftsidedstudios/games?authuser=0",
        subsidiaries: "https://sites.google.com/view/leftsidedstudios/subsidiaries?authuser=0",
        partners: "https://sites.google.com/view/leftsidedstudios/partners?authuser=0",
        contact: "https://sites.google.com/view/leftsidedstudios/contact?authuser=0",
    },
    people: [
        { name: "Vermetra", role: "Co-Founder", bio: "", image: "", links: [{ icon: "youtube", url: "https://youtube.com/@vermetra", label: "YouTube" }] },
        { name: "DaRealSansYT", role: "Co-Founder", bio: "", image: "", links: [{ icon: "gamepad-2", url: "https://gamejolt.com/@DaRealSansYT", label: "GameJolt" }] },
        { name: "RocketBlasts", role: "Co-Founder", bio: "", image: "", links: [{ icon: "zap", url: "https://gamejolt.com/@RocketBlasts", label: "GameJolt" }] }
    ],
    teamDetails: {
        vermetra: {
            name: "Vermetra",
            role: "Co-Founder & Lead Developer",
            bio: "Gamer, Game Dev, and Co-Founder of Left-Sided Studios. Huge VλLVᴱ, FNaF, and Robot 64 Fan. I also love technology/techtube stuff.",
            image: "https://github.com/leftsideddev/web/blob/main/images/vermetra.jpg?raw=true",
            links: [
                { icon: "youtube", url: "https://youtube.com/@vermetra", label: "YouTube" },
                { icon: "twitter", url: "https://x.com/vermetra", label: "X (Twitter)" },
            ]
        },
        darealsansyt: {
            name: "DaRealSansYT",
            role: "Co-Founder & Content Creator",
            bio: "Nerd, YouTuber, Anime enjoyer. Avid stalker of all thing Hatsune Miku.",
            image: "https://github.com/leftsideddev/web/blob/main/images/sansyt.jpg?raw=true",
            links: [
                { icon: "youtube", url: "https://youtube.com/@SansYT4Real", label: "YouTube" },
                { icon: "twitter", url: "https://x.com/darealsansyt", label: "X (Twitter)" },
            ]
        },
        rocketblasts: {
            name: "RocketBlasts",
            role: "Co-Founder & Creative Designer",
            bio: "Co-Founder and Creative Designer for LSS. Focusing on innovative game mechanics and visual identity for our titles.",
            image: "https://github.com/leftsideddev/web/blob/main/images/rocket.jpg?raw=true",
            links: [
                { icon: "youtube", url: "https://www.youtube.com/@Rocketblast1843", label: "YouTube" },
            ]
        }
    },
    news: [
        {
            id: "news_cardamania_delay",
            title: "Cardamania Release Schedule Update",
            date: "November 2025",
            content: "We have an important update regarding Cardamania. The release window has been officially shifted to 2028. This decision stems from necessary adjustments due to background reasons that we are unable to disclose fully at this moment. We remain committed to delivering the best possible experience and appreciate your patience as we navigate these internal shifts.",
            link: "https://twitter.com/LeftSidedStudios"
        }
    ],
    games: [
        {
            id: "game_cardamania",
            title: "Cardamania",
            description: "Lead your Academy to Victory.",
            fullText: "The rounds are up and the attacks are inbound. Cardamania is a game inspired by Magic the Gathering Commander where you lead your Academy to Victory in this new online TCG battle game!",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/cardamania_promo_image.png?raw=true",
            releaseDate: "Available 2028",
            link: "https://gamejolt.com/games/cardamania/1028689"
        },
        {
            id: "game_bumbl",
            title: "Bumbl",
            description: "Action-adventure strategy on Planet SL-3.",
            fullText: "Bumbl is an action-adventure, strategy game inspired by that one game by that really big Japanese company. Explore the recently discovered planet SL-3, hosting a colorful cast of little 'Buggies' that are here to help you! Collect little artifacts, technology bits, and so much more!",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/wander_logo_bumbl.png?raw=true",
            releaseDate: "Coming Soon",
            link: "https://gamejolt.com/games/bumbl/825643"
        },
        {
            id: "game_cod_battlegrounds",
            title: "Create or Destroy: Battlegrounds",
            description: "A sandbox combat experience.",
            fullText: "Enter the Battlegrounds. A sandbox combat experience where creativity meets destruction. Build your defenses, craft your loadout, and tear down your enemies.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/codb.png?raw=true",
            releaseDate: "Indefinetly on hold",
            link: "https://gamejolt.com/games/createordestroy/760772"
        }
    ],
    subsidiaries: [
        {
            id: "sub_ande",
            name: "ANdᴱ Studios",
            tagline: "Experimental & Fan Projects",
            description: "Creators of The Reactor, Five Shifts at Fazbear's, and The Diner.",
            fullText: "ANdᴱ Studios focuses on experimental gameplay and high-quality fan works. They are a key pillar of the Left-Sided family.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/ande_banner.png?raw=true",
            games: [
                {
                    id: "game_ande_fnaf",
                    title: "Five Shifts at Fazbear's",
                    description: "A survival horror fan-game.",
                    fullText: "You work as a security guard at the local, recently opened Freddy Fazbear's Pizza Parlor. Featuring State of the art \"Animatronics\", performing and singing robots to bring joy to the children. Recently, the Nightguard stopped showing responding to calls and showing up to work after last night's shift. So you were given a 50% raise to work his shift.",
                    image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/fsaf.png?raw=true",
                    releaseDate: "Available on GameJolt",
                    link: "https://gamejolt.com/games/fsaf/989425"
                },
                {
                    id: "game_ande_reactor",
                    title: "The Reactor",
                    description: "Simulation and crisis management.",
                    fullText: "Play as John Rendel, a low-level intern at the Zielum plant, who just so happened to be 2 doors down from ground zero. Your goal is to escape the Superreactor grounds to find your family and get out of Simmersville.",
                    image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/thereactor_banner.png?raw=true",
                    releaseDate: "Available on GameJolt",
                    link: "https://gamejolt.com/games/thereactor/1028009"
                },
            ]
        },
        {
            id: "sub_gotchya",
            name: "Gotch-ya Studios",
            tagline: "Enriching RPGs",
            description: "Home of Shadow of The Sanctified.",
            fullText: "Gotch-ya Studios specializes in darker, narrative-driven experiences that challenge the player's perception.",
            image: "https://placehold.co/800x400/3e0909/fecaca?text=GOTCH-YA+STUDIOS",
            games: [
                {
                    id: "game_gotchya_shadow",
                    title: "Shadow of The Sanctified",
                    description: "Dark fantasy RPG adventure.",
                    fullText: "Explore a world shrouded in darkness. Shadow of The Sanctified combines classic RPG elements with modern storytelling to create an atmospheric journey into the unknown.",
                    image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/games/sots1.png?raw=true",
                    releaseDate: "Available on GameJolt",
                    link: "https://gamejolt.com/games/SOTF1/1027993"
                }
            ]
        },
        {
            id: "sub_bomb_banana",
            name: "Bomb Banana Studios",
            tagline: "Quirky & Energetic",
            description: "Developers of Eyebo.",
            fullText: "Bomb Banana Studios brings energy and color to the collective. Their games are known for unique visual styles and fun mechanics.",
            image: "https://placehold.co/800x400/ffaa00/1f2937?text=BOMB+BANANA+STUDIOS",
            games: [
                {
                    id: "game_bomb_eyebo",
                    title: "Eyebo",
                    description: "Hack-and-slash platformer.",
                    fullText: "A hack-and-slash platformer through a grim and monster-filled world. You follow Eyebo, an aspiring warrior, as he tries to make his way to the top.",
                    image: "https://placehold.co/800x600/1e40af/bfdbfe?text=EYEBO+ACTION+PLATFORMER",
                    releaseDate: "View on Google Sites",
                    link: "https://sites.google.com/view/leftsidedstudios/subsidiaries/bomb-banana-studios/eyebo?authuser=0"
                }
            ]
        },
        {
            id: "sub_skullix",
            name: "Skullix Media Group",
            tagline: "Media & Production",
            description: "Supporting media production for Left-Sided projects.",
            fullText: "Skullix Media Group handles various media production aspects, ensuring high-quality content delivery across the network.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/skullix.png?raw=true",
            games: [
				{
					id: "series_fsaf_otc",
					title: "Five Nights at Freddy's: On the Clock",
					description: "TBA",
					fullText: "An animated series set in the late 90s as aspiring partners build the corperate empire of a lifetime",
					image: "",
					releaseDate: "Q3 2026 - Q2 2027",
					link: null
				}
			]
        },
        {
            id: "sub_endgame",
            name: "Endgame Studios",
            tagline: "Innovative Gameplay",
            description: "Focused on pushing boundaries with 'Project Sentinel'.",
            fullText: "Endgame Studios is the latest addition to our roster, currently working on 'Project Sentinel', an innovative multiplayer tower defense game.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/endgamestudios.png?raw=true",
            games: [
                {
                    id: "game_endgame_sentinel",
                    title: "Project Sentinel",
                    description: "Innovative multiplayer tower defense.",
                    fullText: "Project Sentinel is the current unannounced project from Endgame Studios. It is planned to be an innovative multiplayer tower defense game that focuses on cooperative strategy and resource management, pushing the boundaries of the genre.",
                    image: "https://placehold.co/800x600/166534/a7f3d0?text=PROJECT+SENTINEL+TD",
                    releaseDate: "Unannounced",
                    link: null
                }
            ]
        }
    ],
    partners: [
        {
            id: "partner_citadel",
            name: "Citadel Studios",
            type: "Strategic Partner",
            description: "Collaborating on shared development goals.",
            fullText: "Citadel Studios is a close partner of Left-Sided Studios, working together to expand the reach and quality of indie games.",
            image: "https://raw.githubusercontent.com/leftsideddev/web/main/images/studios/cs_banner.png?raw=true",
            website: "https://citadelstudios.netlify.app/"
        }
    ]
};