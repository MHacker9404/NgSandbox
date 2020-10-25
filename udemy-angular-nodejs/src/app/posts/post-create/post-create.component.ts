import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
    selector: 'app-post-create',
    templateUrl: './post-create.component.html',
    styleUrls: ['./post-create.component.scss'],
})
export class PostCreateComponent implements OnInit {
    private _mode: string = 'create';
    private _id: string = null;
    public post: Post;
    public loading: Boolean = false;

    constructor(private _postSvc: PostsService, private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this._route.paramMap.subscribe((params: ParamMap) => {
            if (params.has('id')) {
                this._mode = 'edit';
                this._id = params.get('id');
                this.loading = true;
                this.post = this._postSvc.getPost(this._id);
                this.loading = false;
            } else {
                this._mode = 'create';
                this._id = null;
            }
        });
    }

    public onAddPost(form: NgForm) {
        if (form.invalid) {
            return;
        }
        this.loading = true;
        this._mode === 'create'
            ? this._postSvc.addPost(form.value.title, form.value.content)
            : this._postSvc.updatedPost(this._id, form.value.title, form.value.content);

        form.resetForm();
        this.loading = false;
    }
}
