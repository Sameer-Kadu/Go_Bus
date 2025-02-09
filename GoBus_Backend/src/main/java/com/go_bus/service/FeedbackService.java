package com.go_bus.service;

import com.go_bus.pojos.FeedbackEntity;
import com.go_bus.repository.FeedbackRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FeedbackService {

    @Autowired
    private FeedbackRepository feedbackRepository;

    public void saveFeedback(FeedbackEntity feedback) {
        feedbackRepository.save(feedback);
    }
}
