import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArtifactService } from '@services/stories/stories.service';

import { Observable, delay, map } from 'rxjs';
import { Artifact } from 'src/app/interfaces/stories.interface';

@Injectable({ providedIn: 'root' })
export class StoriesResolver
    implements Resolve<{ record: Observable<Artifact[]> }> {
    constructor(private _artifact: ArtifactService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): { record: Observable<Artifact[]> } {
        state;

        return {
            record: this._artifact.getArtifacts().pipe(
                map((res: Artifact[]) => {
                    console.log(res)
                    return res;
                }),
                delay(1000),
            ),
        };
    }
}
