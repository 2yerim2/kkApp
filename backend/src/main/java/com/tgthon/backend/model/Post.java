package com.tgthon.backend.model;

import java.util.List;

public class Post { // Post 클래스 정의
    
    private Long id; // Long 타입의 변수 id 선언(여기서 Long은 정수 저장하는 자료형(long을 객체화, 객체처럼 사용가능))
    private String title; // Sting 타입 title 변수
    private String category; // String 타입 category 변수
    private String author;
    private String content;
    private List<Double> embedding;

    public List<Double> getEmbedding(){
        return embedding;
    }

    public void setEmbedding(List<Double> embedding){
        this.embedding = embedding;
    }

    public Post(){
        
    }
    
    public Post(Long id, String title, String category, String author, String content){
        this.id = id;
        this.title = title;
        this.category = category;
        this.author = author;
        this.content = content;
    }

    public Long getId(){
        return id;
    }

    public String getTitle(){
        return title;
    }

    public String getCategory(){
        return category;
    }

    public String getAuthor(){
        return author;
    }

    public String getContent(){
        return content;
    }




    public void setTitle(String title){ // title setter -> 타이틀 변경 가능
        this.title = title;
    }

    public void setCategory(String category){ // category setter -> 카테고리 변경 가능
        this.category = category;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
