import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
import { Post } from "./post.model";


@Injectable({providedIn:'root'})

export class PostService {
    constructor(private http:HttpClient ) {}

    createAndStorePost(userName:string,userEmail:string) {
        const postData: Post = {userName:userName,userEmail:userEmail};
        return this.http.post<{name:string}>('https://recipe-book-6e2aa-default-rtdb.firebaseio.com/posts.json',postData);
    }

    fetchPost() {
        return this.http.get<{ [key:string]:Post }>('https://recipe-book-6e2aa-default-rtdb.firebaseio.com/posts.json')
        .pipe( map(ResponseData => {
            const PostData:Post[] = [];
            for ( const key in ResponseData ) {
                PostData.push( {...ResponseData[key],id:key} )
            }
            return PostData;
        }));
    }

    clearData() {
        return this.http.delete('https://recipe-book-6e2aa-default-rtdb.firebaseio.com/posts.json');
    }
}