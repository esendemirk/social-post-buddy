import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { templateJitUrl } from '@angular/compiler';
//we know that response will be in JSON format
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class StudentService {

    constructor(private http:HttpClient) {}

    // CaptionsComponent
        // Uses http.get() to load data 
        getCaptions() {
            return this.http.get('http://localhost:8000/captions');
        }

        //Uses http.post() to post data 
        addCaptions(caption: string) {
            this.http.post('http://localhost:8000/captions',{ caption })
            .subscribe((responseData) => {
                console.log(responseData);
            }); 
            location.reload();
        }

        deleteCaption(captionId: string) {
            this.http.delete("http://localhost:8000/captions/" + captionId)
                .subscribe(() => {
                    console.log('Deleted: ' + captionId);
                });
                location.reload();
        }

        updateCaption(captionId: string,caption: string) {
            //request path http://localhost:8000/captions/5xbd456xx 
            //first and last names will be send as HTTP body parameters 
            this.http.put("http://localhost:8000/captions/" + 
            captionId,{ caption })
            .subscribe(() => {
                console.log('Updated: ' + captionId);
            });
        }

        //Uses http.get() to request data based on caption id 
        getCaption(captionId: string) {
            return this.http.get('http://localhost:8000/captions/'+ captionId);
        }
    
    // HashtagsComponent
        // Uses http.get() to load data 
        getHashtags() {
            return this.http.get('http://localhost:8000/hashtags');
        }

        //Uses http.post() to post data 
        addHashtags(hashtag: string) {
            this.http.post('http://localhost:8000/hashtags',{ hashtag })
            .subscribe((responseData) => {
                console.log(responseData);
            }); 
            location.reload();
        }

        deleteHashtag(hashtagId: string) {
            this.http.delete("http://localhost:8000/hashtags/" + hashtagId)
                .subscribe(() => {
                    console.log('Deleted: ' + hashtagId);
                });
                location.reload();
        }

        updateHashtag(hashtagId: string,hashtag: string) {
            //request path http://localhost:8000/hashtags/5xbd456xx 
            //first and last names will be send as HTTP body parameters 
            this.http.put("http://localhost:8000/hashtags/" + 
            hashtagId,{ hashtag })
            .subscribe(() => {
                console.log('Updated: ' + hashtagId);
            });
        }

        //Uses http.get() to request data based on hashtag id 
        getHashtag(hashtagId: string) {
            return this.http.get('http://localhost:8000/hashtags/'+ hashtagId);
        }

    // LocationsComponent
        // Uses http.get() to load data 
        getLocations() {
            return this.http.get('http://localhost:8000/locations');
        }

        //Uses http.post() to post data
        addLocations(location: string) {
            this.http.post('http://localhost:8000/locations',{ location })
            .subscribe((responseData) => {
                console.log(responseData);
            }); 
            window.location.reload();
        }

        deleteLocation(locationId: string) {
            this.http.delete("http://localhost:8000/locations/" + locationId)
                .subscribe(() => {
                    console.log('Deleted: ' + locationId);
                });
                location.reload();
        }

        updateLocation(locationId: string,location: string) {
            //request path http://localhost:8000/locations/5xbd456xx 
            //location will be send as HTTP body parameter
            this.http.put("http://localhost:8000/locations/" + 
            locationId,{ location })
            .subscribe(() => {
                console.log('Updated: ' + locationId);
            });
        }

        //Uses http.get() to request data based on location id 
        getLocation(locationId: string) {
            return this.http.get('http://localhost:8000/locations/'+ locationId);
        }

}