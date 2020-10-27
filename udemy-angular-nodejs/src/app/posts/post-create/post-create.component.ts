import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { mimeTypeValidator } from './mime-type.validator';

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
    public imagePreview: string = null;

    public form: FormGroup;

    constructor(private _postSvc: PostsService, private _route: ActivatedRoute) {}

    ngOnInit(): void {
        this.form = new FormGroup({
            title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)], updateOn: 'change' }),
            content: new FormControl(null, { validators: [Validators.required], updateOn: 'change' }),
            image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeTypeValidator] }),
        });

        this._route.paramMap.subscribe((params: ParamMap) => {
            if (params.has('id')) {
                this._mode = 'edit';
                this._id = params.get('id');
                this.loading = true;
                this.post = this._postSvc.getPost(this._id);
                this.form.setValue({
                    title: this.post.title,
                    content: this.post.content,
                    image: this.post.imagePath,
                });
                this.loading = false;
            } else {
                this._mode = 'create';
                this._id = null;
            }
        });
    }

    public onImagePicked(evt: Event): void {
        const file = (evt.target as HTMLInputElement).files[0];
        this.form.patchValue({ image: file });
        this.form.get('image').updateValueAndValidity();

        // console.info(file);
        // console.info(this.form);

        const reader = new FileReader();
        reader.onload = () => {
            this.imagePreview = reader.result as string;
        };
        reader.readAsDataURL(file);
    }

    public onAddPost() {
        if (this.form.invalid) {
            return;
        }
        this.loading = true;

        this._mode === 'create'
            ? this._postSvc.addPost(this.form.value.title, this.form.value.content, this.form.value.image)
            : this._postSvc.updatedPost(this._id, this.form.value.title, this.form.value.content, this.form.value.image);

        this.form.reset();

        this.loading = false;
    }
}
