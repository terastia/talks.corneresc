import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArtifactService } from '@services/stories/stories.service';

import { Observable, delay, map, take } from 'rxjs';
import { Post } from 'src/app/interfaces/stories.interface';

@Injectable({ providedIn: 'root' })
export class HomeResolver
    implements Resolve<{ record: Observable<Post[]> }> {
    constructor(private _artifact: ArtifactService) { }
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): { record: Observable<Post[]> } {
        state;

        return {
            record: this._artifact.getArtifacts().pipe(
                delay(1000),
                take(2)
            ),
        };
    }
}
