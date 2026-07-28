package com.tgthon.backend.service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Service;
import com.tgthon.backend.util.CosineSimilarity;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.tgthon.backend.model.Post;
import com.tgthon.backend.model.SearchResult;

@Service
public class SearchService {


    private final EmbeddingService embeddingService;


    public SearchService(
            EmbeddingService embeddingService
    ){
        this.embeddingService = embeddingService;
    }


    public List<SearchResult> search(String keyword) throws Exception{

        List<Double> queryVector = embeddingService.createEmbedding(keyword); // 검색어에 대한 임베딩 생성

        Firestore db = FirestoreClient.getFirestore(); // firestore 가져오기

        ApiFuture<QuerySnapshot> future =
                db.collection("posts").get(); // "posts" 에 있는 컬렉션들 조회

        List<SearchResult> results = new ArrayList<>();

        List<QueryDocumentSnapshot> documents =
                future.get().getDocuments();

        for (QueryDocumentSnapshot document : documents) {

            System.out.println("문서 하나 읽음");

            Post post = document.toObject(Post.class);

            double similarity =
                    CosineSimilarity.calculate(
                            queryVector,
                            post.getEmbedding()
                    );

            SearchResult result =
            new SearchResult(
                post.getTitle(),
                post.getCategory(),
                post.getAuthor(),
                post.getContent(),
                similarity
            );

            if(similarity > 0.35){
                results.add(result);
            }
        }

        results.sort( // 코사인 유사도 높은 순으로 정렬
            (a, b) -> Double.compare(
                b.getSimilarity(),
                a.getSimilarity()
            )
        );

    return results.subList( // 유사도 기준 상위 5개 출력
    0,
    Math.min(5, results.size())
    );

    }
}