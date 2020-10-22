import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
    constructor() {}

    public newPost: string = '';
    public enteredValue: string = '';

    ngOnInit(): void {
        this.newPost = 'Please enter content';
    }

    /*
    onAddPost(postInput: HTMLTextAreaElement): void {
        console.log(postInput);
        console.dir(postInput);

        this.newPost = postInput.value;
    }
    */
    public onAddPost() {
        this.newPost = this.enteredValue;
    }
}
