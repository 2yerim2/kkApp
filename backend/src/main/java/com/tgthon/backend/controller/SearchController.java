package com.tgthon.backend.controller;

import com.tgthon.backend.service.SearchService;
import com.tgthon.backend.model.SearchRequest; 
import com.tgthon.backend.model.SearchResult;
import java.util.List;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/search")
public class SearchController {

    private final SearchService searchService;

     public SearchController(SearchService searchService){
        this.searchService = searchService;
    }


    @PostMapping
    public List<SearchResult> search(
            @RequestBody SearchRequest request
    ) throws Exception{

         return searchService.search(
                request.getKeyword()
         );
    }
}