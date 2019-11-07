import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ChatService} from "../chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  form: FormGroup;

  error: string;
  loading: boolean;

  constructor(private formBuilder: FormBuilder, private chatService: ChatService) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      text: [
        '',
        [
          Validators.required,
          Validators.maxLength(1000),
        ]
      ],
    });
  }

  get f() {
    return this.form.controls;
  }

  async send() {
    if (this.form.invalid) {
      return;
    }

    this.loading = true;

    await this.chatService.sendMessage(this.form.controls.text.value);

    this.form.reset();

    this.loading = false;
  }
}
