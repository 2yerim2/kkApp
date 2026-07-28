package com.tgthon.backend.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.tgthon.backend.config.OpenAIConfig;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.List;


@Service
public class EmbeddingService {


    private final OpenAIConfig openAIConfig;

    private final RestTemplate restTemplate;

    private final ObjectMapper objectMapper;


    public EmbeddingService(
            OpenAIConfig openAIConfig
    ) {
        this.openAIConfig = openAIConfig;
        this.restTemplate = new RestTemplate();
        this.objectMapper = new ObjectMapper();
    }



    public List<Double> createEmbedding(String text) {


        String url = "https://api.openai.com/v1/embeddings";


        String requestBody = """
                {
                    "model": "text-embedding-3-small",
                    "input": "%s"
                }
                """.formatted(text);



        HttpHeaders headers = new HttpHeaders();

        headers.setContentType(MediaType.APPLICATION_JSON);

        headers.setBearerAuth(
                openAIConfig.getApiKey()
        );



        HttpEntity<String> request =
                new HttpEntity<>(
                        requestBody,
                        headers
                );



        ResponseEntity<String> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.POST,
                        request,
                        String.class
                );



        try {

            JsonNode root =
                    objectMapper.readTree(
                            response.getBody()
                    );


            JsonNode embeddingNode =
                    root
                    .get("data")
                    .get(0)
                    .get("embedding");



            List<Double> embedding =
                    new ArrayList<>();


            for(JsonNode value : embeddingNode){

                embedding.add(
                        value.asDouble()
                );
            }


            return embedding;


        } catch(Exception e){

            throw new RuntimeException(
                    "Embedding 생성 실패",
                    e
            );
        }
    }
}
