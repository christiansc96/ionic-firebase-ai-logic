import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonInput,
  IonItem,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { ChatService } from './chat.service';

type MessageRole = 'user' | 'model' | 'system';

interface ChatMessage {
  role: MessageRole;
  text: string;
}

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  imports: [
    CommonModule,
    FormsModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonItem,
    IonInput,
    IonButton,
    IonSpinner,
  ],
})
export class ChatPage {
  prompt = '';
  sending = false;
  readonly setupError: string;

  messages: ChatMessage[] = [
    {
      role: 'system',
      text: 'Listo. Escribe un mensaje para comenzar.',
    },
  ];

  constructor(private readonly chatService: ChatService) {
    this.setupError = this.chatService.setupError;
  }

  async sendMessage(): Promise<void> {
    const input = this.prompt.trim();
    if (!input || this.sending || !this.chatService.isReady) {
      return;
    }

    this.messages.push({ role: 'user', text: input });
    this.prompt = '';
    this.sending = true;

    const assistantMessage: ChatMessage = { role: 'model', text: '' };
    this.messages.push(assistantMessage);

    try {
      assistantMessage.text = await this.chatService.sendMessage(input);
    } catch (error) {
      this.messages.pop();
      this.messages.push({
        role: 'system',
        text: error instanceof Error ? error.message : 'Error inesperado.',
      });
    } finally {
      this.sending = false;
    }
  }
}
