package com.tgthon.backend.model; // 코사인 유사도 비교 결과 react로 보내질 게시물 객체

public class SearchResult {

    private String id;
    private String title;
    private String category;
    private String author;
    private String content;
    private double similarity;
    

    public SearchResult(){}

    public SearchResult(String id, String title, String category, String author, String content, double similarity
    ){
        this.id = id;
        this.title = title;
        this.category = category;
        this.author = author;
        this.content = content;
        this.similarity = similarity;
    }

    //public add()

    public String getId(){
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


    public double getSimilarity(){
        return similarity;
    }   
}

