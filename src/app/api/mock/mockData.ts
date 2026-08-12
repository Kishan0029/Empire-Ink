import galleryImg1 from "@/imports/450x_auto__so.jpg";
import galleryImg2 from "@/imports/450x_auto__so__1_.jpg";
import galleryImg3 from "@/imports/450x_auto__so__2_.jpg";
import galleryImg4 from "@/imports/450x_auto__so__3_.jpg";
import galleryImg5 from "@/imports/450x_auto__so__4_.jpg";
import { Grid, Heart, Crown, Sparkles } from "lucide-react";
import type {
  Artwork,
  StatsItem,
  Testimonial,
  Collection,
  HistoryItem,
  UserProfile,
  UserSettings,
} from "../types";

export const MOCK_ARTWORKS: Artwork[] = [
  {
    id: 1,
    title: "The Durbar of Emperor Akbar",
    era: "Akbar",
    prompt: "Emperor Akbar holding court in Fatehpur Sikri, nobles presenting gifts",
    ratio: "4:3",
    likes: 847,
    asset: galleryImg1,
    h: 280,
    date: "Today, 10:45 AM",
  },
  {
    id: 2,
    title: "Moonlit Hunt Near Agra",
    era: "Jahangir",
    prompt: "Royal hunting scene at dusk near the Yamuna river, falconers on horseback",
    ratio: "3:4",
    likes: 1203,
    asset: galleryImg2,
    h: 380,
    date: "Today, 09:15 AM",
  },
  {
    id: 3,
    title: "Portrait of Nur Jahan",
    era: "Jahangir",
    prompt: "Empress Nur Jahan in a garden pavilion with lotus flowers",
    ratio: "3:4",
    likes: 2156,
    asset: galleryImg3,
    h: 340,
    date: "Yesterday, 4:20 PM",
  },
  {
    id: 4,
    title: "The Weighing Ceremony",
    era: "Shah Jahan",
    prompt: "Shah Jahan being weighed in gold during his birthday celebration",
    ratio: "4:3",
    likes: 934,
    asset: galleryImg4,
    h: 260,
    date: "Yesterday, 2:10 PM",
  },
  {
    id: 5,
    title: "Gardens of Shalimar",
    era: "Shah Jahan",
    prompt: "The Shalimar Gardens of Kashmir in full bloom, nobles strolling by fountains",
    ratio: "16:9",
    likes: 1567,
    asset: galleryImg5,
    h: 220,
    date: "24 Jul 2026",
  },
  {
    id: 6,
    title: "The Siege of Ranthambore",
    era: "Akbar",
    prompt: "Imperial Mughal artillery and elephants before the hilltop fortress",
    ratio: "16:9",
    likes: 642,
    asset: galleryImg1,
    h: 240,
    date: "23 Jul 2026",
  },
  {
    id: 7,
    title: "Emperor Jahangir's Golden Throne",
    era: "Jahangir",
    prompt: "Jahangir seated on the golden throne receiving Persian ambassadors",
    ratio: "1:1",
    likes: 1890,
    asset: galleryImg4,
    h: 300,
    date: "22 Jul 2026",
  },
  {
    id: 8,
    title: "Peacock Throne at Shahjahanabad",
    era: "Shah Jahan",
    prompt: "The legendary Takht-i-Taus adorned with rubies, emeralds, and pearls in the Diwan-i-Khas",
    ratio: "4:3",
    likes: 2431,
    asset: galleryImg2,
    h: 320,
    date: "21 Jul 2026",
  },
  {
    id: 9,
    title: "Imperial Falcon of Kashmir",
    era: "Jahangir",
    prompt: "Study of an imperial hunting falcon perched on a velvet gauntlet against gold foliage",
    ratio: "3:4",
    likes: 1120,
    asset: galleryImg3,
    h: 360,
    date: "20 Jul 2026",
  },
  {
    id: 10,
    title: "The Royal Library at Fatehpur",
    era: "Akbar",
    prompt: "Scholars, calligraphers and miniature painters illuminating manuscripts in the royal karkhana",
    ratio: "16:9",
    likes: 975,
    asset: galleryImg5,
    h: 250,
    date: "19 Jul 2026",
  },
];

export const MOCK_STATS: StatsItem[] = [
  { label: "Artworks Created", value: "14,832", icon: Grid, delta: "+12%" },
  { label: "Active Painters", value: "3,420", icon: Heart, delta: "+18%" },
  { label: "Royal Albums", value: "840", icon: Crown, delta: "+8%" },
  { label: "AI Creations Today", value: "1,294", icon: Sparkles, delta: "+24%" },
];

export const MOCK_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The court attire details and gold-leaf borders Empire & Ink generates are indistinguishable from 17th-century manuscripts in the Victoria & Albert Museum.",
    name: "Dr. Ayesha Rahman",
    role: "Curator of South Asian Art, London",
    avatar: "AR",
  },
  {
    quote:
      "As a digital artist working on historical fiction, this tool is my entire concept pipeline. The Jahangir-era lighting preset is magical.",
    name: "Vikram Mehta",
    role: "Concept Artist & Illustrator",
    avatar: "VM",
  },
  {
    quote:
      "We used Empire & Ink to illustrate our educational documentary on Mughal architecture. It brought Fatehpur Sikri to life effortlessly.",
    name: "Zainab Al-Husseini",
    role: "Documentary Filmmaker",
    avatar: "ZA",
  },
];

export const MOCK_COLLECTIONS: Collection[] = [
  {
    id: "durbar",
    title: "Imperial Durbars & Court Scenes",
    era: "Akbar & Jahangir",
    count: 14,
    description: "Grand ceremonial durbars, presenting of gifts, and imperial assemblies in Fatehpur Sikri and Agra.",
    cover: MOCK_ARTWORKS[0].asset,
    artworks: [MOCK_ARTWORKS[0], MOCK_ARTWORKS[3], MOCK_ARTWORKS[6], MOCK_ARTWORKS[7]],
  },
  {
    id: "hunts",
    title: "Royal Menagerie & Hunts",
    era: "Jahangir",
    count: 19,
    description: "Falconry studies, dusk hunting expeditions along the Yamuna, and imperial wildlife chronicles.",
    cover: MOCK_ARTWORKS[1].asset,
    artworks: [MOCK_ARTWORKS[1], MOCK_ARTWORKS[7], MOCK_ARTWORKS[2]],
  },
  {
    id: "gardens",
    title: "Shalimar & Zenana Gardens",
    era: "Shah Jahan",
    count: 11,
    description: "Kashmiri pleasure gardens, lotus hauz pavilions, and Empress Nur Jahan botanical studies.",
    cover: MOCK_ARTWORKS[4].asset,
    artworks: [MOCK_ARTWORKS[4], MOCK_ARTWORKS[2], MOCK_ARTWORKS[8]],
  },
  {
    id: "architecture",
    title: "The Shah Jahan Album",
    era: "Shah Jahan",
    count: 16,
    description: "Marble jali screens, golden throne chambers, and architectural monuments of Shahjahanabad.",
    cover: MOCK_ARTWORKS[6].asset,
    artworks: [MOCK_ARTWORKS[3], MOCK_ARTWORKS[4], MOCK_ARTWORKS[6], MOCK_ARTWORKS[8]],
  },
];

export const MOCK_HISTORY: HistoryItem[] = MOCK_ARTWORKS.map((art, idx) => ({
  ...art,
  timeGroup: idx < 2 ? "Today" : idx < 4 ? "Yesterday" : "Earlier This Week",
  timeAgo: art.date || "23 Jul 2026",
}));

export const MOCK_USER_PROFILE: UserProfile = {
  name: "Kishan",
  handle: "@kishan",
  email: "kishan@empireandink.art",
  bio: "Passionate about 17th-century Mughal miniature art, imperial durbars, and historical color palettes. Creating museum-grade AI miniatures in the tradition of Ustad Mansur.",
  tier: "PRO PLAN",
  creditsUsed: 89400,
  creditsTotal: 100000,
};

export const MOCK_USER_SETTINGS: UserSettings = {
  defaultEra: "Jahangir (1605–1627)",
  defaultStyle: "Court Scene",
  defaultRatio: "4:3",
  autoEnhance: true,
  highResUpscale: true,
  soundEffects: false,
};

export const MOCK_ERAS = [
  "Akbar (1556–1605)",
  "Jahangir (1605–1627)",
  "Shah Jahan (1627–1658)",
  "Aurangzeb (1658–1707)",
];

export const MOCK_STYLES = [
  "Court Scene",
  "Portrait",
  "Battle",
  "Hunt",
  "Nature Study",
  "Architecture",
];

export const MOCK_RATIOS = ["1:1", "4:3", "3:4", "16:9", "9:16"];

export const MOCK_GEN_LINES = [
  "Preparing the royal studio of Emperor Jahangir…",
  "Sketching the composition in the Mughal style…",
  "Laying down the colours — saffron, royal carmine, and gold…",
  "Painting the silk robes and fine court details…",
  "Adding the gold highlights to figures and borders…",
  "Finishing the miniature with a final flourish…",
];

export const MOCK_SAVED_PROMPTS = [
  "Emperor Akbar watching an elephant fight from the Agra Fort battlements, attendants shielding him with peacock fans",
  "A garden pavilion at night, Shah Jahan's queens playing Chaupar by candlelight, fireflies in the garden",
  "Mughal hunting party at dawn in the Rajputana hills, falconers on horseback crossing a river ford",
];
