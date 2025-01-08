import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Data, RouterModule } from '@angular/router';
import { Observable, delay, map } from 'rxjs';
import { Post } from 'src/app/interfaces/stories.interface';

@Component({
  selector: 'stories',
  imports: [CommonModule, RouterModule],
  templateUrl: './stories.component.html',
  styles: ``
})
export class StoriesComponent implements OnInit {
  _route = inject(ActivatedRoute);

  public post$!: Observable<Post[]>;

  ngOnInit(): void {
    this._route.data.subscribe(({ data }: Data) => {
      const fact = data as { record: Observable<Post[]> };
      this.post$ = fact.record;
      // do something with your resolved data ...
      fact.record.subscribe({
          complete: () => console.log('loaded')
        });
    });
  }

}
