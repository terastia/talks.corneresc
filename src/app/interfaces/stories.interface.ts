

export interface BlocksEntity {
    data: Data;
    id: string;
    type: string;
}

interface Data {
    level?: number | null;
    text?: string | null;
    caption?: string | null;
    file?: File | null;
    stretched?: boolean | null;
    withBackground?: boolean | null;
    withBorder?: boolean | null;
    items?: string[] | null;
    style?: string | null;
    code?: string | null;
}

export interface File {
    url: string;
}

export interface Tag {
    name: string;
    url?: string;
}

export interface Highlights {
    author?: string;
    header?: string | null;
    content: string;
}

export interface PublishMeta extends Highlights {
    imgUrl?: string[] | string;
}

export interface Highlight extends Highlights {
    id: string;
    username?: string | undefined;
    content_length?: string;
    tag: Tag[];
    imgUrl?: string;
    time?: string;
}

export interface Post {
    id: string;
    createdDate: string;
    img: string;
    background: string;
    head: string;
    meta: string;
    details: string;

    shots: string[];

    tags: Tag[];
    author: string;
    forepart: string;
    backdrop: string;
    modifiedDate: number;
    cl: number;
}
