import {Injectable, OnInit} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TaskEditorService implements OnInit {

  private showEditor: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);

  constructor(private router: Router) {
    router.events.subscribe(() => {
      this.setShowEditor(true);
    });
  }

  ngOnInit() {
  }

  getShowEditor() {
    return this.showEditor.asObservable();
  }

  setShowEditor(showHide: boolean) {
    this.showEditor.next(showHide);
  }

  toggleState() {
    this.showEditor.next(!this.showEditor.value);
  }

  isOpen() {
    return this.showEditor.value;
  }
}
