const PLATFORM =  [
    {
        keyindex:  0,
        value: "elevator",
        label: "elevator",
    },
    {
        keyindex:  1,
        value: "lobby",
        label: "lobby",
    }
]

module.exports = {data: PLATFORM}

/*
    video is disabled when:
        BINT, FSBI, HFSP
    image is disabled when:
        VSA
    only FSA takes both image and video

*/