import { Injectable } from '@angular/core';
import { getApp } from 'firebase/app';
import {
  GoogleAIBackend,
  getAI,
  getGenerativeModel,
  type ChatSession,
} from 'firebase/ai';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ChatService {
  readonly setupError: string;

  private readonly chatSession: ChatSession | null;

  constructor() {
    if (
      !environment.firebase.apiKey ||
      !environment.firebase.projectId ||
      !environment.firebase.appId
    ) {
      this.setupError =
        'Completa firebase config en environment.ts y environment.prod.ts';
      this.chatSession = null;
      return;
    }

    try {
      const app = getApp();
      const ai = getAI(app, { backend: new GoogleAIBackend() });
      const model = getGenerativeModel(ai, {
        model: environment.ai.model,
      });

      this.chatSession = model.startChat();
      this.setupError = '';
    } catch (error) {
      this.chatSession = null;
      this.setupError = this.toErrorMessage(error);
    }
  }

  get isReady(): boolean {
    return !!this.chatSession && !this.setupError;
  }

  async sendMessage(prompt: string): Promise<string> {
    if (!this.chatSession) {
      throw new Error(this.setupError || 'Chat no inicializado.');
    }

    try {
      const streamResult = await this.chatSession.sendMessageStream(prompt);
      let text = '';

      for await (const chunk of streamResult.stream) {
        text += chunk.text();
      }

      return text.trim() ? text : 'Sin respuesta de texto del modelo.';
    } catch (error) {
      throw new Error(this.toErrorMessage(error));
    }
  }

  private toErrorMessage(error: unknown): string {
    if (error instanceof Error) {
      return `Error: ${error.message}`;
    }

    return 'Error inesperado al consultar Firebase AI Logic.';
  }
}