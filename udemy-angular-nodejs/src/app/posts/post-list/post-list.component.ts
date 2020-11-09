import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { Post } from '../post.model';
import { PostsService } from '../posts.service';
import { PageEvent } from '@angular/material/paginator';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
    selector: 'app-post-list',
    templateUrl: './post-list.component.html',
    styleUrls: ['./post-list.component.scss'],
})
export class PostListComponent implements OnInit, OnDestroy {
    public isAuthenticated$: Observable<boolean>;
    public posts$: Observable<{ count: number; posts: Post[] }>;
    public loading: Boolean = false;
    public pageSize: number = 2;
    public page: number = 1;
    public pageSizeOptions: number[] = [1, 2, 5, 10];

    constructor(private _postSvc: PostsService, private _authSvc: AuthService) {
        this.isAuthenticated$ = this._authSvc.isAuthenticated$;
        this.posts$ = this._postSvc.getPostsListener();
    }

    ngOnInit(): void {
        this.loading = true;
        this._postSvc.getPosts(this.pageSize, this.page);
        this.loading = false;
    }

    onDelete(id: string): void {
        this.loading = true;
        this._postSvc.deletePost(id).subscribe(() => {
            this._postSvc.getPosts(this.pageSize, this.page);
            this.loading = false;
        });
    }

    ngOnDestroy(): void {}

    public onChangedPage(pageData: PageEvent) {
        this.pageSize = pageData.pageSize;
        this.page = pageData.pageIndex + 1;

        this._postSvc.getPosts(this.pageSize, this.page);
    }
}
