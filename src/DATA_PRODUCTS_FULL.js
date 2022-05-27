const products = [
   
    {
        keyindex: 0,
        value: "e-bint",
        product: "e-bint",
        label: "E-BINT",
        productShortName: "bint",
        eOrL: "e",
        eWidth: 130,
        eHeight: 457,
        numberAssets: 1,
        maxFileSize: 3000,
        isFullScreen: false,
        isElevator: true,
        requiresBlankFile: false,
        requiresSVG: false,
        allowImage: true,
        allowVideo: false
    },
   
    {
        keyindex: 1,
        value: "e-fsa",
        product: "e-fsa",
        label: "E-FSA",
        productShortName: "fsa",
        eOrL: "e",
        eWidth: 640,
        eHeight: 480,
        numberAssets: 1,
        maxFileSize: 3000,
        isFullScreen: true,
        isElevator: true,
        requiresBlankFile: false,
        requiresSVG: false,
        allowImage: true,
        allowVideo: true
        
    },
   
    {
        keyindex: 2,
        value: "e-hfsp",
        product: "e-hfsp",
        label: "E-HFSP",
        productShortName: "hfsp",
        eOrL: "e",
        eWidth: 982,
        eHeight: 433,
        numberAssets: 1,
        maxFileSize: 3000,
        isFullScreen: false,
        isElevator: true,
        requiresBlankFile: true,
        requiresSVG: false,
        allowImage: true,
        allowVideo: true
    },
   
    {
        keyindex: 3,
        value: "e-vsa",
        product: "e-vsa",
        label: "E-VSA",
        productShortName: "vsa",
        eOrL: "e",
        eWidth: 234,
        eHeight: 416,
        numberAssets: 1,
        maxFileSize: 3000,
        isFullScreen: false,
        isElevator: true,
        requiresBlankFile: true,
        requiresSVG: false,
        allowImage: true,
        allowVideo: true
    },
   
    {
        keyindex: 4,
        value: "e-fsbi",
        product: "e-fsbi",
        label: "E-FSBI",
        productShortName: "fsbi",
        eOrL: "e",
        eWidth: 640,
        eHeight: 480,
        numberAssets: 1,
        maxFileSize: 3000,
        isFullScreen: true,
        isElevator: true,
        requiresBlankFile: true,
        requiresSVG: true,
        allowImage: true,
        allowVideo: false
    }
]

module.exports = {data: products}