const MEDIA_TYPE =  [
    {
        keyindex:  0,
        value: "video",
        label: "MP4 video",
    },
    {
        keyindex:  1,
        value: "image",
        label: "PNG or JPG",
    }
]

module.exports = {data: MEDIA_TYPE}

/*
    video is disabled when:
        BINT, FSBI, HFSP
    image is disabled when:
        VSA
    only FSA takes both image and video

*/