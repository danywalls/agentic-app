import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '@progress/kendo-angular-conversational-ui';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { BOT, USER } from '../entities/models';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class GenkitService {
  private http = inject(HttpClient);

  public messages = signal<Message[]>([
    {
      id: Date.now(),
      author: BOT,
      text: 'Hello! Ask me about order status (e.g., for order 123-456).',
      timestamp: new Date()
    },
  ]);

  public sendMessage(text: string): void {
    const userMessage: Message = {
      id: Date.now(),
      author: USER,
      text,
      timestamp: new Date()
    };

    this.messages.update((current) => [...current, userMessage]);

    const payload = { data: text };

    this.http.post(`${environment.API}/orderFlow`, payload, { responseType: 'text' })
      .pipe(
        catchError(() => {

          this.messages.update((current) => [...current, {
            id: Date.now(),
            author: BOT,
            text: 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date(),
          }]);
          return EMPTY;
        })
      )
      .subscribe((response) => {
        this.messages.update((current) => [...current, {
          id: Date.now(),
          author: BOT,
          text: response || 'No response received',
          timestamp: new Date(),
        }]);
      });
  }
}
