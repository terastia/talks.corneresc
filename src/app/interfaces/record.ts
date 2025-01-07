export interface _Document {
    blocks: BlocksEntity[];
    time: number;
    version: string;
}

export interface _Record {
    id: string;
    record: _Document;
    meta: _Meta;
    inShort?: InShort[];
}

/**
 * "SecRecord" (if "Permissions" implies security permissions)
 */
export interface SecRecord extends _Record {
    isEditable: boolean;
    isDelete: boolean;
}

export interface _Meta {
    id?: string;
    author: string;
    username: string;

    tags: Tag[];
    imgs: string[];
    createdDate: number;
    modifiedDate: number;
    poster?: string;

    head: string;
    meta?: string;
    details: string;

    cl?: number /* content length */;
}

export interface Journal {
    id: string;

    author: string;
    forepart: string;
    backdrop: string;
    createdDate: number;
    modifiedDate: number;

    head: string;
    meta: string;
    details: string;

    cl: number;
}

/**
 * no to expose interface. (for internal references)
 */

interface BlocksEntity {
    data: Data;
    id: string;
    type: string;
}

interface Data {
    level?: number | null;
    text?: string | null;
    caption?: string | null;
    file?: { url: string } | null;
    stretched?: boolean | null;
    withBackground?: boolean | null;
    withBorder?: boolean | null;
    items?: string[] | null;
    style?: string | null;
    code?: string | null;
}

interface Tag {
    name: string;
}

export interface InShort {
    head: string;
    content: string;
}

export interface Compose {
    header: string;
    description: string;
    draftId: string;
    tags: Tag[];
    article: _Document;
    images: string[];
    inShort: InShort[];

    author: string;
    editing: boolean;
}
