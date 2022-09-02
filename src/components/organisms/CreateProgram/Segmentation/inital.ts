export const noticeUploadDataInitial = {
    label: "Please take look this note before uploading your file",
    listCondition: [
        "File extention must be in .csv or .txt",
        "Data must be MSISDN and Counter only",
        "MSISDN must begin with 628xxxxx",
        "Each MSISDN must be align in 1 row ( 1 row 1 MSISDN )"
    ]
}

export const segmentationOptionInitial = [
    {
        _id: "1",
        type: "whitelist",
        filename: "",
    },
    {
        _id: "2",
        type: "blacklist",
        filename: ""
    },
];
