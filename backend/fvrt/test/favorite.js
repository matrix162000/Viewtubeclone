const chai = require('chai')
const chaiHttp = require('chai-http');
const app = require('../server');
chai.should();
chai.use(chaiHttp);



describe('Favorite API Testing',()=>{

    
    // GET BOOKS BASED ON AUTHOR NAME
    describe("1- Identify user and return response /api/favorite/getFavorite", () => {
        it("return response", (done) => {
            chai.request(app)
                .get("/api/favorite/getFavorite")
                .query({
                    userid:"d5fe7f34-fe08-457c-83b3-10f22590d0bd"
                })
                .end((err, res) => {
                    
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   const obj = res.body;
                   Object.keys(obj).length.should.be.eql(4);
                    done();
                });
        });

        it("2- Incorrect user id", (done) => {
            chai.request(app)
                .get("/api/favorite/getFavorite")
                .query({
                    //passing incorrect user id
                    userid: "d5fe7f34-fe08-457c-83b3-10f225b"
                })
                .end((err, res) => {
                   res.should.have.status(404);
                    done();
                });
        });
    });

    it("3- return favroite video of a particular user", (done) => {
        chai.request(app)
            .get("/api/favorite/getFavorite")
            .query({
                userid: "d5fe7f34-fe08-457c-83b3-10f22590d0bd",
            })
            .end((err, res) => {
                
               res.should.have.status(200);
               res.body.should.be.a('object');
               const arr = res.body.favoriteVideoArr;
               const objInsideArr = arr[1];
               arr.should.be.a('array');
                done();
            });
    });

    //add
    describe("4) user added a video in favoriteList /api/favorite/addToFavorite", () => {
        it("Add Book to Favorite", (done) => {
            let favoriteVideo= {
                "userid":"18c1e498-3a50-463b-8833-59dbf3ec873d",

                favoriteVideo: {
                  
                    "videoId": "pudjtL6yiOs",
                    "title": "Tom&Jerry🥰 sayoo&anvi  |sangeethkumar#shorts",
                    "channelTitle": "Sangeeth Kumar"  
                }
            }
            chai.request(app)
                .post("/api/favorite/addToFavorite")
                .send(favoriteVideo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eql("Video Added To Favorite Successfully");
                    done();
                });

        });
    });
    
    describe("5- passing wrong url /api/favorite/addToFavorite", () => {
        it("Add Book to Favorite", (done) => {
            let favoriteVideo= {
                "userid":  "d5fe7f34-fe08-457c-83b3-10f22590b",

                favoriteVideo: {
                  
                    "videoId": "pudjtL6yiOs",
                    "title": "Tom&Jerry🥰 sayoo&anvi  |sangeethkumar#shorts",
                    "channelTitle": "Sangeeth Kumar"  
                }
            }
            chai.request(app)
            //passing wrong url
                .post("/api/favorite/addFavorite")
                .send(favoriteVideo)
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });

        });
    });

   
    describe("6- Remove Vide from FavoriteList  /api/favorit/removeFeavorite", () => {
        it("Remove video", (done) => {
            let favoriteVideo = {
                "userid":  "d5fe7f34-fe08-457c-83b3-10f22590b",
                "videoId":"pudjtL6yiOs"
            }
            chai.request(app)
                .put("/api/favorite/removeFavorite")
                .send(favoriteVideo)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.should.have.property('text').eql("video removed from favoritelist successfully");
                    done();
                });

        });

        it("Remove video", (done) => {
            let favoriteVideo = {
                "userid":  "d5fe7f34-fe08-457c-83b3-10f22590b",
                //passing wrong video id
                "videoId":"pudjtLs"
            }
            chai.request(app)
                .put("/api/favorite/removeFavorite")
                .send(favoriteVideo)
                .end((err, res) => {
                    res.should.have.status(404);
                    res.should.have.property('text').eql("this video is not in favorite list");
                    done();
                });

        });
    });
   
   
});







