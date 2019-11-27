// @flow
export  type IDType= string;
export type UserIDType= string;
export type AttachmentType={
    path:string,
    description:string,
    url:?string
}

export type BoxType= {
    destinationRoom: string,
    name: string,
    contents: ?string[]
}

export type MoveType= {
    userID:UserIDType,
    date:Date,
    destinationName:string,
    fromName:string,
    name:string,
    boxes:{}
}
export type MoveUpdateType= {
    date: Date,
    destinationName: string,
    fromName: string,
    name: string,
}


export type UserType={
    name:string,
    avatar:string,
    email:string,
    emailVerified:boolean,
    created:string,
    lastSignOn:string
}

export type MoveCursorType={
    limit:number,
    last:?string,
    moves:?MoveType[]
}

export type ProviderType={
    name: string,
    providerInfo: ?any
}