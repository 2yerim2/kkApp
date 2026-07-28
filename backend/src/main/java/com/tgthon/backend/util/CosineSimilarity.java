package com.tgthon.backend.util;

import java.util.List;

public class CosineSimilarity { // 코사인 유사도 계산

    public static double calculate(List<Double> v1, List<Double> v2){

        if (v1 == null || v2 == null){
            return 0;
        }

        if (v1.size() != v2.size()){
            return 0;
        }

        double dot = 0;
        double normA = 0;
        double normB = 0;

        for (int i = 0; i < v1.size(); i++){
            dot += v1.get(i) * v2.get(i);
            normA += v1.get(i)*v1.get(i);
            normB += v2.get(i)*v2.get(i);
        }

        if (normA == 0 || normB == 0){
            return 0;
        }

        return dot / (Math.sqrt(normA)* Math.sqrt(normB));

    }
    
}
