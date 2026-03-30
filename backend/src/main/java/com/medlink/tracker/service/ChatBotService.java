package com.medlink.tracker.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.medlink.tracker.dto.ChatRequestDto;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ChatBotService {

    @Value("${groq.api.key}")
    private String apiKey;

    private static final String GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

    private static final String SYSTEM_PROMPT = "You are MedBot, a highly advanced medical AI assistant for the MedLink platform. "
            +
            "Persona: Professional, clinical, and helpful. " +
            "Rules: Use technical terms for Doctors, simple terms for Patients. Always check drug interactions. " +
            "Always add a medical disclaimer at the end.";

    private final HttpClient httpClient = HttpClient.newHttpClient();
    private final ObjectMapper objectMapper = new ObjectMapper();

    public String getReply(ChatRequestDto request) {
        try {
            if (apiKey == null || apiKey.trim().isEmpty()) {
                return "Error: Groq API key is missing.";
            }

            // Build messages array
            List<Map<String, String>> messages = new ArrayList<>();
            messages.add(Map.of("role", "system", "content", SYSTEM_PROMPT));

            if (request.getHistory() != null) {
                for (var msg : request.getHistory()) {
                    String role = msg.getRole().equalsIgnoreCase("user") ? "user" : "assistant";
                    messages.add(Map.of("role", role, "content", msg.getContent()));
                }
            }
            messages.add(Map.of("role", "user", "content", request.getMessage()));

            // Build payload
            Map<String, Object> payload = new HashMap<>();
            payload.put("model", "llama-3.3-70b-versatile");
            payload.put("messages", messages);
            payload.put("max_tokens", 1024);

            String jsonPayload = objectMapper.writeValueAsString(payload);

            HttpRequest httpRequest = HttpRequest.newBuilder()
                    .uri(URI.create(GROQ_API_URL))
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + apiKey.trim())
                    .POST(HttpRequest.BodyPublishers.ofString(jsonPayload))
                    .build();

            HttpResponse<String> response = httpClient.send(httpRequest, HttpResponse.BodyHandlers.ofString());

            if (response.statusCode() != 200) {
                return "API Error (" + response.statusCode() + "): " + response.body();
            }

            JsonNode root = objectMapper.readTree(response.body());
            JsonNode choices = root.path("choices");
            if (choices.isArray() && choices.size() > 0) {
                return choices.get(0).path("message").path("content").asText();
            }
            return "Error: No response from AI";

        } catch (Exception e) {
            return "Local Error: " + e.getMessage();
        }
    }
}