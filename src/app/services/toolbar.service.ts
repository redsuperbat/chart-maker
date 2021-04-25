import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import {
  initalToolbarContent,
  initalToolbarDesign,
} from 'src/assets/constants';
import { ToolbarContent, ToolbarDesign } from '../types';

@Injectable({
  providedIn: 'root',
})
export class ToolbarService {
  public toolbarDesign$ = new BehaviorSubject<ToolbarDesign>(
    initalToolbarDesign
  );
  public toolbarContent$ = new BehaviorSubject<ToolbarContent>(
    initalToolbarContent
  );
}
