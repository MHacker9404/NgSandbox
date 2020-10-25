import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
    public posts$: Observable<Post[]>;
    public loading: Boolean = false;

    constructor(private _postSvc: PostsService) {}

    ngOnInit(): void {
        this.posts$ = this._postSvc.getPostsListener();
        this.loading = true;
        this._postSvc.getPosts();
        this.loading = false;
    }

    onDelete(id: string): void {
        this.loading = true;
        this._postSvc.deletePost(id);
        this.loading = false;
    }

    ngOnDestroy(): void {}
}
