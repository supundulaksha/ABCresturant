package com.abcrestaurant.Backend.service;

import com.abcrestaurant.Backend.entity.Order;
import com.abcrestaurant.Backend.entity.OrderStatus;
import com.abcrestaurant.Backend.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public Order createOrder(Order order) {
        return orderRepository.save(order);
    }

    public Order updateOrder(Long id, Order orderDetails) {
        Optional<Order> orderOptional = orderRepository.findById(id);

        if (orderOptional.isPresent()) {
            Order order = orderOptional.get();
            order.setUserName(orderDetails.getUserName());
            order.setEmail(orderDetails.getEmail());
            order.setPhoneNumber(orderDetails.getPhoneNumber());
            order.setMenuName(orderDetails.getMenuName());
            order.setQuantity(orderDetails.getQuantity());
            order.setTotalPrice(orderDetails.getTotalPrice());
            order.setPaymentMethod(orderDetails.getPaymentMethod());
            order.setStatus(orderDetails.getStatus());
            return orderRepository.save(order);
        } else {
            throw new RuntimeException("Order not found with id " + id);
        }
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }
}