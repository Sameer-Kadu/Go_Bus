package com.go_bus.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;
import java.util.List;
import java.util.Map;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private TemplateEngine templateEngine;

    public void sendBookingConfirmation(String toEmail, String travelerName, String busNumber,
                                        String route, String departureDate, String departureTime,
                                        List<Map<String, String>> passengers, String feedbackLink) throws MessagingException {
        // Create email message
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        // Set email properties
        helper.setTo(toEmail);
        helper.setSubject("🎟️ Your Bus Ticket Booking Confirmation");

        // Create email template context
        Context context = new Context();
        context.setVariable("travelerName", travelerName);
        context.setVariable("busNumber", busNumber);
        context.setVariable("route", route);
        context.setVariable("departureDate", departureDate);
        context.setVariable("departureTime", departureTime);
        context.setVariable("passengers", passengers);
        context.setVariable("feedbackLink", feedbackLink);

        // Generate HTML content from Thymeleaf template
        String htmlContent = templateEngine.process("bookingConfirmation", context);
        helper.setText(htmlContent, true);

        // Send email
        mailSender.send(message);
        System.out.println("Booking confirmation email sent to: " + toEmail);
    }
}
