import {Component, Injectable, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {SideNavDirection} from "../common/components/side-nav/side-nav-direction";
import {TaskEditorService} from "../service/task-editor.service";

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-task-editor',
  templateUrl: './task-editor.component.html',
  styleUrls: ['./task-editor.component.scss']
})
export class TaskEditorComponent implements OnInit {

  showEditor: Observable<boolean>;

  constructor(private editorService: TaskEditorService) {
  }

  ngOnInit(): void {
    this.showEditor = this.editorService.getShowEditor();
  }

  getEditorStyle(showNav: boolean) {
    let style: any = {};

    let width = 40;
    style.width = width + 'rem';
    style[SideNavDirection.Right] = (showNav ? 0 : (width * -1)) + 'rem';

    return style;
  }

  onEditorClose() {
    this.editorService.setShowEditor(false);
  }

  textAreaAutoGrow(){
    let  textArea = document.getElementById("task-title-input")
    textArea.style.overflow = 'hidden';
    textArea.style.height = '0px';
    textArea.style.height = textArea.scrollHeight + 'px';
  }
}
