import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { initalToolbarDesign } from 'src/assets/constants';
import { base64UrlDecode } from 'src/utils';
import { ToolbarService } from './services/toolbar.service';
import { ToolbarContent, ToolbarDesign } from './types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private toolbarService: ToolbarService
  ) {}

  ngOnInit() {
    // this.generateInitalGraphData();
    // const customData = this.loadCustomData()
    // const initalData = customData ? customData :
    // const customToolbarContent = this.loadCustomData();
    // const initData = customToolbarContent
    //   ? customToolbarContent
    //   : initalToolbarContent;
    // this.generateInitalToolbarContent(initData);
    // this.generateForm(initData);
  }

  // private generateInitalGraphData(toolbarContent:ToolbarContent, toolbarDesign:ToolbarDesign) {
  //   if (this.route.snapshot.queryParamMap.has('data')) {
  //     const data = this.route.snapshot.queryParamMap.get('data');
  //     if (data) {
  //       const customData = base64UrlDecode(data).split(':::')[1];
  //       return this.toolbarService.toolbarDesign$.next(JSON.parse(customData));
  //     }
  //   }
  //   this.toolbarService.toolbarDesign$.next(initalToolbarDesign);
  // }

  // private loadCustomData() {
  //   const data = this.route.snapshot.queryParamMap.get('data');
  //   if (data) {
  //     const customData: ToolbarContent = JSON.parse(
  //       base64UrlDecode(data).split(':::')[0]
  //     );
  //     return customData;
  //   }
  //   return null;
  // }
}
