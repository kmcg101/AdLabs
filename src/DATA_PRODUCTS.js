const labels = [
  {
    keyindex: 0,
    value: 0,
    label: "bint",
    isFS: false,
    requiresBlankFile: false,
    acceptedSizeText: { eSizes: "130x457", lSizes: "160x640", pSizes: "672x210" },
    pixels: {
      ePixels: [59410],
      lPixels: [102400],
      pPixels: [141120],
    },
  },
  {
    keyindex: 1,
    value: 1,
    label: "fsa",
    isFS: true,
    requiresBlankFile: false,
    acceptedSizeText: { eSizes: "640x480", lSizes: "1024x680, 1024x576", pSizes: "720x960 img, 540x960 vid" },
    pixels: { ePixels: [307200], lPixels: [589824, 696320], pPixels: [518400, 691200] },
  },
  {
    keyindex: 2,
    value: 2,
    label: "hfsp",
    isFS: false,
    requiresBlankFile: true,
    acceptedSizeText: { eSizes: "620x278", lSizes: "982x433", pSizes: "672x610" },
    pixels: { ePixels: [172360], lPixels: [425206], pPixels: [409610] },
  },
  {
    keyindex: 3,
    value: 3,
    label: "vsa",
    isFS: false,
    requiresBlankFile: true,
    acceptedSizeText: { eSizes: "234x416", lSizes: "360x640", pSizes: "360x640" },
    pixels: { ePixels: [97344], lPixels: [230400], pPixels: [230400] },
  },
  {
    keyindex: 4,
    value: 4,
    label: "fsbi",
    isFS: true,
    requiresBlankFile: true,
    acceptedSizeText: { eSizes: "640x480", lSizes: "1024x680", pSizes: "720x960" },
    pixels: { ePixels: [307200], lPixels: [696320], pPixels: [691200] },
  },
];

module.exports = { data: labels };
