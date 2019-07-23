import {
  Component,
  NgModule,
  OnInit,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from 'src/app/shared/shared.module';

@Component({
  selector: 'ngs-newsletter',
  template: `
    <fieldset class="newsletter">
      <legend>Newsletter</legend>

      <h5>Hello {{ firstName }}, enter your email below to subscribe:</h5>

      <form>
        <input
          #email
          type="email"
          name="email"
          placeholder="Enter your Email"
        />
        <input
          type="button"
          class="button button-primary"
          value="Subscribe"
          (click)="subscribeToNewsletter(email)"
        />
      </form>
    </fieldset>
  `,
  styleUrls: ['./newsletter.component.scss'],
  })
export class NewsletterComponent implements OnInit {
  @Input()
  firstName: string;

  @Output()
  subscribe = new EventEmitter();

  constructor() {}

  subscribeToNewsletter(emailField) {
    this.subscribe.emit(emailField.value);
    emailField.value = '';
  }

  ngOnInit() {}
}

@NgModule({
  declarations: [NewsletterComponent],
  imports: [CommonModule, SharedModule],
  exports: [NewsletterComponent],
  })
export class NewsletterModule {}
