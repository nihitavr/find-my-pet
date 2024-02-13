import { env } from "~/env";

export const QR_CODE_ID_LENGTH = 12;

export const SERVER_URL = env.SERVER_URL;

export const WHATSAPP_URL = "https://wa.me/";

export const DEFAULT_MAX_PET_PROFILE_IMAGES = 5;

export const REGEX = {
  username: /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
  slug: /^[A-Za-z0-9-_]+$/,
  hexCode: /^#(?:[0-9a-fA-F]{3}){1,2}$/,
  youtubeURL: /^https:\/\/www.youtube.com\/|^https:\/\/youtube.com\/|^$/,
  twitterURL: /^https:\/\/www.twitter.com\/|^https:\/\/twitter.com\/|^$/,
  instagramURL: /^https:\/\/www.instagram.com\/|^https:\/\/instagram.com\/|^$/,
  instagramUsername: /^[A-Za-z0-9._]{1,30}$/,
  facebookURL: /^https:\/\/www.facebook.com\/|^https:\/\/facebook.com\/|^$/,
  githubURL: /^https:\/\/www.github.com\/|^https:\/\/github.com\/|^$/,
  emptyString: /^$/,
};

const PetBehaviourTagColors: any = {
  Vaccinated: "bg-green-100 text-green-800",
  Neat: "bg-green-100 text-green-800",
  Friendly: "bg-blue-100 text-blue-800",
  Cute: "bg-yellow-100 text-yellow-800",
  Calm: "bg-purple-100 text-purple-800",
  Playful: "bg-pink-100 text-pink-800",
  Active: "bg-red-100 text-red-800",
  Loyal: "bg-gray-100 text-gray-800",
  Protective: "bg-black text-white",
  Smart: "bg-blue-100 text-blue-800",
  Independent: "bg-green-100 text-green-800",
  Quiet: "bg-gray-100 text-gray-800",
  Loud: "bg-yellow-100 text-yellow-800",
  Energetic: "bg-red-100 text-red-800",
  Lazy: "bg-purple-100 text-purple-800",
  Aggressive: "bg-black text-white",
  Shy: "bg-blue-100 text-blue-800",
  Fearful: "bg-yellow-100 text-yellow-800",
  Anxious: "bg-red-100 text-red-800",
  Affectionate: "bg-pink-100 text-pink-800",
  Curious: "bg-green-100 text-green-800",
  Stubborn: "bg-gray-100 text-gray-800",
  Obedient: "bg-blue-100 text-blue-800",
  Mischievous: "bg-yellow-100 text-yellow-800",
  Destructive: "bg-red-100 text-red-800",
  Intelligent: "bg-purple-100 text-purple-800",
  Loving: "bg-pink-100 text-pink-800",
  Cuddly: "bg-green-100 text-green-800",
  Adventurous: "bg-yellow-100 text-yellow-800",
  Bold: "bg-black text-white",
  Sensitive: "bg-red-100 text-red-800",
  Clever: "bg-purple-100 text-purple-800",
  Brave: "bg-red-100 text-red-800",
  "Good with kids": "bg-blue-100 text-blue-800",
  "Bad with other pets": "bg-red-100 text-red-800",
  "Bad with kids": "bg-red-100 text-red-800",
  "Good with other pets": "bg-blue-100 text-blue-800",
  "Good with other dogs": "bg-blue-100 text-blue-800",
  "Bad with other dogs": "bg-red-100 text-red-800",
};

export const PetBehaviourTagsOptions = Object.keys(PetBehaviourTagColors).map(
  (tag: string) => ({
    label: tag,
    value: tag.toLowerCase().split(" ").join("_"),
    badgeClassname: PetBehaviourTagColors[tag],
  }),
);
