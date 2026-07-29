package com.tgthon.backend.service;

import com.tgthon.backend.model.Post;
import org.springframework.stereotype.Service;

import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;

import java.util.ArrayList;
import java.util.List;

@Service
public class PostService {

    private final EmbeddingService embeddingService;

    private List<Post> posts = new ArrayList<>();

    public PostService(EmbeddingService embeddingService){

        this.embeddingService = embeddingService;

        posts.add(new Post(
            2025105137L,
            "전동 드릴 하루 빌려드려요.",
            "전공 기기",
            "달리는 새싹",
            "전동 드릴 하루 빌려가실 분~ 제 2긱 살아요. 필요하신 분은 쪽지 주세요!"

        ));

        posts.add(new Post(
            20251031056L,
            "나이키 운동화 새 상품",
            "신발",
            "배고픈 사슴",
            "나이키 운동화 새 상품 판매합니다. 착용 한 번도 안했고 포장만 뜯었어요. 쪽지 주세요."
        ));

        posts.add(new Post(
            2025105138L,
            "아이패드 에어 5세대 급처합니다",
            "디지털기기",
            "졸린 라이언",
            "사정이 있어서 아이패드 5세대 급처합니다. 몇 번 사용하긴 했는데 사용 흔적 거의 없고 잘 작동합니다! 정가보다 많이 싸게 팝니다. 쪽지 남겨주세용."
        ));
    
    }

    public List<Post> getPosts(){

        return posts;
    }

    public Post getPostById(Long id){ //id 하나 받아서 Posts 리스트 안의 id와 비교 후 동일하면 그 id에 해당하는 게시물 반환.

        for(Post post : posts){ // 리스트의 요소 순서대로 하나씩 저장, 반복문

            if(post.getId().equals(id)){ // 매개변수로 받은 id와 동일한지 비교
                return post;
            }
        }
        return null; // 
    }

    public Post updatePost(Long id, Post updatePost){ // id는 기존 아이디(비교에 사용), updatePost는 새로운 게시물 내용

        for(Post post : posts){
            if(post.getId().equals(id)){ // id 비교

                post.setTitle(updatePost.getTitle()); // 새로운 제목, 카테고리로 변경 가능한 세터
                post.setCategory(updatePost.getCategory());

                return post;
            }
        }
        return null;
    }

    public Post createPost(Post post) {

        String text =
                post.getTitle()
                + " "
                + post.getCategory()
                +" "
                +post.getContent();


        List<Double> queryvector =
                embeddingService.createEmbedding(text);

         System.out.println("vector size = " + queryvector.size());


        post.setEmbedding(queryvector);

        Firestore db =
                FirestoreClient.getFirestore();




        System.out.println(
            "embedding size = "
            + post.getEmbedding().size()
            );

        db.collection("posts")
        .add(post);

        return post;

    }

    public Post deletePost(Long id){

        for(Post post : posts){
            
            if(post.getId().equals(id)){

                posts.remove(post); // 특정 id의 게시물 삭제

                return post;
            }
        }
        return null;
    }
}

