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
    public posts: Post[] = [];
    // private _postsListener: Subscription;
    // private _unsubscribe: Subject<any> = new Subject();

    public posts$: Observable<Post[]>;

    constructor(private _postSvc: PostsService) {}

    ngOnInit(): void {
        // this._postSvc
        //     .getPostsListener()
        //     .pipe(takeUntil(this._unsubscribe))
        //     .subscribe((posts: Post[]) => (this.posts = posts));
        this.posts$ = this._postSvc.getPostsListener();
        this._postSvc.getPosts();
    }

    ngOnDestroy(): void {
        // this._unsubscribe.next();
        // this._unsubscribe.complete();
    }
}
