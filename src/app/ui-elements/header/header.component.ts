import { Component, OnInit } from '@angular/core';
import { ExportGraphService } from 'src/app/services/export-graph.service';

@Component({
  selector: 'cm-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private exportGraphService: ExportGraphService) {}

  ngOnInit(): void {}

  public handleExportClick() {
    this.exportGraphService.onExportClick$.next();
  }
}
