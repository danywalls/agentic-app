import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Message } from '@progress/kendo-angular-conversational-ui';
import { catchError, finalize } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

const GENKIT_API_URL = 'http://localhost:3400/api/flows/orderSupportFlow';
const BOT = { id: 0, name: 'Agent' };

interface GenkitResponse {
  result: string;
}

@Injectable({ providedIn: 'root' })
export class GenkitService {
  private http = inject(HttpClient);
  
  public loading = signal(false);
  private _response = signal<Message | null>(null);
  
  public response = computed(() => this._response());

  public resetResponse(): void {
    this._response.set(null);
  }

  public sendMessage(text: string): void {
    this.loading.set(true);
    this._response.set(null);

    const payload = { data: text };

    const headers = {
      'Content-Type': 'application/json',
    };

    this.http.post<GenkitResponse>(GENKIT_API_URL, payload, { headers })
      .pipe(
        catchError((error) => {
          this._response.set({
            author: BOT,
            text: 'Sorry, I encountered an error. Please try again.',
            timestamp: new Date(),
          });
          return EMPTY;
        }),
        finalize(() => {
          this.loading.set(false);
        })
      )
      .subscribe((response) => {
        this._response.set({
          author: BOT,
          text: response.result || 'No response received',
          timestamp: new Date(),
        });
      });
  }
}
