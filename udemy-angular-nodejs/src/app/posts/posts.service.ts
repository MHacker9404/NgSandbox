import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    private _posts: Post[] = [];
    private _postSubject = new BehaviorSubject<Post[]>([]);

    constructor(private _httpClient: HttpClient, private _router: Router) {}

    public getPosts(): void {
        this._httpClient
            .get<{ message: string; posts: any[] }>('http://localhost:5000/api/posts')
            .pipe(map((body) => body.posts.map((post) => ({ title: post.title, content: post.content, id: post._id }))))
            .subscribe((posts: Post[]) => {
                this._posts = posts;
                // console.info(this._posts);
                this._postSubject.next(this._posts.slice());
            });
    }

    public getPostsListener(): Observable<Post[]> {
        return this._postSubject.asObservable();
    }

    public getPost(id: string): Post {
        const post = this._posts.find((post) => post.id === id);
        return { ...post };
    }

    public addPost(title: string, content: string): void {
        const post: Post = { id: null, title: title, content: content };
        this._httpClient.post<{ message: string; id: string }>(`http://localhost:5000/api/posts`, post).subscribe((body) => {
            // console.info(body);
            post.id = body.id;
            this._posts.push(post);
            // console.info(this._posts);
            this._postSubject.next(this._posts.slice());

            this._router.navigate([`/`]);
        });
    }

    public updatedPost(id: string, title: string, content: string): void {
        const post: Post = { id: id, title: title, content: content };
        this._httpClient
            .patch<{ message: string; post: { _id: string; title: string; content: string } }>(
                `http://localhost:5000/api/posts/${post.id}`,
                post
            )
            .subscribe((body: any) => {
                // console.info(body);

                const post = this._posts.find((post) => post.id === id);
                post.title = body.post.title;
                post.content = body.post.content;

                this._postSubject.next(this._posts.slice());

                this._router.navigate([`/`]);
            });
    }

    public deletePost(id: string): void {
        this._httpClient.delete<{ message: string }>(`http://localhost:5000/api/posts/${id}`).subscribe((response) => {
            // console.info(response);

            const posts = this._posts.filter((post) => post.id !== id);
            this._posts = [...posts];
            this._postSubject.next(this._posts.slice());
        });
    }
}
