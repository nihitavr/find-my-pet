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
  Lazy: "bg-purple-100 text-purple-800",
  Energetic: "bg-red-100 text-red-800",
  Shy: "bg-blue-100 text-blue-800",
  Affectionate: "bg-pink-100 text-pink-800",
  Cuddly: "bg-yellow-100 text-yellow-800",
  Adventurous: "bg-green-100 text-green-800",
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
