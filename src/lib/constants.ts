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
};