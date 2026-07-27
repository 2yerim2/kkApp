package com.tgthon.backend.controller;

import com.tgthon.backend.model.Post;
import com.tgthon.backend.service.PostService;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")

public class PostController {

    private final PostService postService; // final PostService타입의 private 변수인 postService 선언

    public PostController(PostService postService){ // 매개변수로 외부에서 postService 받아옴.
        this.postService = postService; // postService 클래스의 생성자, 현재 멤버 변수 값을 받아온 외부 매개변수로 초기화
    }

    @GetMapping
    public List<Post> getPosts(){ // Post 객체 여러 개 담은 list 형태 반환

        return postService.getPosts(); // Servie의 postService의 getPosts 값을 반환
    }

    @GetMapping("/{id}") // 특정 id 하나 가져옴.
    public Post getPostById(@PathVariable Long id){

        return postService.getPostById(id);
    }

    @PostMapping
    public Post createPost(@RequestBody Post post) throws Exception{

        return postService.createPost(post);

    }

    @PutMapping("/{id}") // 하나의 아이디에 대해서 변경할 post 내용 업데이트
    public Post updatePost(
            @PathVariable Long id,
            @RequestBody Post post){
        
        return postService.updatePost(id, post);

        }

    @DeleteMapping("/{id}")
    public Post deletePost(@PathVariable Long id){

        return postService.deletePost(id);
    }

}
