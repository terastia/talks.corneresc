import { inject, Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ArtifactService } from '@services/stories/stories.service';
import { Observable, delay, map } from 'rxjs';
import { SecRecord } from 'src/app/interfaces/record';

@Injectable({ providedIn: 'root' })
export class TaleResolver
    implements Resolve<{ record: Observable<SecRecord> }> {
        _artifact = inject(ArtifactService);
        
    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): { record: Observable<SecRecord> } {
        state;

        const id = route.queryParams['page'] as string;
        return {
            record: this._artifact.getArtifactsById(id).pipe(
                map((res: SecRecord) => {
                    return res;
                }),
                delay(1000),
            ),
        };
    }
}
