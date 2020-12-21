import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AuthFormModule } from './auth-form/auth-form.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreditCardDirective } from './credit-card/credit-card.directive';
import { TooltipDirective } from './tooltip/tooltip.directive';
import { MyForDirective } from './my-for/my-for.directive';

@NgModule({
    declarations: [AppComponent, CreditCardDirective, TooltipDirective, MyForDirective],
    imports: [BrowserModule, AppRoutingModule, AuthFormModule, BrowserAnimationsModule],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
