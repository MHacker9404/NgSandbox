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
            .pipe(
                map((body) =>
                    body.posts.map((post) => ({
                        title: post.title,
                        content: post.content,
                        id: post._id,
                        imagePath: post.imagePath,
                    }))
                )
            )
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

    public addPost(title: string, content: string, image: File): void {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);

        this._httpClient
            .post<{ message: string; post: Post }>(`http://localhost:5000/api/posts`, postData)
            .subscribe((body) => {
                const post = { id: body.post.id, title: title, content: content, imagePath: body.post.imagePath };
                this._posts.push(post);
                this._postSubject.next(this._posts.slice());
                this._router.navigate([`/`]);
            });
    }

    public updatedPost(id: string, title: string, content: string, image: File | string): void {
        let postData: any;
        if (typeof image === 'object') {
            postData = new FormData();
            postData.append('title', title);
            postData.append('content', content);
            postData.append('image', image, title);
        } else {
            postData = {
                id: id,
                title: title,
                content: content,
                imagePath: image,
            };
        }
        this._httpClient
            .patch<{ message: string; post: { _id: string; title: string; content: string } }>(
                `http://localhost:5000/api/posts/${postData.id}`,
                postData
            )
            .subscribe((body: any) => {
                const post = this._posts.find((post) => post.id === id);
                post.title = body.post.title;
                post.content = body.post.content;
                post.imagePath = body.post.imagePath;

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
