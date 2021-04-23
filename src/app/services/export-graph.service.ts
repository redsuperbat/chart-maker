import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExportGraphService {
  public onExportClick$ = new Subject();
}
