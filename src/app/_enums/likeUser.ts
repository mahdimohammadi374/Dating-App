export enum LikeUser{
    liked,
    likeBy
}


export class UserLikeParams{
    pageSize:number=6;
    pageNumber:number=1;
    PredicateUserLike:LikeUser=LikeUser.liked;
}