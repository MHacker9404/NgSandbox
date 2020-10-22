import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
    constructor(private _postSvc: PostsService) {}

    ngOnInit(): void {}
    public onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }

        const post: Post = {
            title: form.value.title,
            content: form.value.content,
        };
        this._postSvc.addPost(post);

        form.resetForm();
    }
}
