import {
    AfterViewInit,
    ChangeDetectorRef,
    Component,
    ComponentFactoryResolver,
    ComponentRef,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
} from '@angular/core';
import { User } from './auth-form/auth-form.interface';
import { AuthFormComponent } from './auth-form/auth-form.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
    title = 'content-projection';
    @ViewChild('entry', { read: ViewContainerRef }) entry!: ViewContainerRef;
    component!: ComponentRef<AuthFormComponent>;
    // @ViewChild('entry') entry!: ViewContainerRef;
    @ViewChild('tmpl') tmpl!: TemplateRef<any>;

    items = [
        {
            name: 'Mark Hoppus',
            age: 44,
            location: 'California',
        },
        {
            name: 'Tom Delonge',
            age: 41,
            location: 'California',
        },
        {
            name: 'Travis Barker',
            age: 41,
            location: 'California',
        },
    ];

    constructor(private _resolver: ComponentFactoryResolver, private _cd: ChangeDetectorRef) {
        setTimeout(() => {
            this.items = [...this.items, { name: 'Matt Skiba', age: 40, location: 'California' }];
        }, 2000);
    }

    loginUser(user: User) {
        alert(`Login: ${JSON.stringify(user)}`);
    }

    ctx = {
        $implicit: 'Phil Boyd',
        location: 'Columbus GA',
    };

    ngAfterViewInit() {
        // const factory = this._resolver.resolveComponentFactory(AuthFormComponent);
        // this.entry.createComponent<AuthFormComponent>(factory);
        // this.component = this.entry.createComponent<AuthFormComponent>(factory, 0);
        // console.debug(this.component.instance);

        // this.component.instance.title = 'changed';
        // this.component.instance.submitted.subscribe(this.loginUser);

        // this.entry.createEmbeddedView(this.tmpl, { $implicit: 'Phil Boyd', location: 'Columbus, GA' });

        this._cd.detectChanges();
    }

    destroyComponent() {
        this.component.destroy();
    }

    moveComponent() {
        this.entry.move(this.component.hostView, 1);
    }

    // createUser(user: User) {
    //     alert(`Create account: ${JSON.stringify(user)}`);
    // }

    // onChecked(value: boolean) {
    //     alert(`checked: ${value}`);
    // }
}
