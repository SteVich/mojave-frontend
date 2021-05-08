import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotifierComponent} from "../common/notifier/notifier.component";

@Injectable({
  providedIn: 'root'
})
export class NotifierService {

  constructor(private snackBar: MatSnackBar) {
  }

  showNotification(displayMessage: string, messageType: 'error' | 'success', duration: number) {
    this.snackBar.openFromComponent(NotifierComponent, {
      data: {
        message: displayMessage,
        type: messageType
      },
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-container']
    });
  }
}
