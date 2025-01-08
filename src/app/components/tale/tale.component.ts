import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { delay, map, Observable } from 'rxjs';
import { SecRecord } from 'src/app/interfaces/record';

import EditorJS from '@editorjs/editorjs';
import { ActivatedRoute, Data, RouterLink, RouterModule, RouterOutlet } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { toolsConfig } from 'src/app/lib/editor/editor.config';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tale',
  imports: [CommonModule, RouterModule],
  templateUrl: './tale.component.html',
  styles: ``
})
export class TaleComponent {
  public post!: SecRecord | undefined;
  public editor!: EditorJS;
  public secRecord!: Observable<SecRecord>;

  _route = inject(ActivatedRoute);
  _title = inject(Title);

  @ViewChild('editorjs') div!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this._route.data.subscribe(({ data }: Data) => {
        const post = data as { record: Observable<SecRecord> };
        this.secRecord = post.record;
        // do something with your resolved data ...
        post.record
            .pipe(
                delay(1000),
                map((res) => {
                    this.post = res;
                    this.editor = new EditorJS({
                        holder: 'editorjs',
                        autofocus: false,
                        readOnly: true,
                        tools: toolsConfig,
                        data: res.record,
                    });

                    this._title.setTitle(res.meta.head);
                }),
            )
            .subscribe();
    });
}
}
