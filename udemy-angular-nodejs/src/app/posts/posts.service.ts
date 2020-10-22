import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    private _posts: Post[] = [];
    private _postSubject = new BehaviorSubject<Post[]>([]);

    constructor() {}

    public getPosts(): Post[] {
        const posts = this._posts.slice();
        return posts;
    }

    public getPostsListener(): Observable<Post[]> {
        return this._postSubject.asObservable();
    }

    public addPost(post: Post): void {
        this._posts.push(post);
        this._postSubject.next(this._posts.slice());
    }
}
