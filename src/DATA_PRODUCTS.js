const labels = [
  {
    keyindex: 0,
    value: 0,
    label: "bint",
    isFS: false,
    requiresBlankFile: false,
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
    pixels: { ePixels: [307200], lPixels: [589824, 696320], pPixels: [518400, 691200] },
  },
  {
    keyindex: 2,
    value: 2,
    label: "hfsp",
    isFS: false,
    requiresBlankFile: true,
    pixels: { ePixels: [172360], lPixels: [425206], pPixels: [409610] },
  },
  {
    keyindex: 3,
    value: 3,
    label: "vsa",
    isFS: false,
    requiresBlankFile: true,
    pixels: { ePixels: [97344], lPixels: [230400], pPixels: [230400] },
  },
  {
    keyindex: 4,
    value: 4,
    label: "fsbi",
    isFS: true,
    requiresBlankFile: true,
    pixels: { ePixels: [307200], lPixels: [696320], pPixels: [691200] },
  },
];

module.exports = { data: labels };
