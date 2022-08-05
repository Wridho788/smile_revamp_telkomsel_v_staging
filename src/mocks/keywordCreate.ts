export interface Root {
    label: string,
    child: any,
}

export interface ChildRoot {
    id: number
    label: string
}

export const keywordCreateBonus: Root[] = [
    {
        label: 'Type',
        child: ["Type 1", "Type 2", "Type 3"]
    },
    {
        label: 'Bucket',
        child: ["Type 1", "Type 2", "Type 3"]
    },
    {
        label: 'Quantity',
        child: ["Type 1", "Type 2", "Type 3"]
    },
    {
        label: 'Granular',
        child: ["Type 1", "Type 2", "Type 3"]
    },
    {
        label: 'Bid',
        child: ["Type 1", "Type 2", "Type 3"]
    },
    {
        label: 'Root',
        child: ["Type 1", "Type 2", "Type 3"]
    },
]

export const keywordCreateNotification: Root[] = [
    {
        label: 'Via',
        child: ["Type 1", "Type 2", "Type 3"]
    },
    {
        label: 'Type',
        child: ["Type 1", "Type 2", "Type 3"]
    },
    {
        label: 'Template',
        child: ["Type 1", "Type 2", "Type 3"]
    },
    {
        label: 'Transaction Type',
        child: ["Type 1", "Type 2", "Type 3"]
    },
]