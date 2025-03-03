import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'dart:async';

void main() {
  runApp(ChatBotApp());
}

class ChatBotApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: ChatScreen(),
    );
  }
}

class ChatScreen extends StatefulWidget {
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _controller = TextEditingController();
  final List<Map<String, String>> _messages = [];
  final String apiUrl = "http://localhost:3000/api/chat/completions";
  final String apiKey = "your_api_key_here";
  String selectedModel = "aics";

  final Map<String, String> models = {
    "Computer Science": "aics",
    "Business": "aibus",
    "Law": "ailaw"
  };

  Future<void> sendMessage(String message) async {
    setState(() {
      _messages.add({"role": "user", "content": message});
    });
    
    final response = await http.post(
      Uri.parse(apiUrl),
      headers: {
        "Authorization": "Bearer $apiKey",
        "Content-Type": "application/json"
      },
      body: jsonEncode({
        "model": selectedModel,
        "messages": _messages
      }),
    );

    if (response.statusCode == 200) {
      final responseData = jsonDecode(response.body);
      final botReply = responseData['choices'][0]['message']['content'] ?? "Error: No response";
      
      setState(() {
        _messages.add({"role": "bot", "content": botReply});
      });
    } else {
      setState(() {
        _messages.add({"role": "bot", "content": "Error ${response.statusCode}: ${response.body}"});
      }