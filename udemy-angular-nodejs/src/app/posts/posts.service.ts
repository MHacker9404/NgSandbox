import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    private _posts: Post[] = [];
    private _postSubject = new BehaviorSubject<Post[]>([]);

    constructor(private _httpClient: HttpClient) {}

    public getPosts(): void {
        this._httpClient
            .get<{ message: string; posts: any[] }>('http://localhost:5000/api/posts')
            .pipe(map((body) => body.posts.map((post) => ({ title: post.title, content: post.content, id: post._id }))))
            .subscribe((posts) => {
                this._posts = posts;
                console.log(this._posts);
                this._postSubject.next(this._posts.slice());
            });
    }

    public getPostsListener(): Observable<Post[]> {
        return this._postSubject.asObservable();
    }

    public addPost(title: string, content: string): void {
        const post: Post = { id: null, title: title, content: content };
        this._httpClient
            .post<{ message: string; posts: Post[] }>(`http://localhost:5000/api/posts`, post)
            .subscribe((body) => {
                this._posts = body.posts;
                this._postSubject.next(this._posts.slice());
            });
    }

    public deletePost(id: string): void {
        this._httpClient.delete(`http://localhost:5000/api/posts/${id}`).subscribe(() => console.log(`deleted`));
    }
}
