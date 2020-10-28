import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, subscribeOn, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root',
})
export class PostsService {
    private _data: { count: number; posts: Post[] } = { count: 0, posts: [] };
    private _postSubject = new BehaviorSubject<{ count: number; posts: Post[] }>({ count: 0, posts: [] });

    constructor(private _httpClient: HttpClient, private _router: Router) {}

    public getPosts(pageSize: number, page: number): void {
        const queryParams = `?pageSize=${pageSize}&page=${page}`;

        this._httpClient
            .get<{ message: string; count: number; posts: any[] }>(`http://localhost:5000/api/posts${queryParams}`)
            .pipe(
                tap((body) => console.info(body)),
                map((body) => ({
                    count: body.count,
                    posts: body.posts.map((post) => ({
                        id: post._id,
                        title: post.title,
                        content: post.content,
                        imagePath: post.imagePath,
                        creator: post.creator,
                    })),
                }))
            )
            .subscribe((data: any) => {
                this._data = data;
                this._postSubject.next({ ...this._data });
            });
    }

    public getPostsListener(): Observable<{ count: number; posts: Post[] }> {
        return this._postSubject.asObservable();
    }

    public getPost(id: string): Post {
        const post = this._data.posts.find((post) => post.id === id);
        return { ...post };
    }

    public addPost(title: string, content: string, image: File): void {
        const postData = new FormData();
        postData.append('title', title);
        postData.append('content', content);
        postData.append('image', image, title);

        this._httpClient.post<{ message: string; post: Post }>(`http://localhost:5000/api/posts`, postData).subscribe(() => {
            // const post = { id: body.post.id, title: title, content: content, imagePath: body.post.imagePath };
            // this._data._posts.push(post);
            // this._data.count += 1;
            // this._postSubject.next({ ...this._data });
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
            .subscribe(() => {
                // const post = this._data.posts.find((post) => post.id === id);
                // post.title = body.post.title;
                // post.content = body.post.content;
                // post.imagePath = body.post.imagePath;

                // this._postSubject.next({ ...this._data });

                this._router.navigate([`/`]);
            });
    }

    public deletePost(id: string): Observable<any> {
        ``;
        return this._httpClient.delete<{ message: string }>(`http://localhost:5000/api/posts/${id}`);
    }
}
