import { Injectable } from '@angular/core';
import { HttpService } from '../http/http-client-wrapper.service';
import { Observable, combineLatest, filter, from, map, take } from 'rxjs';
import { Artifact, BlocksEntity, Tag } from 'src/app/interfaces/stories.interface';
import { InShort, _Record, Compose, _Meta, SecRecord, _Document } from 'src/app/interfaces/record';

const PREFIX = 'api/v2';

@Injectable({
    providedIn: 'root',
})
export class ArtifactService {
    constructor(protected httpService: HttpService) {}

    public getArtifacts(): Observable<Artifact[]> {
        return this.httpService.get<Artifact[]>(`${PREFIX}/fetch`);
    }

    public getJournalForSignedInUser(): Observable<Artifact[]> {
        return this.httpService.get<Artifact[]>(`${PREFIX}/user/journal`);
    }

    public getArtifactsById(id: string): Observable<SecRecord> {
        return this.httpService.get<SecRecord>(`${PREFIX}/fetch/${id}`);
    }

    public getImageFromPublication(blocks: BlocksEntity[]): Observable<string[]> {
        return new Observable((observer) => {
            if (!blocks) {
                observer.next([]);
                observer.complete();
                return;
            }

            const imageUrls = blocks
                .filter((element) => element.type === 'image' && element.data?.file?.url)
                .map((element) => element.data?.file?.url)
                .filter((url): url is string => url !== undefined);

            observer.next(imageUrls || []);
            observer.complete();
        });
    }

    public janyHC(_old: BlocksEntity[], _new: BlocksEntity[]): void {
        this.getImageFromPublication(_old).subscribe((imgs) => {
            console.log(imgs);
        });

        combineLatest([this.getImageFromPublication(_old), this.getImageFromPublication(_new)]).subscribe(
            ([_old, _new]) => {
                const difference = [
                    ...new Set([..._old, ..._new].filter((item) => !_old.includes(item) || !_new.includes(item))),
                ];
                console.log(difference); // how to know which one is deleted and added when content replace?
            },
        );
    }

    public getContentFromPublication(blocks: BlocksEntity[]): Observable<string> {
        return from(blocks).pipe(
            filter((element) => element.type === 'paragraph'),
            map((element) => new DOMParser().parseFromString(element.data?.text || '', 'text/html').body.innerText),
            take(1),
        );
    }

    public postArtifact(record: Partial<_Record>): Observable<_Record> {
        console.log(record);
        return this.httpService.post<_Record, Partial<_Record>>(`${PREFIX}/publish`, record);
    }

    public deleteArtifact(id: string): Observable<unknown> {
        return this.httpService.delete(`${PREFIX}/remove/${id}`);
    }

    public updateArtifact(id: string, payload: Partial<_Record>): Observable<_Record> {
        return this.httpService.patch<_Record, Partial<_Record>>(`${PREFIX}/update/${id}`, payload);
    }

    public async postPublicationMapper(composer: Compose, _meta: {head: string; details: string}, poster: string | undefined, record: _Document, inShort: InShort[], tags: Tag[]): Promise<Partial<_Record>> {
        return new Promise<Partial<_Record>>((resolve, reject) => {
            try {
                const meta: _Meta = {
                    id: composer.draftId,
                    author: composer.author,
                    username: '',
                    poster: poster,
                    tags: tags,
                    imgs: composer.images,
                    createdDate: Number(new Date()),
                    modifiedDate: Number(new Date()),

                    head: _meta.head,
                    details: _meta.details,
                    meta: '',
                    cl: 0,
                };

                resolve({
                    record: record,
                    meta: meta,
                    inShort: inShort,
                });
            } catch (error) {
                reject(error);
            }
        });
    }
}
