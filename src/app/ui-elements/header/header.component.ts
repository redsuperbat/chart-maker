import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { withLatestFrom } from 'rxjs/operators';
import { ExportGraphService } from 'src/app/services/export-graph.service';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { base64UrlEncode } from 'src/utils';
import { SubscriptionCollection, unsubscribeCollection } from 'src/utils';

@Component({
  selector: 'cm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private exportGraphService: ExportGraphService,
    private toolbarService: ToolbarService
  ) {}
  public onShareClick$ = new Subject<void>();
  public onExportClick$ = new Subject<void>();
  private subs: SubscriptionCollection = {};

  ngOnInit(): void {
    this.subs.onExport = this.onExportClick$.subscribe(
      this.exportGraphService.onExportClick$
    );
    this.subs.onShare = this.onShareClick$
      .pipe(
        withLatestFrom(
          this.toolbarService.toolbarContent$,
          this.toolbarService.toolbarDesign$
        )
      )
      .subscribe(([, content, design]) => {
        const data = `${JSON.stringify(content)}:::${JSON.stringify(design)}`;
        console.log(base64UrlEncode(data));
      });
  }
  ngOnDestroy() {
    unsubscribeCollection(this.subs);
  }
}
