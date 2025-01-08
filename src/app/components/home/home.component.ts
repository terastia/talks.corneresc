import { CommonModule, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, Data, RouterLink } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { Post } from 'src/app/interfaces/stories.interface';

@Component({
  selector: 'home',
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html',
})
export class HomeComponent {
_route = inject(ActivatedRoute);

  public post$!: Observable<Post[]>;

  ngOnInit(): void {
    this._route.data.subscribe(({ data }: Data) => {
      const fact = data as { record: Observable<Post[]> };
      this.post$ = fact.record.pipe(map((x) => x.slice(0, 2)));
      // do something with your resolved data ...
      fact.record.subscribe({
          complete: () => console.log('loaded')
        });
    });
  }
}
